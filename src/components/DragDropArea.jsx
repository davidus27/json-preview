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
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`p-10 border-4 border-dashed text-center text-gray-500 ${dragActive ? 'bg-gray-200' : ''}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.txt"
        className="hidden"
        onChange={handleChange}
      />
      <p>Drag & drop a JSON file here</p>
      <p>or</p>
      <button onClick={() => fileInputRef.current.click()}>Browse Files</button>
    </div>
  );
}