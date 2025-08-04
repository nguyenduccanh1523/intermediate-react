import React from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-4 flex items-center">
        <div className="max-w-4xl mx-auto text-left px-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} My Application Intermediate. All rights reserved.
          </p>
          <p className="text-xs mt-2">Built with NDC using React</p>
        </div>
        
      </footer>
    </div>
  );
};

export default Footer;
