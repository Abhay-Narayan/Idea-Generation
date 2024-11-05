import { assets } from "../assets/assets/";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { IoEye } from "react-icons/io5";



const Blog = ({blog}) => {
  return (
    <div className="w-full rounded-md border mt-3 p-2 cursor-pointer bg-white flex flex-col hover:scale-[1.03] transform transition duration-300 z-10 relative ">
      <div className="absolute flex items-center right-3 top-3 gap-1">
      <IoEye className="w-4 h-4 text-gray-600"/>
      <p className="text-xs text-gray-500">350</p>
      </div>
      <div className="flex items-center gap-2">
        <img src={assets.profile_pic} className="w-6 h-6 rounded-full"  alt="" />
        <p className="text-xs font-medium">{blog.author}</p>
        <p className=" text-xl fonr-medium">⭒</p>
        <p className="text-gray-500 text-xs ">14 hr. ago</p>
      </div>
      <div className="flex flex-col justify-center gap-1 mt-2">
        <h1 className="font-medium">{blog.title}</h1>
        <p className="text-sm text-gray-900 line-clamp-2">{blog.description}</p>
      </div>
      <div className="flex items-center text-sm mt-4 gap-3">
        <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-3xl ">
          <BiUpvote className="w-5 h-5 hover:text-hovermain "/>
          <p className="font-medium">15</p>
          <BiDownvote className="w-5 h-5 hover:text-red-600"/>
        </div>
        <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-3xl ">
          <FaRegCommentDots className="w-5 h-5" />
          <p className="font-medium">38</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-3xl ">
          <FaShare className="w-5 h-5"/>
          <p className="font-medium">Share</p>
        </div>
      </div>
    </div>
  )
}

export default Blog