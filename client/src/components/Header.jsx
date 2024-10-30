import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold">
        <a href="/" className="text-purple-700 no-underline hover:underline">Idea Generation</a>
      </div>
      <nav className="flex gap-5">
        <a href="/about" className="text-gray-800 no-underline font-medium hover:text-purple-700">About</a>
        <a href="/blog" className="text-gray-800 no-underline font-medium hover:text-purple-700">Blogs</a>
        <a href="/search" className="text-gray-800 no-underline font-medium hover:text-purple-700">Search</a>
        <a href="/contact" className="text-gray-800 no-underline font-medium hover:text-purple-700">Contact Us</a>
        <a href="/login" className="bg-purple-700 text-white px-3 py-1 rounded font-medium no-underline hover:bg-purple-800">Login</a>
      </nav>
    </header>
  );
};

export default Header;
