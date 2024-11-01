import "highlight.js/styles/github-dark.css"; // Import a highlight.js theme or create a custom style
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { FaRegCopy } from "react-icons/fa6";


const Markdown = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const codeText = String(children).trim();
          return !inline ? (
            <div className=" relative bg-[#0D1117] p-2 rounded-lg my-2 text-white overflow-hidden">
              <pre>
                <code {...props} className={className}>
                  {children}
                </code>
              </pre>
              <button
                onClick={() => handleCopy(codeText)}
                className="absolute top-2 right-2 bg-[#0D1117] text-white p-1 rounded text-sm hover:bg-gray-600 active:bg-gray-800"
              >
                {isCopied ? "Copied!" : <FaRegCopy />}
              </button>
            </div>
          ) : (
            <code className="bg-[#2d2d2d] p-1 rounded text-white" {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default Markdown;
