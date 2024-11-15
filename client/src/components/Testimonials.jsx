import React, { useState, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io"

const testimonials = [
  {
    name: "Emily Richards",
    role: "Aspiring Developer",
    organization: "Freelancer",
    testimonial: "This platform has been amazing for shaping my project ideas! The AI suggestions helped me refine my concept and made the planning phase so much smoother.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "David Thompson",
    role: "Project Manager",
    organization: "Innova Tech",
    testimonial: "The ability to discuss the pros and cons with the AI is incredible. It’s like having a brainstorming partner available anytime, and the final summary is so helpful for pitching my ideas.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Sophia Nguyen",
    role: "Software Engineer",
    organization: "Code Solutions",
    testimonial: "The platform’s AI really understands project nuances. I got valuable implementation tips that improved my initial concept and made the project much more feasible.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Lee",
    role: "Entrepreneur",
    organization: "Startup Hub",
    testimonial: "This platform’s business-oriented summaries are spot on! The AI helped me see the market potential of my idea, making it easier to attract investors and stakeholders.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    name: "Rachel Kim",
    role: "Content Creator",
    organization: "Tech Insights",
    testimonial: "Turning finalized ideas into blog posts is genius. I enjoy reading other users’ project journeys, and it’s inspiring to see how their ideas evolved through AI interactions.",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    organization: "Big Data Analytics",
    testimonial: "The curated best-voted ideas are my favorite part. It’s a goldmine of innovative concepts, and it motivates me to keep refining my own ideas to make it to the timeline!",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Olivia Parker",
    role: "Tech Enthusiast",
    organization: "Future Innovators",
    testimonial: "I love how interactive the platform is! The AI gives personalized feedback, and seeing my idea as a blog post has boosted my confidence in project planning.",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
  },
  {
    name: "Jack Wilson",
    role: "UX Designer",
    organization: "Design Pros",
    testimonial: "The AI’s suggestions made my project more user-friendly, and I got great feedback from the community. The voting system is a great touch for ranking innovative ideas!",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Isabella Martinez",
    role: "Product Analyst",
    organization: "Market Trends Inc.",
    testimonial: "The platform helped me turn my idea into a clear, market-ready concept. The AI’s insights were super valuable for refining my idea and preparing it for execution.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "William Brown",
    role: "Startup Founder",
    organization: "Green Innovate",
    testimonial: "From brainstorming to finalizing a project pitch, this platform has it all. It’s incredibly user-friendly, and the community engagement is a huge plus for getting feedback.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Emma Roberts",
    role: "Innovation Coach",
    organization: "Bright Minds",
    testimonial: "This is the future of project development! The AI was able to point out potential roadblocks early on, helping me guide my clients to more polished and practical ideas.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Lucas Martinez",
    role: "Software Architect",
    organization: "Digital Solutions",
    testimonial: "Using this platform has improved my planning process tremendously. The AI provides implementation suggestions that are truly insightful and actionable.",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the testimonials every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 3 ? 0 : prevIndex + 3
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Display the current set of 3 testimonials
  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  // Manual navigation functions
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 3
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 3 ? 0 : prevIndex + 3
    );
  };

  return (
    <section className="bg-purple-100 py-12">
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-3xl font-semibold mb-8 ">What Our Users Say</h2>
        
        {/* Testimonials container */}
        <div className="flex items-center justify-center space-x-4">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className=" bg-purple-700 text-white rounded-full hover:bg-purple-800 focus:outline-none"
          >
            <IoIosArrowDropleft className="h-9 w-9"/>
          </button>

          {/* Display 3 Testimonials */}
          <div className="flex space-x-8 "> {/* Increased space between tiles */}
            {currentTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md w-96 mx-2"> {/* Increased tile width */}
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s profile`}
                  className="w-20 h-20 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold text-gray-700">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {testimonial.role} at {testimonial.organization}
                </p>
                <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className=" bg-purple-700 text-white rounded-full hover:bg-purple-800 focus:outline-none"
          >
            <IoIosArrowDropright className="h-9 w-9"/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
