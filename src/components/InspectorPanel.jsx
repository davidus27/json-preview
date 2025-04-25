import React from 'react';
import { pathToString, isObject, isArray } from '../utils/ui-utils';

export default function InspectorPanel({ data, path, showToast }) {
  if (!path || path.length === 0) {
    return <div className="text-sm text-gray-500 italic">Select a node to inspect</div>;
  }

  const value = path.reduce((acc, key) => (acc ? acc[key] : undefined), data);
  const type = isArray(value) ? 'array' : isObject(value) ? 'object' : typeof value;
  const length = type === 'array' ? value.length : type === 'object' ? Object.keys(value).length : null;

  const Clipboard = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
    </svg>
  )

  const handleCopy = text => {
    navigator.clipboard.writeText(text).then(() => {
      showToast?.("Copied to clipboard!");
    });
  };



  return (
    <div className="inspector-panel text-xs space-y-1">
      <div className="font-semibold text-accent-hover text-sm">Inspector</div>

      {!path || path.length === 0 ? (
        <div className="text-gray-500 italic">Select a node to inspect</div>
      ) : (
        <>
          <div><span className="key">Path:</span> {pathToString(path)}</div>
          <div><span className="key">Type:</span> {type}</div>
          {length !== null && <div><span className="key">Length:</span> {length}</div>}
          {type === 'primitive' && <div><span className="key">Value:</span> {String(value)}</div>}
          <div className="flex flex-row items-center gap-1 pt-1">
            <button onClick={() => handleCopy(pathToString(path))} title="Copy Path">
              <Clipboard className="w-4 h-4 text-gray-700" />
            </button>
            {type === 'primitive' && (
              <button onClick={() => handleCopy(String(value))} title="Copy Value">
                <Clipboard className="w-4 h-4 text-gray-700" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
