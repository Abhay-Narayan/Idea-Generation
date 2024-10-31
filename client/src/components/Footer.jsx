import { FaLinkedin, FaInstagram, FaReddit, FaFacebook } from 'react-icons/fa';
import mask from '../assets/mask.png'
const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-purple-800 overflow-hidden to-main p-10 text-center flex flex-col">
      <img src={mask} className='w-[400px]  absolute -left-5 top-0'  />
      <img src={mask} className='w-[400px] absolute -bottom-4 -right-1 rotate-180'  />
      <div className="mb-5 flex flex-col items-center">
        <p className="mb-4 text-3xl font-semibold text-white">Get our ideas delivered to your inbox.</p>
        <div className="flex w-full max-w-md justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email-Id"
            className="flex-1 p-2 mr-2 rounded-md outline-none "
          />
          <button className="text-white border border-white p-2 rounded-md  hover:scale-105 transform transition duration-300">
            Subscribe
          </button>
        </div>
      </div>
      
      <div className="flex justify-center gap-6 mt-2 text-base">
        <a href="/about" className="text-white hover:text-purple-300">About</a>
        <a href="/contact" className="text-white hover:text-purple-300">Contact Us</a>
        <a href="/terms" className="text-white hover:text-purple-300">Terms & Conditions</a>
      </div>

      <div className="flex justify-center gap-4 text-2xl mt-5">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition duration-300">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition duration-300">
          <FaInstagram />
        </a>
        <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition duration-300">
          <FaReddit />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition duration-300">
          <FaFacebook />
        </a>
      </div>
      <hr className='mt-6' />
      <p className="mt-5 text-sm text-white">
        &copy; 2024 Idea Generation. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
