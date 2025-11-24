import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#6A38C2] text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left */}
        <h1 className="text-lg font-semibold">JobPortal</h1>

        {/* Middle Links */}
        <div className="flex gap-6 text-sm mt-3 md:mt-0">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Jobs</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        {/* Right */}
        <p className="text-sm mt-3 md:mt-0">© 2025 JobPortal. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;
