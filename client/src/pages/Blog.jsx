/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Blogsidebar from "../components/Blogsidebar";
import Profile from "../components/Profile";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../constants/ProtectedRoutes";
import { assets } from "../assets/assets/";
import { GoCopy } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { FaRegCommentDots, FaShare } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Comment from "../components/Comment";
import "./blogstyles.css";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Skeleton from "../constants/BlogSkeleton";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import ReactQuill from "react-quill";

const Blog = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [upvotes, setUpvotes] = useState([]);
  const [upvoted, setUpvoted] = useState(false);
  const [downvotes, setDownvotes] = useState([]);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [downvoted, setDownvoted] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isSharePopupVisible, setSharePopupVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const sharePopupRef = useRef();
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/find/${id}`);
        setBlog(response.data);
        setEditedTitle(response.data?.title || "");
        setEditedDescription(response.data?.description || "");
        if (response.data?.createdAt) {
          const timeAgo = formatDistanceToNow(
            new Date(response.data.createdAt),
            {
              addSuffix: true,
            }
          );
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
    if (blog?.comments) {
      setComments(blog.comments);
    }
    if (blog?.title) {
      setEditedTitle(blog.title);
    }
    if (blog?.tags) {
      setTags(blog.tags);
    }
  }, [blog]);

  useEffect(() => {
    if (user?._id) {
      setUpvoted(upvotes?.includes(user._id));
      setDownvoted(downvotes?.includes(user._id));
    }
  }, [upvotes, downvotes, user]);

  // Handle blog update (edit)
  const handleBlogEdit = async () => {
    try {
      const updatedBlog = {
        title: editedTitle,
        description: editedDescription,
      };
      const response = await axiosInstance.put(
        `/blog/updateBlog/${blog._id}`,
        updatedBlog
      );
      toast.success("Blog updated successfully!");
      setBlog(response.data);
      setEditPopupVisible(false);
    } catch (error) {
      console.log("Error updating blog:", error);
      toast.error("Failed to update the blog.");
    }
  };

  // Close the popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sharePopupRef.current &&
        !sharePopupRef.current.contains(event.target)
      ) {
        setSharePopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/blog/${id}`)
      .then(() => {
        setIsClicked(true);
        setPopupVisible(true);
        setTimeout(() => setIsClicked(false), 2000);
      });
  };

  const handleBlogDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/blog/deleteBlog/${blog._id}`
      );
      toast.success("Blog Deleted!");
      navigate("/blogs");
    } catch (error) {
      toast.error("Failed to delete the blog.");
    }
  };

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
    if (!newComment.trim()) {
      toast.error(`Comment can't be empty`);
      return;
    }
    try {
      const res = await axiosInstance.post(`/blog/addComment/${id}`, {
        text: newComment,
      });
      setComments(res.data.comments);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete = async (comId) => {
    try {
      const res = await axiosInstance.delete(
        `blog/deleteComment/${id}/${comId}`
      );
      console.log(res.data);
      if (res.data.msg === "comment deleted successfully") {
        toast.success("Comment Deleted");
        setComments((prev) => prev.filter((comment) => comment._id !== comId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentEdit = async (newCommentText, comId) => {
    try {
      if (!newCommentText.trim()) {
        toast.error(`Can't be Empty`);
        return;
      }
      const res = await axiosInstance.put(`blog/editComment/${id}/${comId}`, {
        text: newCommentText,
      });
      console.log(res.data);
      if (res.data.msg === "comment edited successfully") {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === comId
              ? { ...comment, text: newCommentText }
              : comment
          )
        );
        toast.success("Comment Edited");
      }
    } catch (error) {
      console.log(error, "Error commenting");
    }
  };

  return (
    <div className="flex h-[90vh] ">
      <Blogsidebar />
      <Toaster />

      {blog ? (
        <div className="w-[60%] overflow-y-auto scrollbar scrollbar-thumb-main scrollbar-track-slate-100 bg-white rounded-lg border p-4 hover:shadow-xl relative">
          <div className="absolute flex items-center right-4 top-4 gap-1 opacity-70 hover:opacity-100 transition-opacity">
            <IoEye className="w-5 h-5 text-gray-600" />
            <p className="text-xs text-gray-500">
              {Math.ceil(blog.views / 2) || 0}
            </p>
          </div>

          <div className="absolute top-14 right-5">
            {blog.author._id === user._id && (
              <BsThreeDots
                className="w-10 h-10 p-2 rotate-90 text-gray-600 rounded-full cursor-pointer hover:text-gray-800 hover:bg-gray-200 transition-all"
                onClick={() => setPopupVisible((prev) => !prev)}
              />
            )}

            {popupVisible && (
              <div
                ref={popupRef}
                className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-300 shadow-lg rounded-md p-2 z-10"
              >
                <button
                  className="w-full text-left font-medium flex items-center justify-start px-4 py-2 text-base rounded-lg hover:bg-gray-100"
                  onClick={() => setEditPopupVisible(true)}
                >
                  <span className=" text-base mr-2">
                    <LuPencil />
                  </span>
                  Edit
                </button>
                <button
                  className="w-full text-left font-medium flex items-center justify-start px-4 py-2 text-base rounded-lg text-red-500 hover:bg-gray-100"
                  onClick={handleBlogDelete}
                >
                  <span className=" text-lg mr-1.5">
                    <RiDeleteBinLine />
                  </span>
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Blog Content */}
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
            <h1 className="text-lg font-semibold text-gray-800">
              {blog.title}
            </h1>
            <div
              className="blog-description text-gray-700 scroll-auto overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            ></div>
          </div>
          <div className="flex mx-10 gap-2 items-center justify-center flex-wrap">
            {tags.map((tag, i) => (
              <div
                className="inline-block p-3 font-medium shadow-md transition-all duration-300 hover:scale-105 rounded-full bg-main cursor-pointer text-white"
                key={i}
              >
                {tag}
              </div>
            ))}
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

              <p className="font-medium text-gray-800">
                {upvotes?.length || 0}
              </p>
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

            <div className="relative">
              <div
                className="flex items-center gap-1 bg-main p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => setSharePopupVisible(!isSharePopupVisible)}
              >
                <FaShare className="w-5 h-5 text-white" />
                <p className="font-medium text-white">Share</p>
              </div>

              {isSharePopupVisible && (
                <div
                  ref={sharePopupRef}
                  className="absolute top-full mt-1 w-80 bg-white border border-gray-300 shadow-lg rounded-md p-3 z-10 flex items-center"
                >
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/blog/${id}`}
                    className="w-full px-3 py-2 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                  />
                  <div className="relative">
                    <button
                      className="ml-2 p-2 text-gray-700 rounded-md transition relative"
                      onClick={copyToClipboard}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {isClicked ? (
                        <span className="text-green-500">
                          <TiTick className=" text-xl" />
                        </span>
                      ) : (
                        <span>
                          <GoCopy />
                        </span>
                      )}
                    </button>
                    {isHovering && (
                      <div className="absolute top-[-50px] left-[-0px] bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg">
                        {isClicked ? "URL Copied!" : "Copy URL"}
                      </div>
                    )}
                  </div>
                </div>
              )}
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
                  <Comment
                    onDelete={handleCommentDelete}
                    onUpdate={handleCommentEdit}
                    comment={comment}
                    key={index}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>

          {/* Edit Blog Popup */}
          {editPopupVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-[100%] max-w-4xl h-[100%] flex flex-col relative">
                <h2 className="text-3xl font-semibold text-gray-800 text-center">
                  Edit Your Blog
                </h2>

                <label className="block text-lg font-medium mb-1">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full rounded-lg outline-none mb-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Enter your blog title here..."
                />

                <label className="block text-lg font-medium mb-1">
                  Description
                </label>
                <ReactQuill
                  value={editedDescription}
                  onChange={setEditedDescription}
                  className="w-full h-80"
                  placeholder="Write your blog content here..."
                />

                <div className="flex justify-end mt-14 gap-4">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setEditPopupVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-main text-white py-2 px-4 rounded-lg hover:bg-hovermain active:scale-[0.98] transition"
                    onClick={handleBlogEdit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Skeleton />
      )}

      <div className={`w-[20%] ${!isAuthenticated ? "hidden" : "block"} `}>
        <Profile />
      </div>
    </div>
  );
};

export default Blog;
