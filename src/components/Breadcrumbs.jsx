import React from 'react';
// import { pathToString } from '../utils/ui-utils';

export default function Breadcrumbs({ path, onSelect }) {
  return (
    <div className="breadcrumbs font-mono transition-opacity duration-200">
      <span onClick={() => onSelect([])} className="underline cursor-pointer">root</span>
      {path && path.length > 0 && path.map((seg, idx) => {
        const isLast = idx === path.length - 1;
        const display = typeof seg === 'number' ? `[${seg}]` : seg;
        return (
          <span key={idx}>
            {' > '}
            <span onClick={() => onSelect(path.slice(0, idx + 1))}
              className={`${isLast ? 'font-bold' : 'underline'} cursor-pointer`}
            >{display}</span>
          </span>
        );
      })}
    </div>
  );
}
