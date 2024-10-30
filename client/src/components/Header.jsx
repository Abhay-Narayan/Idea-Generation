// Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={headerStyles}>
      <div style={logoContainer}>
        <a href="/" style={logoLink}>Idea Generation</a>
      </div>
      <nav style={navStyles}>
        <a href="/about" style={linkStyles}>About</a>
        <a href="/blog" style={linkStyles}>Blogs</a>
        <a href="/search" style={linkStyles}>Search</a>
        <a href="/contact" style={linkStyles}>Contact Us</a>
        <a href="/login" style={buttonStyles}>Login</a>
      </nav>
    </header>
  );
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
};

const logoContainer = {
  fontSize: '24px',
  fontWeight: 'bold'
};

const logoLink = {
  color: '#6732d3',
  textDecoration: 'none'
};

const navStyles = {
  display: 'flex',
  gap: '20px'
};

const linkStyles = {
  color: '#333',
  textDecoration: 'none',
  fontWeight: '500'
};



const buttonStyles = {
  backgroundColor: '#6732d3',
  color: '#fff',
  padding: '0px 6px',
  borderRadius: '3px',
  textDecoration: 'none',
  fontWeight: '500'
};

export default Header;
