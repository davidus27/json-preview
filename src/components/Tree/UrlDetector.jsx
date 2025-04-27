import React from 'react';

export default function UrlDetector({ text }) {
  function isValidUrl(str) {
    try {
      const url = new URL(str);
      return ["http:", "https:", "file:"].includes(url.protocol);
    } catch (_) {
      return false;
    }
  }

  if (isValidUrl(text)) {
    return (
      <a 
        href={text} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        {text}
      </a>
    );
  }

  return <span className="selectable-text">{text}</span>;
}
