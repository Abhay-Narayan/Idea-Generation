import { assets } from "../assets/assets/";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { useState, useRef, useEffect } from "react";
import axiosInstance from "../constants/ProtectedRoutes";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";

const Blog = ({ blog, deleteBlog, handleEditBlog }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const optionsRef = useRef(null);

  const handleToggleOptions = () => setShowOptions(!showOptions);
  const handleOutsideClick = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (showOptions) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [showOptions]);

  const handleDeleteBlog = async () => {
    try {
      const response = await axiosInstance.delete(
        `/blog/deleteBlog/${blog._id}`
      );
      console.log("Blog deleted:", response.data);
      deleteBlog(blog._id);
      setDeleted(true);
    } catch (error) {
      console.log("Unable to delete blog", error);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
  });

  if (deleted) return null;

  return (
    <div className="w-full bg-white rounded-lg border mt-3 p-4 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] relative">
      <div className="absolute flex flex-col items-end right-4 top-4 gap-1">
        <div className="flex items-center gap-1  opacity-70 hover:opacity-100 transition-opacity">
          <IoEye className="w-5 h-5 text-gray-600" />
          <p className="text-xs text-gray-500">350</p>
        </div>
        <div className="mt-2 opacity-70 hover:opacity-100 transition-opacity">
          <BsThreeDots
            className=" rotate-90 w-5 h-5 text-gray-600 cursor-pointer"
            onClick={handleToggleOptions}
          />
        </div>

        {/* Popup for Edit and Delete Options */}
        {showOptions && (
          <div
            ref={optionsRef}
            className="absolute right-0 top-14 bg-white border border-gray-300 shadow-lg rounded-xl p-2 w-28 z-50"
          >
            <button
              className="w-full text-left font-medium flex items-center justify-start text-gray-800 hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => handleEditBlog(blog)}
            >
              <span className=" text-base mr-2">
                <LuPencil />
              </span>
              Edit
            </button>
            <button
              className="w-full text-left font-medium flex items-center justify-start text-red-500 hover:bg-gray-100 p-2 rounded-lg"
              onClick={handleDeleteBlog}
            >
              <span className=" text-lg mr-1.5">
                <RiDeleteBinLine />
              </span>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-1">
        <div className="relative w-8 h-8">
          <img
            src={
              blog.author.profilePic
                ? blog.author.profilePic
                : assets.profile_pic
            }
            className="w-full h-full rounded-full border-2 border-gray-300 shadow-sm"
            alt="profile"
          />
        </div>
        <p className="text-sm font-semibold text-gray-800">
          {blog.author.username || blog.username}
        </p>
        <span className="text-gray-400">•</span>
        <p className="text-xs text-gray-500">{timeAgo}</p>
      </div>

      <div className="flex flex-col gap-1 mt-3">
        <h1 className="text-lg font-semibold text-gray-800 leading-snug">
          {blog.title}
        </h1>
        <div
          className="text-sm text-gray-700 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>
      </div>

      <div className="flex items-center text-sm mt-4 gap-4">
        <div className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
          <BiUpvote className="w-5 h-5 text-gray-600 hover:text-purple-700 transition-colors" />
          <p className="font-medium text-gray-800">{blog.upvotes?.length}</p>
          <BiDownvote className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
        </div>

        <div className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
          <FaRegCommentDots className="w-5 h-5 text-gray-600" />
          <p className="font-medium text-gray-800">{blog.comments?.length}</p>
        </div>

        <div className="flex items-center gap-1 bg-main p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
          <FaShare className="w-5 h-5 text-white" />
          <p className="font-medium text-white">Share</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
