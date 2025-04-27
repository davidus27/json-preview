import React, { useState, useEffect } from 'react';
import workerService from '../services/WorkerService';

export default function InspectorPanel({ data, path, showToast }) {
  const [nodeInfo, setNodeInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!path || path?.length === 0) {
      setNodeInfo(null);
      return;
    }

    setLoading(true);
    workerService.getNodeInfo(data, path)
      .then(info => {
        setNodeInfo(info);
      })
      .catch(error => {
        console.error('Error getting node info:', error);
        setNodeInfo({ type: 'error', error: error.message });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, path]);

  // If no path is selected or the component is in loading state
  if (!path || path.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <span className="inspector-tag bg-gray-100 dark:bg-gray-800 animate-pulse">
        Loading...
      </span>
    );
  }

  if (nodeInfo?.type === 'error') {
    return (
      <span className="inspector-tag bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
        Error
      </span>
    );
  }

  // Prepare display values
  const typeDisplay = nodeInfo?.type || 'unknown';
  const lengthDisplay = typeof nodeInfo?.length === 'number' ? `(${nodeInfo.length})` : '';
  const valuePreview = nodeInfo?.type === 'primitive' ? `: ${String(nodeInfo.value).substring(0, 30)}${String(nodeInfo.value).length > 30 ? '...' : ''}` : '';

  return (
    <span className="inspector-tag">
      <span className="font-medium text-accent-hover">{typeDisplay}</span>
      {lengthDisplay && <span className="opacity-75">{lengthDisplay}</span>}
      {valuePreview && <span className="opacity-90 ml-1">{valuePreview}</span>}
    </span>
  );
}
