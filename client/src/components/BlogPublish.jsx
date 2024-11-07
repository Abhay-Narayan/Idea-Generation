import React, { useState } from 'react';
import { VscPreview } from 'react-icons/vsc';
import { MdOutlinePublish } from 'react-icons/md';

const BlogPublish = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [blogContent, setBlogContent] = useState('');

  const handlePublish = () => {
    console.log('Blog Published:', { blogTitle, blogDescription, blogContent });
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-col items-center border rounded-2xl p-2 shadow-lg bg-white">
      {/* Preview and Publish buttons */}
      <button className="bg-white shadow-lg p-2 mb-3 text-main w-full h-12 border border-gray-400 rounded-lg flex justify-center items-center hover:bg-gray-200 active:scale-95 transition-transform">
        <VscPreview className="text-2xl mr-2" /> Preview
      </button>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-main shadow-lg p-2 text-white w-full h-12 border border-gray-400 rounded-lg flex justify-center items-center hover:bg-hovermain active:scale-95 transition-transform"
      >
        <MdOutlinePublish className="text-2xl mr-2" /> Publish
      </button>

      {/* Popup for blog creation */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-4xl h-[80%] flex flex-col">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Create Your Blog</h2>

            {/* Title Input */}
            <label className="block text-lg font-medium mb-2">Blog Title</label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-main focus:border-main mb-4 text-lg"
              placeholder="Enter your blog title here..."
            />

            {/* Description Input */}
            <label className="block text-lg font-medium mb-2">Description</label>
            <textarea
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-main focus:border-main mb-4 text-lg"
              rows="3"
              placeholder="Add a brief description..."
            />

            {/* Content Input */}
            <label className="block text-lg font-medium mb-2">Content</label>
            <textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="border border-gray-300 p-4 w-full rounded-lg focus:ring-main focus:border-main mb-4 h-52 resize-none text-lg"
              placeholder="Write your blog content here..."
            />

            {/* Action buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="bg-main text-white py-2 px-4 rounded-lg hover:bg-hovermain active:scale-[0.98] transition"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default BlogPublish;
