import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { FaRegCopy } from "react-icons/fa6";


const CodeBlock = ({ language, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter language={language} style={codeStyle} showLineNumbers>
        {value}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-[#111B27] hover:bg-gray-600 text-white rounded-md px-2 py-1 focus:outline-none"
      >
        {isCopied ? (
          <FaCheck className="w-5 h-5" />
        ) : (
          <FaRegCopy className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')}>
              {children}
            </CodeBlock>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;