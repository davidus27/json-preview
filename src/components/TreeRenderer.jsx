import React, { useEffect, useState, useRef } from 'react';
import TreeNode from './TreeNode';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TreeFilterWorker from 'worker-loader!../services/tree-filter.worker.js';

export default function TreeRenderer({ data, filter, onSelect, allExpanded }) {
  const [filteredData, setFilteredData] = useState([]);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const workerRef = useRef();

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new TreeFilterWorker();
    }

    workerRef.current.onmessage = (e) => {
      const filtered = e.data;
      setFilteredData(filtered);
    };

    workerRef.current.postMessage({ data, query: filter });
  }, [data, filter]);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const chunkSize = 50;

    const renderNextChunk = () => {
      if (cancelled) return;

      const next = filteredData.slice(i, i + chunkSize);
      setVisibleNodes(prev => [...prev, ...next]);
      i += chunkSize;

      if (i < filteredData.length) {
        requestIdleCallback(renderNextChunk);
      }
    };

    setVisibleNodes([]); // clear previous
    renderNextChunk();

    return () => {
      cancelled = true;
    };
  }, [filteredData]);

  return (
    <div className="p-2">
      {visibleNodes.map(node => (
        <TreeNode
          key={node.path.join('.') || 'root'}
          node={node}
          onSelect={onSelect}
          allExpanded={allExpanded}
        />
      ))}
    </div>
  );
}
