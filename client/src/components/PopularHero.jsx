import React, { useState } from "react";
import aimage3 from "../assets/aimage3.jpg";
import { FaThumbsUp } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";

const popularBlogs = [
  {
    title: "How AI is Transforming Project Management",
    description:
      "Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 150,
    date: "2024-10-15",
  },
  {
    title: "The Future of Software Development",
    description:
      "Insights into upcoming trends and technologies shaping software development. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 130,
    date: "2024-10-10",
  },
  {
    title: "Building Scalable Applications",
    description:
      "A guide to building applications that can scale seamlessly. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 120,
    date: "2024-10-05",
  },
  {
    title: "Mastering Cloud Integration",
    description:
      "Tips and techniques for seamless cloud integration. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 110,
    date: "2024-09-25",
  },
  {
    title: "AI in Healthcare",
    description:
      "How AI is revolutionizing the healthcare industry. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 105,
    date: "2024-09-15",
  },
  {
    title: "Building Scalable Applications",
    description:
      "A guide to building applications that can scale seamlessly. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 120,
    date: "2024-10-05",
  },
  {
    title: "Mastering Cloud Integration",
    description:
      "Tips and techniques for seamless cloud integration. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 110,
    date: "2024-09-25",
  },
  {
    title: "AI in Healthcare",
    description:
      "How AI is revolutionizing the healthcare industry. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 105,
    date: "2024-09-15",
  },
  {
    title: "The Future of Software Development",
    description:
      "Insights into upcoming trends and technologies shaping software development. Explore the innovative ways AI is changing project management practices. Explore the innovative ways AI is changing project management practices.",
    upvotes: 130,
    date: "2024-10-10",
  },
];

const PopularHero = () => {
  const [showAll, setShowAll] = useState(false);

  // Limit to 3 blogs if showAll is false
  const displayedBlogs = showAll ? popularBlogs : popularBlogs.slice(0, 3);

  return (
    <section className="py-8 px-6 bg-[#f7f7fc] h-full flex flex-col items-center">
      <div className="sticky top-0 bg-[#f7f7fc] w-full py-4 z-10">
        <h2 className="text-4xl font-bold text-black text-center">
          Popular Blogs
        </h2>
      </div>
      <div className="flex w-full">
        <div className="sticky top-10 h-screen flex flex-col items-center justify-center w-1/3">
          <img
            src={aimage3}
            alt="Popular Blogs Illustration"
            className="h-[600px] w-[400px] rounded-lg object-cover shadow-lg mb-5"
          />
        </div>

        {/* Blogs Section */}
        <div className="w-2/3 px-6 overflow-auto scrollbar-none mt-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedBlogs.map((blog, index) => (
              <div
                key={index}
                className={`bg-gray-100 border border-gray-200 rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105 ${
                  index === 0 ? "col-span-2" : "" // First blog card spans two columns
                }`}
              >
                <h3 className="text-2xl font-semibold text-black mb-2 line-clamp-1">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-4">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <BiCalendar className="text-main" />
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-main">
                    <FaThumbsUp /> {blog.upvotes} Upvotes
                  </span>
                </div>
                <button className="w-full rounded border border-gray-400 bg-white py-2 font-medium transition-colors duration-200 hover:bg-main outline-none">
                  Read More
                </button>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {popularBlogs.length > 3 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 rounded-full bg-main text-white font-medium hover:bg-[#9e7ce8] transition duration-200"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularHero;
