import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from 'react-icons/fa';
import { FiCopy, FiMail } from 'react-icons/fi';
import { SiWhatsapp, SiLinkedin, SiInstagram, SiReddit } from 'react-icons/si';
import axiosInstance from '../constants/ProtectedRoutes';

const SingleBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null); // State to store the blog data
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false); // Track if the user has voted
  const [hasUpvoted, setHasUpvoted] = useState(false); // Track if the user has upvoted
  const [hasDownvoted, setHasDownvoted] = useState(false); // Track if the user has downvoted
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${id}`);
        console.log('Blog data:', response.data);  // Log the response data to ensure it's correct
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching the blog:', error);
        setBlog({ error: 'Failed to fetch blog data.' });
      }
    };
  
    if (id) {
      fetchBlog();
    } else {
      console.error('Invalid blog ID:', id); // Log error if the ID is invalid
    }
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>; // Show loading until blog data is fetched
  }

  const handleUpvote = () => {
    if (hasDownvoted) {
      setDownvotes(downvotes - 1); // Remove downvote
      setHasDownvoted(false);
    }
    if (!hasUpvoted) {
      setUpvotes(upvotes + 1); // Add upvote
      setHasUpvoted(true);
    } else {
      setUpvotes(upvotes - 1); // Remove upvote
      setHasUpvoted(false);
    }
  };

  const handleDownvote = () => {
    if (hasUpvoted) {
      setUpvotes(upvotes - 1); // Remove upvote
      setHasUpvoted(false);
    }
    if (!hasDownvoted) {
      setDownvotes(downvotes + 1); // Add downvote
      setHasDownvoted(true);
    } else {
      setDownvotes(downvotes - 1); // Remove downvote
      setHasDownvoted(false);
    }
  };


  const toggleComments = () => setShowComments(!showComments);

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  const addReply = (index, replyText) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.push(replyText);
    setComments(updatedComments);
  };

  const handleShare = () => setShowSharePopup(!showSharePopup);

  // Function to handle copying the blog link to clipboard
  const handleCopyLink = async () => {
    try {
      const linkToCopy = window.location.href;
      await navigator.clipboard.writeText(linkToCopy);
      alert('Link copied to clipboard!');  // Optionally, use toast notification
    } catch (err) {
      console.error('Failed to copy the link:', err);
      alert('Failed to copy the link. Please try again.');
    }
  };

  // Close the share popup
  const closeSharePopup = () => setShowSharePopup(false);

  
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p className="text-gray-700 mb-4">{blog.content}</p>

      {/* Upvote/Downvote */}
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={handleUpvote} 
          className={`flex items-center text-blue-600 ${hasUpvoted ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <FaThumbsUp className="mr-1" /> {upvotes}
        </button>
        <button 
          onClick={handleDownvote} 
          className={`flex items-center text-red-600 ${hasDownvoted ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <FaThumbsDown className="mr-1" /> {downvotes}
        </button>
      </div>

      {/* Comment and Share */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={toggleComments} className="flex items-center text-gray-600">
          <FaComment className="mr-1" /> Comments
        </button>
        <button onClick={handleShare} className="flex items-center text-gray-600">
          <FaShare className="mr-1" /> Share
        </button>
      </div>

{/* Share Popup */}
{showSharePopup && (
  <div className="bg-white p-4 rounded-lg shadow-lg mt-2 absolute z-10 border border-gray-200">
    {/* Close Button */}
    <button
      onClick={closeSharePopup}
      className="absolute top-2 right-2 bg-red-600 text-white p-2 w-8 h-8 flex items-center justify-center rounded-sm hover:bg-red-700 focus:outline-none"
    >
      <span className="text-xl font-bold">×</span> {/* The "X" symbol */}
    </button>
    <p className="font-bold mb-2">Share this post:</p>
    <div className="flex gap-4">
      <button onClick={handleCopyLink} className="text-gray-700">
        <FiCopy /> Copy Link
      </button>
      <a href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-green-500">
        <SiWhatsapp /> WhatsApp
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700">
        <SiLinkedin /> LinkedIn
      </a>
      <a href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-purple-500">
        <SiInstagram /> Instagram
      </a>
      <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-orange-500">
        <SiReddit /> Reddit
      </a>
      <a href={`mailto:?subject=Check out this blog&body=${encodeURIComponent(window.location.href)}`} className="text-gray-700">
        <FiMail /> Email
      </a>
    </div>
  </div>
)}

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Comments</h3>

          <div className="mb-4">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={addComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Comment
            </button>
          </div>

          {comments.map((comment, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <p className="text-gray-800">{comment.text}</p>
              <div className="ml-4 mt-2">
                {comment.replies.map((reply, replyIndex) => (
                  <p key={replyIndex} className="text-gray-600 ml-2">↳ {reply}</p>
                ))}
                <ReplyForm onReply={(replyText) => addReply(index, replyText)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ReplyForm component to handle comment replies
const ReplyForm = ({ onReply }) => {
  const [reply, setReply] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      onReply(reply);
      setReply('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Add a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Reply
      </button>
    </form>
  );
};

export default SingleBlog;
