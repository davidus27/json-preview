import React, { useCallback, useState, useRef, useEffect } from 'react';
import { parseJsonFile } from '../utils/json-parser';

export default function DragDropArea({ onDataLoaded }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback(async e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const data = await parseJsonFile(file);
        onDataLoaded(data);
      } catch (err) {
        alert('Invalid JSON: ' + err.message);
      }
    }
  }, [onDataLoaded]);

  const handleChange = useCallback(async e => {
    const file = e.target.files[0];
    if (file) {
      try {
        const data = await parseJsonFile(file);
        onDataLoaded(data);
      } catch (err) {
        alert('Invalid JSON: ' + err.message);
      }
    }
  }, [onDataLoaded]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const preventDefaults = e => e.preventDefault();
    window.addEventListener('dragover', preventDefaults);
    window.addEventListener('drop', preventDefaults);
    return () => {
      window.removeEventListener('dragover', preventDefaults);
      window.removeEventListener('drop', preventDefaults);
    };
  }, []);

  return (
    <div className="drop-container">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`p-10 border-4 border-dashed ${dragActive ? 'bg-gray-200' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload"
          accept=".json,.txt"
          onChange={handleChange}
          style={{ display: 'none' }} // Completely hide the input
        />
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" className="w-6 h-6 text-accent mb-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-10 h-10 text-accent mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p><strong>Drop your JSON file here</strong></p>
        <p className="text-sm text-gray-400 mb-3">or</p>
        <button
          className="file-select-button"
          onClick={handleButtonClick}>
          Browse files
        </button>
      </div>
    </div>
  );
}