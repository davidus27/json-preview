import React, { useState, useEffect } from 'react';
import { isObject, isArray } from '../utils/ui-utils';

export default function TreeNode({ node, onSelect, allExpanded }) {
  const { key, value, path, matches } = node;
  const [expanded, setExpanded] = useState(false); // Initialize with false
  const type = isArray(value) ? 'array' : isObject(value) ? 'object' : 'primitive';

  // Sync with global expand/collapse
  useEffect(() => {
    setExpanded(allExpanded); // Update expanded state when allExpanded changes
  }, [allExpanded]);

  const handleToggle = e => {
    e.stopPropagation();
    setExpanded(prev => !prev);
  };

  const handleSelect = e => {
    e.stopPropagation();
    onSelect(path);
  };

  const arrow = type !== 'primitive' ? (expanded ? '▼' : '▶') : null;
  const indent = path.length * 20;

  function isValidUrl(str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }
  
  function UrlDetector({ text }) {
    if (isValidUrl(text)) {
      return (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    }
    return (<>{text}</>);
  }

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`flex items-center py-1 cursor-pointer rounded ${matches ? 'bg-yellow-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        style={{ paddingLeft: indent }}
      >
        {arrow && (
          <span onClick={handleToggle} className="mr-2 text-base select-none">
            {arrow}
          </span>
        )}
        <span className="key font-mono font-semibold mr-2 text-base">
          {String(key)}:&nbsp;
        </span>
        {type === 'primitive' && (
          <span className="value primitive-value bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded text-sm font-mono">
            {<UrlDetector text={String(value)}/>}
          </span>
        )}
      </div>

      {expanded && type !== 'primitive' && (
        <div className="border-l border-gray-300 dark:border-gray-600 ml-1">
          {Object.entries(value).map(([childKey, childVal]) => (
            <TreeNode
              key={childKey}
              node={{ key: childKey, value: childVal, path: [...path, childKey], matches }}
              onSelect={onSelect}
              allExpanded={allExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}