import Profile from "../Components/Profile";
import Blog from "../Components/Blog";
import Blogsidebar from "../components/Blogsidebar";
import { useEffect, useState } from "react";
import axiosInstance from "../constants/ProtectedRoutes";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blog/getAll");
        setBlogs(response.data);
      } catch (error) {
        console.log("error fetching blogs", error);
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="h-[95vh] bg-gray-50 flex">
      <Blogsidebar />

      {/* Blogs Area */}
      <div className="w-[60%] h-full p-2 flex flex-col scroll-auto scrollbar-none overflow-auto">
        <hr className="bg-gray-300 mt-3 border-t-gray-300" />
        {blogs.length > 0 ? ( // Only map if blogs have loaded
          blogs.map((item) => <Blog blog={item} key={item._id} />)
        ) : (
          <p>Loading blogs...</p> // Fallback while blogs are loading
        )}
      </div>

      <div className="w-[20%]">
        <Profile />
      </div>
    </div>
  );
};

export default Blogs;
