import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import {IoSettingsOutline } from "react-icons/io5";

const Blogsidebar = () => {
  const navigate = useNavigate();

  // Sample data for blog titles
  const blogs = [
    { id: 3, title: "How to Use React Router" },
    { id: 1, title: "Understanding React Hooks" },
    { id: 2, title: "Introduction to Redux" },
  ];

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
            {blogs.map((item)=>(
                <div className="flex items-center text-black gap-3 p-2 hover:bg-surface rounded-lg cursor-pointer">
                  <IoBookOutline className="min-w-5 min-h-5 max-w-5 max-h-5 text-purple-950" />
                  <p className="text-gray-800 text-sm truncate">{item.title}</p>
                </div>    
            ))}
      </div>
      <button className="bg-gray-50 flex items-center gap-5 justify-center w-[80%] mx-auto border mt-2 hover:bg-gray-200 rounded-lg p-2 py-2.5 shadow-sm absolute cursor-pointer bottom-10 right-8">
          <IoSettingsOutline className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
    </div>
  );
};

export default Blogsidebar;
