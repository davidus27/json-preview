import React, { useState, useCallback } from 'react';
import DragDropArea from './components/DragDropArea';
import SearchBar from './components/SearchBar';
import TreeRenderer from './components/TreeRenderer';
import InspectorPanel from './components/InspectorPanel';
import Breadcrumbs from './components/Breadcrumbs';

export default function App() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);
  const [filter, setFilter] = useState('');
  const [allExpanded, setAllExpanded] = useState(false);

  const onDataLoaded = useCallback(data => {
    setJsonData(data);
    setSelectedPath([]);
    setAllExpanded(false);
  }, []);

  const toggleAll = () => setAllExpanded(exp => !exp);

  if (!jsonData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DragDropArea onDataLoaded={onDataLoaded} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left panel with sticky search */}
      <div className="w-1/4 border-r flex flex-col">
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10">
          <SearchBar filter={filter} setFilter={setFilter} />
          <button onClick={toggleAll}>
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
          <Breadcrumbs path={selectedPath} onSelect={setSelectedPath} />
          <InspectorPanel data={jsonData} path={selectedPath} />
        </div>
        <div className="flex-1 overflow-auto">
          <TreeRenderer data={jsonData} filter={filter} onSelect={setSelectedPath} allExpanded={allExpanded} />
        </div>
      </div>
    </div>
  );
}
