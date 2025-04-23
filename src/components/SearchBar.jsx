import React, { useState, useEffect } from 'react';
export default function SearchBar({ filter, setFilter }) {
  const [input, setInput] = useState(filter);
  useEffect(() => {
    const handler = setTimeout(() => setFilter(input), 300);
    return () => clearTimeout(handler);
  }, [input, setFilter]);
  return (
    <div className="p-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search keys, values, or paths..."
      />
    </div>
  );
}