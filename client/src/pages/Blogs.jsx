import Profile from "../components/Profile";
import Blog from "../Components/Blog";
import Blogsidebar from "../components/Blogsidebar";
import { useEffect, useState } from "react";
import axiosInstance from "../constants/ProtectedRoutes";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogSkeleton from "../constants/BlogsSkeleton";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
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
    <div className="h-[90vh] bg-gray-50 flex">
      <Blogsidebar />

      {/* Blogs Area */}
      <div className="w-[60%] h-full p-2 flex flex-col scroll-auto scrollbar-none overflow-auto">
        <hr className="bg-gray-300 mt-3 border-t-gray-300" />
        {blogs.length > 0 ? (
          blogs.map((item) => (
            <Link to={`/blog/${item._id}`} key={item._id} target="_blank">
              <Blog blog={item} key={item._id} />
            </Link>
          ))
        ) : (
          <BlogSkeleton />
        )}
      </div>

      <div className={`w-[20%] ${!isAuthenticated ? "hidden" : "block"} `}>
        <Profile />
      </div>
    </div>
  );
};

export default Blogs;
