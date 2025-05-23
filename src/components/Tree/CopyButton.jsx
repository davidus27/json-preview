import React, { useRef } from 'react';
import { showToast } from '../ToastContainer';

export default function CopyButton({ textToCopy, visible }) {
  const buttonRef = useRef(null);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
    showToast(`Copied ${textToCopy} to clipboard!`, 1500);

    if (!buttonRef.current) return;

    const originalTitle = buttonRef.current.getAttribute('title');
    buttonRef.current.setAttribute('title', 'Copied!');
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.setAttribute('title', originalTitle);
      }
    }, 1500);
  };

  return (

    <button
      ref={buttonRef}
      onClick={handleCopy}
      title="Copy value"
      className="copy-button ..."
      style={{
        opacity: visible ? 0.4 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: 'opacity 0.2s ease',
        padding: "2px",
        width: "18px",
        height: "18px"
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3.5 h-3.5 text-gray-400 dark:text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
        />
      </svg>
    </button>
  );
}
