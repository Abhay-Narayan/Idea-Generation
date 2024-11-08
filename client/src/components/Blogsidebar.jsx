import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import {IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Blogsidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    // Ensure user is available before making the API call
    if (user && user._id) {
      const getBlogs = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/getUserBlogs/${user._id}`);
          setBlogs(response.data);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };

      getBlogs();
    }
  }, [user]); // Add user as a dependency so effect reruns when user changes

  return (
    <div className="bg-white relative h-full w-[20%] border-r border-r-gray-300  flex flex-col p-1">
      <div
        className="flex items-center gap-5 justify-start w-full mt-4 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaHome className="text-main w-6 h-6 ml-4" />
        <p className="font-medium pt-1">Home</p>
      </div>
      <hr className="bg-gray-300 mt-3 border-t-gray-300" />

      {/* Dropdown */}
      <div className="w-[90%] mx-auto flex flex-col mt-3">
        <label
          htmlFor="Sorting"
          className="block mb-2 text-sm font-medium text-gray-600 ml-2"
        >
          Sort By:
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none"
        >
          <option selected>Most Upvoted</option>
          <option value="US">Least Upvoted</option>
          <option value="CA">Recently Uploaded</option>
        </select>
      </div>
      <hr className="bg-gray-300 mt-3 border-t-gray-300" />

      {/* My Blogs Section */}
      <div className="w-full h-[50%] mx-auto mt-3 flex flex-col p-2">
        <h2 className="text-lg font-semibold mb-2">My Blogs</h2>
        {blogs && blogs.length > 0 ? (
          blogs.map((item) => (
            <div key={item._id} className="flex items-center text-black gap-3 p-2 hover:bg-surface rounded-lg cursor-pointer">
              <IoBookOutline className="min-w-5 min-h-5 max-w-5 max-h-5 text-purple-950" />
              <p className="text-gray-800 text-sm truncate">{item.title}</p>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
      <button className="bg-gray-50 flex items-center gap-5 justify-center w-[80%] mx-auto border mt-2 hover:bg-gray-200 rounded-lg p-2 py-2.5 shadow-sm absolute cursor-pointer bottom-10 right-8">
        <IoSettingsOutline className="w-5 h-5" />
        <span className="font-medium">Settings</span>
      </button>
    </div>
  );
};

export default Blogsidebar;

