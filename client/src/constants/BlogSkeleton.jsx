import React from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentDots, FaShare } from "react-icons/fa";
import { IoEye } from "react-icons/io5";

const Skeleton = () => {
  return (
    <div className="w-[60%] overflow-y-auto scrollbar scrollbar-thumb-main scrollbar-track-slate-100 bg-white rounded-lg border p-4 hover:shadow-xl relative animate-pulse">
      {/* Views Skeleton */}
      <div className="absolute flex items-center right-4 top-4 gap-1 opacity-70">
        <IoEye className="w-5 h-5 text-gray-600" />
        <div className="w-12 h-3 bg-gray-200 rounded-sm"></div>
      </div>

      {/* Author Section Skeleton */}
      <div className="flex items-center gap-3 mt-1">
        <div className="relative w-8 h-8">
          <div className="w-full h-full rounded-full bg-gray-300"></div>
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded-sm"></div>
        <span className="text-gray-400">•</span>
        <div className="w-16 h-3 bg-gray-200 rounded-sm"></div>
      </div>

      {/* Title and Description Skeleton */}
      <div className="flex flex-col gap-1 mt-3">
        <div className="w-3/4 h-5 bg-gray-200 rounded-sm"></div>
        <div className="w-full h-24 bg-gray-200 rounded-sm mt-3"></div>
      </div>

      {/* Interaction Section Skeleton */}
      <div className="flex items-center text-sm mt-4 gap-4">
        <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-full shadow-sm">
          <BiUpvote className="w-5 h-5 text-gray-600" />
          <div className="w-6 h-3 bg-gray-200 rounded-sm"></div>
          <BiDownvote className="w-5 h-5 text-gray-600" />
        </div>

        <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-full shadow-sm">
          <FaRegCommentDots className="w-5 h-5 text-gray-600" />
          <div className="w-6 h-3 bg-gray-200 rounded-sm"></div>
        </div>

        <div className="cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-1 bg-main p-2 rounded-full shadow-sm hover:shadow-md">
          <FaShare className="w-5 h-5 text-white" />
          <div className="w-12 h-3 bg-gray-200 rounded-sm"></div>
        </div>
      </div>

      {/* Comment Input Skeleton */}
      <div className="mt-6">
        <div className="w-1/2 h-6 bg-gray-200 rounded-sm"></div>
        <div className="w-full h-24 bg-gray-200 rounded-sm mt-2"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-sm mt-3"></div>
      </div>

      {/* Comments Section Skeleton */}
      <div className="mt-6">
        <div className="w-1/4 h-6 bg-gray-200 rounded-sm"></div>
        <div className="space-y-4 mt-3">
          <div className="w-full h-12 bg-gray-200 rounded-sm mb-3"></div>
          <div className="w-full h-12 bg-gray-200 rounded-sm mb-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
