import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { BsRobot } from "react-icons/bs";
import { MdOutlinePublish } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import Profile from "../Components/Profile";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react"; // Import useRef
import axiosInstance from "../constants/ProtectedRoutes";
import Markdown from "../constants/Markdown";
import { assets } from "../assets/assets";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';


const Chatbot = () => {
  const [userChats, setUserchats] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatid, setChatid] = useState(null);
  const [message, setMessage] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null); // Create a ref for the chat container
  const contextMenuRef = useRef(null); // Ref for outside click detection

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get("/bot/getUserchats");
        setUserchats(response.data.chat);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchChats();
  }, [chatid]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (chatid) {
        // Only fetch if chatid is set
        try {
          const response = await axiosInstance.get(`/bot/getsingle/${chatid}`);
          const history = response.data.history;
          const formattedHistory = history.map((entry) => ({
            role: entry.role,
            text: entry.parts[0], // Assuming parts always has at least one element
          }));
          setChat(formattedHistory);
        } catch (error) {
          console.error(error);
        }
      } else {
        // If chatid is null, reset chat history
        setChat([]); // Clear the chat history
      }
    };
    fetchHistory();
  }, [chatid]); // Only runs when chatid changes

  const handlesendmessage = async () => {
    if (!message.trim()) {
      console.error("Message cannot be empty");
      return; // Prevent sending an empty message
    }

    try {
      setLoading(true);
      let response;
      if (chatid) {
        response = await axiosInstance.post(`/bot/chat/${chatid}`, {
          message: message,
        });
      } else {
        response = await axiosInstance.post("/bot/chat", { message: message });
        setChatid(response.data.chatId);
      }

      const assistantResponse = response.data.assistantResponse;

      // Update chat state
      setChat((prevHistory) => [
        ...prevHistory,
        { role: "user", text: { text: message } }, // Match the structure
        { role: "model", text: { text: assistantResponse } }, // Match the structure
      ]);

      setMessage("");
      setTimeout(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  const handleDeleteChat = async (id) => {
    try {
      // Call the backend to delete the chat
      await axiosInstance.delete(`/bot/chat/${id}`);

      // Update the state to remove the deleted chat
      setUserchats((prevChats) =>
        prevChats.filter((chat) => chat.chatId !== id)
      );
      setShowContextMenu(null); // Close the menu
      setActiveChatId(null); // Reset active chat when deleting
      setChatid(null);
      toast.success('Successfully Deleted')
    } catch (error) {
      console.error(
        "Error deleting chat:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to delete chat.");
    }
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setShowContextMenu(null);
        setActiveChatId(null);
      }
    },
    [contextMenuRef]
  );

  const handleContextMenuClick = (id, event) => {
    setShowContextMenu(id);
    setActiveChatId(id);
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.top + window.scrollY + buttonRect.height,
      left: buttonRect.left + window.scrollX,
    });
  };

  useEffect(() => {
    if (showContextMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [showContextMenu, handleOutsideClick]);
  const examples = [
    {
      text: "How to center a div in CSS? 🌐",
    },
    {
      text: "JavaScript array methods explained 🧑‍💻",
    },
    {
      text: "Best practices for React state management 📦",
    },
    {
      text: "How does MERN stack work? ⚙️",
    },
    {
      text: "Tailwind CSS vs. Bootstrap: Which to choose? 🎨",
    },
    {
      text: "Redux Toolkit tutorial 📚",
    },
  ];

  const getsingleChat = async (id) => {
    setChatid(id);
    setMessage("");
    setActiveChatId(id);
  };

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handlenewproject = () => {
    setChat([]); // Clear the current chat history
    setChatid(null); // Reset chat ID
    setMessage(""); // Clear the message input
  };

  const handleKeyDown = (event) => {
    if (!loading && event.key === "Enter") {
      handlesendmessage();
    }
  };

  return (
    <div className="h-[90vh] w-full bg-gray-100 flex ">
      {/* Sidebar */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="w-[18%] h-full bg-white p-4 flex flex-col">
        {/* New Project Button */}
        <button
          onClick={handlenewproject}
          className="w-full h-12 bg-main text-white rounded-lg flex items-center justify-center gap-2 hover:bg-hovermain active:scale-[0.98] transition-all"
        >
          <span className="text-xl">+</span>
          <span className="font-medium">New Project</span>
        </button>

        {/* Chat List */}
        <div className="flex-1 mt-4 overflow-y-auto scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100">
          <div className="flex flex-col gap-2">
            {userChats?.map((item) => (
              <div className="relative" key={item.chatId}>
                <button
                  key={item.chatId}
                  onClick={() => getsingleChat(item.chatId)}
                  className={`group w-full p-2 rounded-lg text-left text-base font-normal flex items-center hover:bg-gray-100 transition-colors relative ${
                    activeChatId === item.chatId ? "bg-gray-100" : ""
                  } `}
                >
                  <IoChatboxEllipsesOutline className="mr-4 max-w-5 max-h-5 min-w-5 min-h-5" />
                  <span className="truncate">{item.title}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowContextMenu(item.chatId);
                      handleContextMenuClick(item.chatId, e);
                    }}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <BsThreeDots className="rotate-90" />
                  </span>
                </button>

                {/* Context Menu */}
                {showContextMenu === item.chatId && (
                  <div
                    ref={contextMenuRef}
                    style={{ top: popupPosition.top, left: popupPosition.left }}
                    className="fixed bg-white border border-gray-300 shadow-lg rounded-2xl p-2 w-32 z-50"
                  >
                    <button
                      onClick={() => handleDeleteChat(item.chatId)}
                      className="w-full text-left font-medium flex items-center justify-start text-red-500 p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {" "}
                      <span className=" text-lg mr-1.5">
                        <RiDeleteBinLine />
                      </span>
                      Delete
                    </button>
                    <button className="w-full text-left font-medium flex items-center justify-start p-2 hover:bg-gray-100 rounded-lg">
                      {" "}
                      <span className=" text-base mr-2">
                        <LuPencil />
                      </span>
                      Rename
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Settings Button */}
        <button className="w-full h-12 mt-4 border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
          <IoSettingsOutline className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="w-[62%] flex flex-col items-center justify-center relative">
        <div
          className="h-[80%] w-[98%] overflow-y-scroll hide-scroll-bar pt-4 flex flex-col"
          ref={chatContainerRef}
        >
          {chat.length > 0 ? (
            chat.map((item, index) => (
              <div
                key={index}
                className={`max-w-[85%] p-3 flex mb-5 gap-2 shadow-lg ${
                  item.role === "model"
                    ? "bg-surface rounded-lg ml-[11%] self-start max-w-[77.6%]"
                    : "bg-white rounded-lg max-w-[65%] self-end mr-[11%] flex-row-reverse"
                }`}
              >
                <span
                  className={`p-2 h-8 w-8 rounded-full ${
                    item.role === "model" ? "bg-white" : "bg-gray-300"
                  }`}
                >
                  {item.role === "user" ? <LuUser /> : <BsRobot />}
                </span>
                <div className="leading-loose overflow-hidden">
                  <Markdown
                    content={
                      item.text && item.text.text
                        ? item.text.text
                        : "No text available"
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="h-[80%] flex flex-col justify-center items-center rounded-lg  p-6">
              <div className="text-3xl font-bold text-main mb-6">
                <img className="h-20" src={assets.logo} alt="logo" />
              </div>
              <div className="flex flex-wrap justify-center max-w-[900px]">
                {examples.map((item, index) => (
                  <div
                    className="text-base font-medium mt-4 mx-2 p-4 border border-gray-300 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-main hover:text-white hover:scale-105 shadow-md"
                    key={index}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          )}
          {loading && (
            <div className="absolute bottom-[14%] right-[48%] z-10">
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
        </div>

        {/* Input Section */}
        <div className="h-[15%] w-[80%] flex flex-col items-center justify-center mt-4">
          <div className="w-full flex justify-center relative">
            <input
              type="text"
              className="w-full border outline-none rounded-3xl p-4 pr-16 shadow-lg h-[60px] scrollbar-none"
              placeholder="What's in your mind?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handlesendmessage}
              disabled={loading} // Disable the button when loading is true
              className={`bg-main border-[15px] border-main text-white rounded-full absolute right-2 top-1.5 
                ${
                  loading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-hovermain hover:border-hovermain"
                }`}
            >
              <FiSend />
            </button>
          </div>
          <small className="font-light mt-2">
            AI can generate incorrect information.
          </small>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={`h-full w-[20%] mr-2 flex flex-col gap-7 ${
          !isAuthenticated && "hidden"
        }`}
      >
        <Profile />
        <div className="flex flex-col items-center border rounded-2xl p-2 shadow-lg bg-white">
          <button className="bg-white shadow-lg p-2 mb-3 text-main w-full h-12 border border-gray-400 rounded-lg flex justify-center items-center hover:bg-gray-200 active:scale-95 transition-transform">
            <VscPreview className="text-2xl mr-2" /> Preview
          </button>
          <button className="bg-main shadow-lg p-2 text-white w-full h-12 border border-gray-400 rounded-lg flex justify-center items-center hover:bg-hovermain active:scale-95 transition-transform">
            <MdOutlinePublish className="text-2xl mr-2" /> Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
