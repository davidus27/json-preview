import React, { useState, useEffect, useRef } from 'react';
import { isObject, isArray } from '../../utils/ui-utils';
import UrlDetector from './UrlDetector';
import CopyButton from './CopyButton';

export default function TreeNode({ node, onSelect, allExpanded }) {
  const { key, value, path, matches } = node;
  const [expanded, setExpanded] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const nodeRef = useRef(null);
  const type = isArray(value) ? 'array' : isObject(value) ? 'object' : 'primitive';

  useEffect(() => {
    setExpanded(allExpanded);
  }, [allExpanded]);

  const handleToggle = e => {
    e.stopPropagation();
    setExpanded(prev => !prev);
  };

  const handleSelect = e => {
    if (window.getSelection().toString() || isSelecting) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    onSelect(path);
  };

  const handleMouseDown = () => setIsSelecting(false);
  const handleMouseMove = (e) => { if (e.buttons === 1) setIsSelecting(true); };

  const handleMouseEnter = () => setShowCopyIcon(true);
  const handleMouseLeave = () => setShowCopyIcon(false);

  const arrow = type !== 'primitive' ? (expanded ? '▼' : '▶') : null;
  const indent = path.length * 20;

  return (
    <div>
      <div
        ref={nodeRef}
        onClick={handleSelect}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center py-1 cursor-pointer rounded ${matches ? 'bg-yellow-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} relative`}
        style={{ paddingLeft: indent }}
      >
        {arrow && (
          <span onClick={handleToggle} className="mr-2 text-base select-none">
            {arrow}
          </span>
        )}

        <span className="inline-flex items-center space-x-1">
          <span className="key font-mono font-semibold text-base select-text">
            {String(key)}:
          </span>

          {type === 'primitive' && (
            <span className="value primitive-value bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded text-sm font-mono select-text relative inline-flex items-center">
              <UrlDetector text={String(value)} />
              <CopyButton textToCopy={String(value)} visible={showCopyIcon} />
            </span>
          )}
        </span>
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
