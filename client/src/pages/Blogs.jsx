  import Profile from "../Components/Profile"
  import Blog from "../components/Blog"
  import Blogsidebar from "../components/Blogsidebar"

  const blogs = [
    { 
      id: 1, 
      title: "Virtual Event Platform",
      description: "A chatbot-assisted discussion about creating a virtual platform where users can host and join online events. Features include virtual networking rooms, interactive sessions, and real-time Q&A.",
      author: "Jess"
    },
    { 
      id: 2, 
      title: "AI-Powered Personal Finance Manager",
      description: "Exploring an AI chatbot for managing personal finances, offering budgeting advice, expense tracking, and personalized saving goals. Ideal for users looking to improve their financial literacy.",
      author: "Jason"
    },
    { 
      id: 3, 
      title: "E-learning Content Recommendation System",
      description: "Discussing a recommendation system that suggests learning resources based on user preferences and progress, using AI to curate and personalize educational content.",
      author: "Tim"
    },
    { 
      id: 4, 
      title: "Smart Grocery Shopping Assistant",
      description: "An idea to develop a chatbot that helps users create shopping lists, suggest recipes, and provide nutritional insights based on available items or dietary preferences.",
      author: "Sarah"
    },
    { 
      id: 5, 
      title: "Remote Team Collaboration Hub",
      description: "Conversation around creating a platform for remote teams that integrates project management, real-time messaging, and collaborative tools in a single interface.",
      author: "Michael"
    },
    { 
      id: 6, 
      title: "Mental Health Support Chatbot",
      description: "Brainstorming a chatbot to provide mental health support, offering techniques for stress relief, mindfulness exercises, and connecting users with resources.",
      author: "Emily"
    }
  ];




  const Blogs = () => {
    return (
      <div className="h-[95vh] bg-gray-50 flex ">
        <Blogsidebar/>
        {/* Blogs Area */}
        <div className="w-[60%] h-full p-2 flex flex-col scroll-auto scrollbar-none overflow-auto">
          <hr className="bg-gray-300 mt-3 border-t-gray-300" />
          {blogs.map((item)=>(
            <Blog blog={item} key={item.id}/>
          ))}
        </div>
        <div className="w-[20%]">
          <Profile/>
        </div>
      </div>
    )
  }

  export default Blogs