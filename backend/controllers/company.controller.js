// controllers/company.controller.js
import Company from "../models/company.model.js";

// @desc    Register a new company
// @route   POST /api/v1/company
export const registerCompany = async (req, res) => {
  try {
    // Check role of the logged-in user
    const { name, description, website, location, logo } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Company name is required" });
    }

    // check if company with same name already exists
    const existingCompany = await Company.findOne({ name: name.trim() });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "You can't register the same company again.",
      });
    }

    // created_by will be the logged-in user
    const company = new Company({
      name,
      description,
      website,
      location,
      logo,
      created_by: req.user.id, // req.user is coming from your auth middleware
    });

    await company.save();

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get all companies
// @route   GET /api/company
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("created_by", "name email");

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get company by ID
// @route   GET /api/company/:id
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate("created_by", "name email");

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update company
// @route   PUT /api/company/:id
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;

    let company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    // Only the recruiter who created the company can update it
    if (company.created_by.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    // update only if values are provided
    if (name && name.trim() !== "") company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    if (logo) company.logo = logo;

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
