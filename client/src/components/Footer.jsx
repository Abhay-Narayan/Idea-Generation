import React from 'react';
import { FaLinkedin, FaInstagram, FaReddit, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white p-10 text-center">
      <div className="mb-5">
        <p className="mb-2">Get our Ideas delivered From us to your inbox.</p>
        <input
          type="email"
          placeholder="Enter your email-Id"
          className="p-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <button className="bg-white text-purple-700 p-2 rounded hover:bg-purple-200 transition duration-300">
          Subscribe
        </button>
      </div>
      
      <div className="flex justify-center gap-4 mt-5">
        <a href="/about" className="text-white hover:text-purple-300">About</a>
        <a href="/contact" className="text-white hover:text-purple-300">Contact Us</a>
        <a href="/terms" className="text-white hover:text-purple-300">Terms & Conditions</a>
      </div>

      <div className="flex justify-center gap-4 text-2xl mt-5">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
          <FaInstagram />
        </a>
        <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
          <FaReddit />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
          <FaFacebook />
        </a>
      </div>
      
      <p className="mt-5 text-sm text-white">
        &copy; 2024 Idea Generation. All rights reserved.
      </p>      
    </footer>
  );
};

export default Footer;
