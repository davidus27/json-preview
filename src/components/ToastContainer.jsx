import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

// Create a global toast management system
const toastEventManager = {
  listeners: [],
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  emit(message, duration) {
    this.listeners.forEach(listener => listener(message, duration));
  }
};

// Export function to show toast from anywhere
export function showToast(message, duration = 2000) {
  toastEventManager.emit(message, duration);
}

// Component that renders at root level
export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  
  useEffect(() => {
    const unsubscribe = toastEventManager.subscribe((message, duration) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, duration }]);
      
      // Auto-remove after the specified duration + animation time
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration + 300);
    });
    
    return unsubscribe;
  }, []);
  
  // Use portal to render at root level outside the normal hierarchy
  return ReactDOM.createPortal(
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
        />
      ))}
    </>,
    document.body
  );
}