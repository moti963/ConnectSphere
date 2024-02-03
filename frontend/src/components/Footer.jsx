// Footer.jsx

import React from 'react';

// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-2 shadow">
      <div className="mt-3 text-center">
        <p>&copy; {currentYear} <strong> @ConnectSphere</strong> All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
