import React, { useState, useEffect } from 'react';

export default function Toast({ message, duration = 2000, onClose }) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Allow time for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`toast-popup fixed right-4 bg-accent text-white py-2 px-4 rounded-md shadow-lg transition-all duration-300 z-50 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
      }`}
    >
      {message}
    </div>
  );
}