import React from 'react';
import { pathToString, isObject, isArray } from '../utils/ui-utils';
export default function InspectorPanel({ data, path }) {
  if (!path || path.length === 0) return <div className="text-gray-500">Select a node to inspect</div>;
  const value = path.reduce((acc, key) => (acc ? acc[key] : undefined), data);
  const type = isArray(value) ? 'array' : isObject(value) ? 'object' : typeof value;
  const length = type === 'array' ? value.length : type === 'object' ? Object.keys(value).length : null;

  const handleCopy = text => navigator.clipboard.writeText(text);
  return (
    <div className="inspector-panel">
      <h3>Inspector</h3>
      <div><strong>Path:</strong> {pathToString(path)}</div>
      <div><strong>Type:</strong> {type}</div>
      {length !== null && <div><strong>Length:</strong> {length}</div>}
      {type === 'primitive' && <div><strong>Value:</strong> {String(value)}</div>}
      <div className="mt-2 space-x-2">
        <button onClick={() => handleCopy(pathToString(path))}>Copy Path</button>
        {type === 'primitive' && <button onClick={() => handleCopy(String(value))}>Copy Value</button>}
      </div>
    </div>
  );
}