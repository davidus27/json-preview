import React from 'react';
export default function Breadcrumbs({ path, onSelect }) {
  if (!path || path.length === 0) return <div className="font-mono">root</div>;
  return (
    <div className="breadcrumbs font-mono">
      <span onClick={() => onSelect([])} className="underline cursor-pointer">root</span>
      {path.map((seg, idx) => {
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
