import React from "react";
import aimage3 from '../assets/aimage3.png'; // Import your image here

const popularBlogs = [
  {
    title: "How AI is Transforming Project Management",
    description:
      "Explore the innovative ways AI is changing project management practices.",
    upvotes: 150,
    date: "2024-10-15",
  },
  {
    title: "The Future of Software Development",
    description:
      "Insights into upcoming trends and technologies shaping software development.",
    upvotes: 130,
    date: "2024-10-10",
  },
  {
    title: "Building Scalable Applications",
    description: "A guide to building applications that can scale seamlessly.",
    upvotes: 120,
    date: "2024-10-05",
  },
];

const PopularHero = () => {
  return (
    <section className="py-5 px-6 bg-[#f7f7fc] flex h-screen ">
      {/* Image on the Left */}
      <div className="w-1/2 flex justify-center items-end">
        <img src={aimage3} alt="Descriptive Alt Text" className="mb-5 h-[500px] w-[510px] rounded-lg mr-3" />
      </div>

      <div className="w-1/2 flex flex-col justify-center ">
        <h2 className="text-5xl font-extrabold text-center mb-8 tracking-wide">
          Popular Blogs
        </h2>

        {/* Container for Blogs */}
        <div className="grid grid-cols-1 gap-4">
          {/* First Blog as a Large Card */}
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-col  transition-transform transform hover:scale-105 gap-3"
          >
            <div className="w-full">
              <h3 className="text-xl font-bold text-black mb-2">
                {popularBlogs[0].title}
              </h3>
              <p className="text-gray-500 overflow-hidden">
                {popularBlogs[0].description}
              </p>
            </div>
            <div className="flex items-center justify-between text-gray-500 text-sm  w-full">
              <span>{popularBlogs[0].date}</span>
              <span className="font-semibold text-[#7c4ee4]">
                {popularBlogs[0].upvotes} Upvotes
              </span>
            </div>
            <button className="outline-none p-2 w-1/3 rounded bg-[#7c4ee4] text-white font-medium transition-colors duration-200 hover:bg-[#9e7ce8]">
              Read More
            </button>
          </div>

          {/* Grid for Remaining Blogs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularBlogs.slice(1).map((blog, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-col gap-3 transition-transform transform hover:scale-105"
              >
                <div className="w-full">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 h-16">
                    {blog.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-gray-500 text-sm w-full">
                  <span>{blog.date}</span>
                  <span className="font-semibold text-[#7c4ee4]">
                    {blog.upvotes} Upvotes
                  </span>
                </div>
                <button className="py-1 px-2 w-full rounded bg-[#7c4ee4] text-white font-medium transition-colors duration-200 hover:bg-[#9e7ce8] outline-none">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularHero;
