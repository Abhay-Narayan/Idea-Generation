import Profile from "../components/Profile";
import Blog from "../Components/Blog";
import Blogsidebar from "../components/Blogsidebar";
import { useEffect, useState } from "react";
import axiosInstance from "../constants/ProtectedRoutes";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogSkeleton from "../constants/BlogsSkeleton";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const deleteBlogFromList = (blogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    toast.success("Successfully deleted");
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setEditedTitle(blog.title);
    setEditedDescription(blog.description);
    setIsEditPopupOpen(true);
  };

  const handleUpdateBlog = async () => {
    try {
      const response = await axiosInstance.put(
        `/blog/updateBlog/${currentBlog._id}`,
        {
          title: editedTitle,
          description: editedDescription,
        }
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === currentBlog._id ? response.data : blog
        )
      );
      setIsEditPopupOpen(false);
      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update the blog.");
    }
  };
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
      <Toaster position="top-center" reverseOrder={false} />
      <Blogsidebar />

      {/* Blogs Area */}
      <div className="w-[60%] h-full p-2 flex flex-col scroll-auto scrollbar-none overflow-auto">
        <hr className="bg-gray-300 mt-3 border-t-gray-300" />
        {blogs.length > 0 ? ( // Only map if blogs have loaded
          blogs.map((item) => (
            <Link to={`/blog/${item._id}`} key={item._id} target="_blank">
              <Blog
                blog={item}
                key={item._id}
                deleteBlog={deleteBlogFromList}
                handleEditBlog={handleEditBlog}
              />
            </Link>
          ))
        ) : (
          <BlogSkeleton />
        )}
      </div>

      <div className={`w-[20%] ${!isAuthenticated ? "hidden" : "block"} `}>
        <Profile />
      </div>

      {/* Edit Popup */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[100%] max-w-4xl h-[100%] flex flex-col relative">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Edit Your Blog
            </h2>

            <label className="block text-lg font-medium mb-1">Blog Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg outline-none mb-2"
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
                onClick={() => setIsEditPopupOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBlog}
                className="bg-main text-white py-2 px-4 rounded-lg hover:bg-hovermain active:scale-[0.98] transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
