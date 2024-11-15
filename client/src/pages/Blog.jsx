import React, { useEffect, useState } from "react";
import Blogsidebar from "../components/Blogsidebar";
import Profile from "../components/Profile";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "react-router-dom";
import axiosInstance from "../constants/ProtectedRoutes";
import { assets } from "../assets/assets/";
import { 
  BiUpvote, 
  BiDownvote, 
  BiSolidUpvote, 
  BiSolidDownvote 
} from "react-icons/bi"; 
import { FaRegCommentDots, FaShare } from "react-icons/fa"; 
import { IoEye } from "react-icons/io5"; 
import Comment from "../components/Comment";
import "./blogstyles.css";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Skeleton from "../constants/BlogSkeleton";


const Blog = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [upvotes, setUpvotes] = useState([]);
  const [upvoted, setUpvoted] = useState(false);
  const [downvotes, setDownvotes] = useState([]);
  const [comments,setComments]=useState([]);
  const [downvoted, setDownvoted] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/find/${id}`);
        setBlog(response.data);
        if (response.data?.createdAt) {
          const timeAgo = formatDistanceToNow(new Date(response.data.createdAt), {
            addSuffix: true,
          });
          setTimeAgo(timeAgo); // Set timeAgo state
        }
      } catch (error) {
        console.log("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blog?.upvotes) {
      setUpvotes(blog.upvotes);
    }
    if (blog?.downvotes) {
      setDownvotes(blog.downvotes);
    }
    if(blog?.comments){
      setComments(blog.comments);
    }
  }, [blog]);

  useEffect(() => {
    if (user?._id) {
      setUpvoted(upvotes?.includes(user._id));
      setDownvoted(downvotes?.includes(user._id));
    }
  }, [upvotes, downvotes, user]);

  const handleUpvote = async () => {
    if (downvoted) {
      toast.error("Please remove the downvote first");
      return;
    }
    try {
      const response = await axiosInstance.put(`/blog/upvote/${id}`);
      const msg = response.data.msg;
      if (msg === "Upvoted successfully") {
        setUpvotes((prevUpvotes) => [...(prevUpvotes || []), user._id]);
        setUpvoted(true);
        toast.success("Upvoted successfully!");
      } else if (msg === "Removed the upvote") {
        setUpvotes((prevUpvotes) =>
          (prevUpvotes || []).filter((userId) => userId !== user._id)
        );
        setUpvoted(false);
        toast("Upvote removed!", {
          icon: "👍",
        });
      }
    } catch (error) {
      console.error("Error during upvote toggle:", error);
      toast.error(error.response?.data?.message || "Failed to toggle upvote.");
    }
  };

  const handleDownvote = async () => {
    if (upvoted) {
      toast.error("Please remove the upvote first");
      return;
    }
    try {
      const response = await axiosInstance.put(`/blog/downvote/${id}`);
      const msg = response.data.msg;
      if (msg === "downvoted successfully") {
        setDownvotes((prevDownvotes) => [...(prevDownvotes || []), user._id]);
        setDownvoted(true);
        toast.success("Downvoted successfully!", {
          icon: "👎", 
        });
      } else if (msg === "Removed the downvote") {
        setDownvotes((prevDownvotes) =>
          (prevDownvotes || []).filter((userId) => userId !== user._id)
        );
        setDownvoted(false);
        toast("Downvote removed!", {
          icon: "👎", 
        });
      }
    } catch (error) {
      console.error("Error during downvote toggle:", error);
      toast.error(
        error.response?.data?.message || "Failed to toggle downvote."
      );
    }
  };

  const handleAddComment = async () => {
    if(!newComment.trim()){
      toast.error(`Comment can't be empty`);
      return;
    }
    try {
      const res=await axiosInstance.post(`/blog/addComment/${id}`,{text:newComment});
      setComments(res.data.comments);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete=async(comId)=>{
    try {
      const res=await axiosInstance.delete(`blog/deleteComment/${id}/${comId}`);
      console.log(res.data);
      if(res.data.msg==="comment deleted successfully"){
        toast.success('Comment Deleted');
        setComments((prev)=>prev.filter((comment)=>comment._id!==comId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCommentEdit=async(newCommentText, comId)=>{
    try {
      if(!newCommentText.trim()){
        toast.error(`Can't be Empty`);
        return;
      }
      const res=await axiosInstance.put(`blog/editComment/${id}/${comId}`,{text:newCommentText});
      console.log(res.data);
      if(res.data.msg==="comment edited successfully"){
        setComments((prevComments)=>
        prevComments.map((comment)=>
        comment._id===comId?{...comment,text:newCommentText}:comment
          )
        );
        toast.success('Comment Edited');
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="flex h-[90vh] ">
      <Blogsidebar />
      <Toaster />

      {blog?(
      <div className="w-[60%] overflow-y-auto scrollbar scrollbar-thumb-main scrollbar-track-slate-100 bg-white rounded-lg border p-4 hover:shadow-xl relative">
        <div className="absolute flex items-center right-4 top-4 gap-1 opacity-70 hover:opacity-100 transition-opacity">
          <IoEye className="w-5 h-5 text-gray-600" />
          <p className="text-xs text-gray-500">{Math.ceil(blog.views/2) || 0}</p>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <div className="relative w-8 h-8">
            <img
              src={blog.author?.profilePic || assets.profile_pic}
              className="w-full h-full rounded-full border-2 border-gray-300 shadow-sm"
              alt="profile"
            />
          </div>
          <p className="text-sm font-semibold text-gray-800">
            {blog.author?.username || "Anonymous"}
          </p>
          <span className="text-gray-400">•</span>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <h1 className="text-lg font-semibold text-gray-800">{blog.title}</h1>
          <div
            className="blog-description text-gray-700 scroll-auto overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
        </div>

        <div className="flex items-center text-sm mt-4 gap-4">
          <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-full shadow-sm">

            {!upvoted ? (
              <BiUpvote
                onClick={handleUpvote}
                aria-label="Upvote"
                className="w-5 h-5 text-gray-600 hover:text-purple-700 cursor-pointer transition-all duration-300 hover:scale-125"
              />
            ) : (
              <BiSolidUpvote
                onClick={handleUpvote}
                aria-label="Remove Upvote"
                className="w-5 h-5 text-purple-700 cursor-pointer transition-all duration-300 hover:scale-125"
              />
            )}

            <p className="font-medium text-gray-800">{upvotes?.length || 0}</p>
            {!downvoted ? (
              <BiDownvote
                onClick={handleDownvote}
                aria-label="Downvote"
                className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-600 transition-all duration-300 hover:scale-125"
              />
            ) : (
              <BiSolidDownvote
                onClick={handleDownvote}
                aria-label="Remove Downvote"
                className="w-5 h-5 text-red-600 cursor-pointer transition-all duration-300 hover:scale-125"
              />
            )}
          </div>

          <div className="flex items-center gap-1 bg-gray-200  p-2 rounded-full transition-all duration-200 shadow-sm ">
            <FaRegCommentDots className="w-5 h-5 text-gray-600" />
            <p className="font-medium text-gray-800">
              {blog.comments?.length || 0}
            </p>
          </div>

          <div className="cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-1 bg-main p-2 rounded-full shadow-sm hover:shadow-md">
            <FaShare className="w-5 h-5 text-white" />
            <p className="font-medium text-white">Share</p>
          </div>
        </div>

        {/* Comment Input Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Leave a Comment
          </h2>
          <textarea
            className="w-full h-24 p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main resize-none"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-main text-white px-4 py-2 rounded hover:bg-purple-700 transition-all"
            onClick={handleAddComment}
          >
            Post Comment
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
          <div className="space-y-4 mt-3">
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <Comment onDelete={handleCommentDelete} onUpdate={handleCommentEdit} comment={comment} key={index} />
              ))
            ) : (
              <p className="text-sm text-gray-600">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>):<Skeleton/>}

      <div className={`w-[20%] ${!isAuthenticated ? "hidden" : "block"} `}>
        <Profile />
      </div>
    </div>
  );
};

export default Blog;
