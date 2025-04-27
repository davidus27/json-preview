import React, { useState, useCallback, useMemo, useEffect } from 'react';
import DragDropArea from './components/DragDropArea';
import SearchBar from './components/SearchBar';
import TreeRenderer from './components/TreeRenderer';
import InspectorPanel from './components/InspectorPanel';
import Breadcrumbs from './components/Breadcrumbs';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';
import workerService from './services/WorkerService';
import ToastContainer from './components/ToastContainer';

export default function App() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);
  const [filter, setFilter] = useState('');
  const [allExpanded, setAllExpanded] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const stableSelectedPath = useMemo(() => selectedPath, [selectedPath.join('.')]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize theme based on system preference
  useEffect(() => {
    // Check if user has already set a preference
    const savedTheme = localStorage.getItem('jsonLensTheme');
    
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // If no saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      localStorage.setItem('jsonLensTheme', prefersDark ? 'dark' : 'light');
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('jsonLensTheme')) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Clean up workers when app unmounts
  useEffect(() => {
    return () => {
      workerService.terminate();
    };
  }, []);

  const onDataLoaded = useCallback(data => {
    setJsonData(data);
    setSelectedPath([]);
    setAllExpanded(false);
  }, []);

  const showToastMessage = message => {
    setToastMessage(message);
  };

  const handleToastClose = () => {
    setToastMessage(null);
  };

  const toggleAll = () => setAllExpanded(exp => !exp);

  const WelcomeMessage = () => {
    return (
      <div className="welcome-message">
        <h1>JSON Preview</h1>
        <p>
          A modern tool for visualizing and searching JSON data with ease.
          Drag a file, paste content, or upload to get started.
        </p>
        <div className="theme-toggle">
          <ThemeToggle />
        </div>
      </div>
    );
  };

  if (!jsonData) {
    return (
      <div className="welcome-container dark:bg-gray-900 transition-colors duration-200">
        <WelcomeMessage />
        <DragDropArea onDataLoaded={onDataLoaded} />
      </div>
    );
  }

  return (
    <div className="app-container dark:bg-gray-900 transition-colors duration-200">
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleToastClose} />
      )}
      <div className="left-panel dark:bg-gray-900">
        <div className="left-panel-header sticky top-0 z-20 bg-inherit shadow-sm">
          <div className="control-panel">
            <div className="flex justify-end p-2">
              <ThemeToggle />
            </div>
            <SearchBar filter={filter} setFilter={setFilter} />
            
            <div className="menu-controls">
              <button className="toggle-button flex-shrink-0" onClick={toggleAll}>
                {allExpanded ? 'Collapse All' : 'Expand All'}
              </button>
              
              <Breadcrumbs path={stableSelectedPath} onSelect={setSelectedPath} className="flex-grow" />
              
              <InspectorPanel
                data={jsonData}
                path={stableSelectedPath}
                showToast={showToastMessage}
              />
            </div>
          </div>
        </div>
        
        <div className="tree-container pt-2">
          <TreeRenderer
            data={jsonData}
            filter={filter}
            onSelect={setSelectedPath}
            allExpanded={allExpanded}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
