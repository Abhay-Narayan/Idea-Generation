import React, { useState } from "react";
import { VscPreview } from "react-icons/vsc";
import { MdOutlinePublish } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import axiosInstance from "../constants/ProtectedRoutes";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { ThreeDots } from "react-loader-spinner";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets";

const BlogPublish = ({ chatId }) => {
  const { user } = useSelector((state) => state.auth);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const handleModal = async () => {
    setIsPopupOpen(true);
    if (!chatId) {
      toast.error("Please select a chat to publish");
      setIsPopupOpen(false);
    } else {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/bot/getSummary/${chatId}`);
        const markdownContent = response.data.aiResponse;
        setBlogDescription(markdownContent); // Store raw markdown
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(
          "There was an error fetching the data. Please try again later."
        );
      }
    }
  };

  const handlePublish = async () => {
    if (!blogTitle) toast.error("Title cannot be empty");
    if (!blogDescription) toast.error("Description cannot be empty");
    try {
      const response = await axiosInstance.post("/blog", {
        title: blogTitle,
        description: blogDescription,
      });
      console.log(response.data);
      setBlogDescription("");
      setBlogTitle("");
      setIsPopupOpen(false);
      toast.success("Blog published Successfuly");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleclosemodal = () => {
    setIsPopupOpen(false);
    setBlogDescription("");
    setBlogTitle("");
  };

  const previewBlog = {
    username: user.username,
    title: blogTitle || "Smart Grocery Shopping Assistant",
    description:
      blogDescription ||
      "An idea to develop a chatbot that helps users create shopping lists, suggest recipes, and provide nutritional insights based on available items or dietary preferences.",
    author: user.username || "Author Name",
    image: assets.profile_pic,
    createdAt: "2024-10-20T12:18:37.991Z",
  };

  return (
    <div className="flex flex-col items-center border rounded-2xl p-2 shadow-lg bg-white">
      <button
        onClick={handlePreview}
        className="bg-white shadow-lg p-2 mb-3 text-main w-full h-12 border border-gray-400 rounded-lg flex justify-center items-center hover:bg-gray-200 active:scale-95 transition-transform"
      >
        <VscPreview className="text-2xl mr-2" /> Preview
      </button>
      <button
        onClick={handleModal}
        className="bg-main shadow-lg p-2 text-white w-full h-12 border border-gray-400 rounded-lg flex justify-center items-center hover:bg-hovermain active:scale-95 transition-transform"
      >
        <MdOutlinePublish className="text-2xl mr-2" /> Publish
      </button>

      {/* Popup for blog creation */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[100%] max-w-4xl h-[100%] flex flex-col relative">
            <h2 className="text-3xl font-semibold  text-gray-800 text-center">
              Create Your Blog
            </h2>
            {loading && (
              <div className="absolute right-[40%] top-[50%] flex flex-col justify-center items-center">
                <p className="text-[#942894] font-bold text-xl">
                  Generating summary😊
                </p>
                <ThreeDots
                  visible={true}
                  height="60"
                  width="60"
                  color="purple"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            <label className="block text-lg font-medium mb-1">Blog Title</label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg outline-none mb-2"
              placeholder="Enter your blog title here..."
            />

            <label className="block text-lg font-medium mb-1">
              Description
            </label>

            <ReactQuill
              value={DOMPurify.sanitize(marked(blogDescription))}
              onChange={setBlogDescription}
              modules={modules}
              style={{ maxHeight: "500px" }} // Increase height here
              className="px-0 h-80  w-full  resize-none text-lg "
              placeholder="Write your blog content here..."
            />

            <div className="flex justify-end mt-14 gap-4">
              <button
                onClick={handleclosemodal}
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

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-50 rounded-lg shadow-lg p-3 w-[100%] max-w-3xl h-[60%] flex flex-col overflow-y-auto scrollbar-none">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Blog Preview
            </h2>
            <Blog blog={previewBlog} />
            <button
              onClick={handleClosePreview}
              className="mt-8 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition self-end"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPublish;
