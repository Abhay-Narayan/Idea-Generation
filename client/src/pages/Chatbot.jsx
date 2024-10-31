import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { BsRobot } from "react-icons/bs";
import { MdOutlinePublish } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import Profile from "../Components/Profile";

const Chatbot = () => {
  const examples = [
    "How to center a div in CSS?",
    "JavaScript array methods explained",
    "Best practices for React state management",
    "How does MERN stack work?",
    "Tailwind CSS vs. Bootstrap: Which to choose?",
    "Redux Toolkit tutorial",
  ];

  const chat = [
    {
      role: "user",
      message:
        "Hello! Can you help me with a coding problem I'm facing? I'm really stuck and could use some guidance.",
    },
    {
      role: "bot",
      message:
        "Of course! I'm here to help. What specific coding problem are you encountering? Feel free to provide as many details as you can.",
    },
    {
      role: "user",
      message:
        "I'm trying to figure out how to center a div in CSS. I've tried a few different methods, but nothing seems to work as expected.",
    },
    {
      role: "bot",
      message:
        "Centering a div can be done in a couple of ways. One common method is to set the margin to auto and define a width. For example:\n\n```css\n.centered-div {\n  width: 50%;\n  margin: 0 auto;\n}\n``` This will center the div horizontally within its parent container.",
    },
    {
      role: "user",
      message:
        "That makes sense! I think I can try that. How about aligning text within that div? I want to make sure the text looks good as well.",
    },
    {
      role: "bot",
      message:
        "To center text within a div, you can use the `text-align` property. For instance:\n\n```css\n.centered-div {\n  text-align: center;\n}\n``` This will ensure that any text inside the div is centered properly. You can also use flexbox for more advanced alignment if needed.",
    },
    {
      role: "user",
      message:
        "Thank you! That's really helpful. I appreciate the detailed explanation. I might have a couple more questions once I try this out.",
    },
    {
      role: "bot",
      message:
        "You're very welcome! Feel free to reach out anytime if you have more questions or need further assistance. I'm here to help you along the way!",
    },
  ];

  // const chat = [];

  return (
    <div className="h-screen w-full bg-gray-200 flex">
      <div className="w-[18%] h-[89.5%] border rounded-2xl bg-gray-100 p-4 mx-4 my-16">
        <div className="h-[5%]">
          <button className="bg-main text-white w-full h-[50px] border border-gray-400 rounded-lg flex justify-center items-center hover:bg-hovermain active:scale-[.98] ">
            <span className="text-3xl mr-2">+</span> New Project
          </button>
        </div>
        <div className="h-[78%] mt-8 overflow-scroll overflow-x-hidden scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100">
          {[
            1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          ].map((item, index) => (
            <div className="py-3 rounded text-base font-normal flex items-center px-4 hover:bg-gray-200 cursor-pointer">
              <span className="mr-4">
                <IoChatboxEllipsesOutline />
              </span>
              My Projects
            </div>
          ))}
        </div>
        <div className="h-[10%] mt-6 flex justify-center">
          <button className="w-[90%] h-[50px] border border-gray-400 rounded-3xl flex items-center justify-center px-4 hover:bg-gray-200">
            <span className="mr-3">
              <IoSettingsOutline />
            </span>{" "}
            Settings
          </button>
        </div>
      </div>
      <div className="w-[62%] flex flex-col items-center justify-center">
        {chat?.length > 0 ? (
          <div className="h-[80%] w-[98%] mt-10 overflow-scroll hide-scroll-bar pt-8 flex flex-col items-start ">
            {chat.map((item, index) => (
              <div
                key={index}
                className={`w-[70%] p-6 gap-2 flex mb-5 justify-center ${
                  item.role === "bot"
                    ? "bg-surface rounded-lg ml-[10%]"
                    : "bg-white rounded-lg ml-[20%] flex-row-reverse"
                }`}
              >
                <span
                  className={`p-2 h-8 w-8 mt-1 rounded-full ${
                    item.role === "bot" ? "bg-white" : "bg-gray-300"
                  }`}
                >
                  {item.role === "user" ? <LuUser /> : <BsRobot />}
                </span>
                <div className="leading-loose">{item.message}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[80%] flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-8">Kreativ</div>
            <div className="flex flex-wrap justify-around max-w-[900px]">
              {examples.map((item, index) => (
                <div className="text-base font-light mt-4 p-4 border border-gray-300 rounded cursor-pointer min-w-[400px] hover:bg-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-[15%] w-[80%]">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-full flex justify-center relative">
              <input
                type="text"
                className="w-full border outline-none rounded-3xl p-4 pr-16 shadow-lg"
                placeholder="What's in your mind?"
              />
              <span className="bg-main border-[15px] border-main text-white rounded-full absolute right-2 top-1.5 cursor-pointer hover:bg-hovermain hover:border-hovermain">
                <FiSend />
              </span>
            </div>

            <small className="font-light mt-2">
              AI can generate incorrect information.
            </small>
          </div>
        </div>
      </div>
      <div className="h-[90%] w-[20%] flex flex-col my-12">
        <Profile />
        <div className="flex flex-col items-center border rounded-2xl bg-gray-100 p-4 m-4">
          <div className="flex flex-col">
            <button className="bg-white p-5 mb-3 text-main w-full h-[50px] border border-gray-400 rounded-lg flex justify-center items-center hover:bg-gray-200 active:scale-[.98] ">
              <span className="text-2xl mr-2">
                <VscPreview />
              </span>{" "}
              Preview
            </button>
            <button className="bg-main p-5 text-white w-full h-[50px] border border-gray-400 rounded-lg flex justify-center items-center hover:bg-hovermain active:scale-[.98] ">
              <span className="text-2xl mr-2">
                <MdOutlinePublish />
              </span>{" "}
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
