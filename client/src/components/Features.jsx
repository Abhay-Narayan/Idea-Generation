
const features = [
  {
    title: 'Chatbot Interaction',
    description:
      'Engage in meaningful conversations with our Generative AI chatbot designed to assist you in brainstorming and refining your software project ideas.',
    icon: '🤖', 
  },
  {
    title: 'Summaries & Business Benefits',
    description:
      'Once your idea is refined, our platform generates concise summaries that highlight the key aspects of your project.',
    icon: '📝',
  },
  {
    title: 'Blog Post Creation',
    description:
      'Transform your finalized ideas into engaging blog posts effortlessly.',
    icon: '📰',
  },
  {
    title: 'User Engagement',
    description:
      'Participate in a vibrant community where you can upvote, downvote, comment, and share ideas.',
    icon: '👍',
  },
  {
    title: 'Dynamically Curated Timeline',
    description:
      'Stay updated with a personalized timeline that showcases the top-voted ideas from the community.',
    icon: '📅',
  },
  {
    title: 'Collaborative Idea Refinement',
    description:
      'Collaborate with peers in real-time to enhance your ideas. Share your projects with friends or colleagues and receive instant feedback to refine your concepts further.',
    icon: '🤝',
  },
];

const Features = () => {
  return (
    <section className="py-12 bg-gray-200 rounded-t-2xl ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Key Features of Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-300 "
            >
              <div className="text-5xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
