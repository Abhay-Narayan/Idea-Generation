import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-lg border mt-3 p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] relative animate-pulse">
      {/* Views */}
      <div className="absolute flex items-center right-4 top-4 gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div> {/* Placeholder for icon */}
        <div className="w-10 h-3 bg-gray-300 rounded-md"></div> {/* Placeholder for view count */}
      </div>

      {/* Author Section */}
      <div className="flex items-center gap-3 mt-1">
        <div className="relative w-8 h-8">
          <div className="w-full h-full bg-gray-300 rounded-full"></div> {/* Placeholder for profile image */}
        </div>
        <div className="w-24 h-3 bg-gray-300 rounded-md"></div> {/* Placeholder for username */}
        <span className="text-gray-400">•</span>
        <div className="w-16 h-3 bg-gray-300 rounded-md"></div> {/* Placeholder for time */}
      </div>

      {/* Blog Title and Description */}
      <div className="flex flex-col gap-1 mt-3">
        <div className="w-36 h-4 bg-gray-300 rounded-md"></div> {/* Placeholder for title */}
        <div className="w-full h-6 bg-gray-300 rounded-md mt-2"></div> {/* Placeholder for description */}
        <div className="w-3/4 h-4 bg-gray-300 rounded-md mt-1"></div> {/* Another placeholder for description */}
      </div>

      {/* Interaction Section */}
      <div className="flex items-center text-sm mt-4 gap-4">
        {/* Upvote/Downvote Section */}
        <div className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div> {/* Placeholder for upvote icon */}
          <div className="w-12 h-3 bg-gray-300 rounded-md"></div> {/* Placeholder for upvote count */}
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div> {/* Placeholder for downvote icon */}
        </div>

        {/* Comments Section */}
        <div className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div> {/* Placeholder for comment icon */}
          <div className="w-12 h-3 bg-gray-300 rounded-md"></div> {/* Placeholder for comment count */}
        </div>

        {/* Share Section */}
        <div className="flex items-center gap-1 bg-main p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div> {/* Placeholder for share icon */}
          <div className="w-16 h-3 bg-gray-300 rounded-md"></div> {/* Placeholder for share text */}
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
