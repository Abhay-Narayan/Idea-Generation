import React, { useState } from "react";
import { assets } from "../assets/assets/";
import { useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; 
import { FiMoreVertical } from "react-icons/fi"; 
import { formatDistanceToNow } from "date-fns"; 

const Comment = ({ comment, onUpdate, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const isOwner = user?._id === comment.user?._id;
  const [isEditing, setIsEditing] = useState(false);
  const [newCommentText, setNewCommentText] = useState(comment.text);
  const [showMenu, setShowMenu] = useState(false); 

  return (
    <div className="p-4 border bg-white shadow-md rounded-lg flex gap-4">
      {/* User profile picture */}
      <div className="relative w-12 h-12">
        <img
          src={comment.user.profilePic || assets.profile_pic} exists
          alt={comment.user.username}
          className="w-full h-full rounded-full border-2 border-gray-300 shadow-sm"
        />
      </div>

      {/* Comment details */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            {comment.user.username}
            <span className="text-xs text-gray-500">
              • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </p>

          {/* Three-dots menu */}
          { (
            <div className="relative">
              <button
                onClick={() => isOwner && setShowMenu(!showMenu)}
                className="text-gray-600 hover:text-gray-800 p-1"
              >
                <FiMoreVertical size={18} />
              </button>

              {showMenu && (
                <div className="absolute right-0  w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                    }}
                    className=" flex justify-start items-center font-medium w-full text-left px-2 py-2 text-base text-purple-600 hover:bg-gray-100"
                  >
                    <AiOutlineEdit size={17} className="ml-[0.55rem] mr-3" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(comment._id);
                      setShowMenu(false);
                    }}
                    className="flex gap-1 font-medium justify-center items-center w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <AiOutlineDelete size={17} className=" mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Editing and Displaying Comment */}
        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-main"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  onUpdate(newCommentText,comment._id);
                  setNewCommentText("");
                  setIsEditing(false);
                }}
                className="px-4 py-1 bg-main text-white rounded-lg hover:bg-hovermain transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mt-2">{comment.text}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
