import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Registration
export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        console.log("REQ BODY = " , req.body);

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);  //Hashes password (10 = salt rounds). The "salt rounds," also called the cost factor, determine how many times the hashing algorithm is run, making it computationally expensive and difficult for attackers to brute-force.

        // create user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        console.log("REGISTER ERROR=  ", error );
        res.status(500).json({ message: error.message });
    }
};

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // find user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);  //Compares plain password with hashed password in DB.
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Role does not match",
                success: false
            });
        }

        // generate JWT token
        const tokenData = { id: user.id, role: user.role };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });  //Creates JWT token with user ID & role, valid for 1 day.

        // return safe user object
        user = {
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res
            .status(200)
            .cookie("token", token, {  //Sets token in HTTP-only cookie (can’t be accessed by JavaScript → safer).
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");  //Finds user by ID (comes from JWT via middleware). Excludes password using .select("-password"). Returns user profile.
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout
export const logoutUser = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({  //Clears cookie (maxAge: 0 → expired immediately).
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, bio, skills, resume, company, profilePhoto } = req.body;

        // convert skills string to array if provided
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // update basic info
        if (fullname) user.fullname = fullname;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // update profile object
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;
        if (resume) user.profile.resume = resume;
        if (company) user.profile.company = company;
        if (profilePhoto) user.profile.profilePhoto = profilePhoto;

        await user.save();

        // return safe user object
        user = {
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
