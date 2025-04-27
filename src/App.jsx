import React, { useState, useCallback, useMemo, useEffect } from 'react';
import DragDropArea from './components/DragDropArea';
import SearchBar from './components/SearchBar';
import TreeRenderer from './components/TreeRenderer';
import InspectorPanel from './components/InspectorPanel';
import Breadcrumbs from './components/Breadcrumbs';
import Toast from './components/Toast';
import workerService from './services/WorkerService';

export default function App() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);
  const [filter, setFilter] = useState('');
  const [allExpanded, setAllExpanded] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const stableSelectedPath = useMemo(() => selectedPath, [selectedPath.join('.')]); // eslint-disable-line react-hooks/exhaustive-deps


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

  const showToast = message => {
    setToastMessage(message);
  };

  const handleToastClose = () => {
    setToastMessage(null);
  };

  const toggleAll = () => setAllExpanded(exp => !exp);

  const WelcomeMessage = () => {
    return (
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
          JSON Preview
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          For easy JSON search and visualization
        </p>
      </div>
    );
  };

  if (!jsonData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WelcomeMessage />
        <DragDropArea onDataLoaded={onDataLoaded} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleToastClose} />
      )}
      <div className="left-panel">
        <div className="left-panel-header">
          <SearchBar filter={filter} setFilter={setFilter} />
          <button className="toggle-button" onClick={toggleAll}>
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
          <div className="flex flex-col gap-2 min-h-[150px]">
            <Breadcrumbs path={stableSelectedPath} onSelect={setSelectedPath} />
            <InspectorPanel
              data={jsonData}
              path={stableSelectedPath}
              showToast={showToast}
            />
          </div>
        </div>
        <div className="tree-container"></div>
        <TreeRenderer
          data={jsonData}
          filter={filter}
          onSelect={setSelectedPath}
          allExpanded={allExpanded}
        />
      </div>
    </div>
  );
}
