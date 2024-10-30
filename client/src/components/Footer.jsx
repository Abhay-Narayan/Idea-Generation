import React from 'react';
import { FaLinkedin, FaInstagram, FaReddit, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={footerContainer}>
        <p>Get our Ideas delivered From us to your inbox.</p>
        <input type="email" placeholder="Enter your email-Id" style={inputStyles} />
        <button style={subscribeButton}>Subscribe</button>
      </div>
      
      <div style={footerNav}>
        <a href="/about" style={footerLink}>About</a>
        <a href="/contact" style={footerLink}>Contact Us</a>
        <a href="/terms" style={footerLink}>Terms & Conditions</a>
      </div>

      <div style={socialLinks}>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={iconStyles}>
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyles}>
          <FaInstagram />
        </a>
        <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer" style={iconStyles}>
          <FaReddit />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyles}>
          <FaFacebook />
        </a>
      </div>
      <p style={copyrightStyle}>
        &copy; 2024 Idea Generation. All rights reserved.
      </p>      
    </footer>
  );
};

const footerStyles = {
  backgroundColor: '#6732d3',
  color: '#fff',
  padding: '40px 20px',
  textAlign: 'center',
};

const footerContainer = {
  marginBottom: '20px',
};

const inputStyles = {
  padding: '10px',
  marginRight: '10px',
  borderRadius: '5px',
  border: 'none',
};

const subscribeButton = {
  backgroundColor: '#fff',
  color: '#4A00E0',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const footerNav = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginTop: '20px',
};

const footerLink = {
  color: '#fff',
  textDecoration: 'none',
};

const socialLinks = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  fontSize: '1.5rem',
  marginTop: '20px',
};

const iconStyles = {
  color: '#fff',
  textDecoration: 'none',
};
const copyrightStyle = {
    marginTop: '20px',
    fontSize: '0.9rem',
    color: '#fff',
  };
export default Footer;
