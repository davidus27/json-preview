import React, { useMemo } from 'react';
import TreeNode from './TreeNode';
import { filterTree } from '../utils/search-utils';

export default function TreeRenderer({ data, filter, onSelect, allExpanded }) {
  const treeData = useMemo(() => filterTree(data, filter), [data, filter]);

  return (
    <div className="p-2">
      {treeData.map(node => (
        <TreeNode
          key={node.path.join('.') || 'root'}
          node={node}
          onSelect={onSelect}
          forceExpand={allExpanded}
        />
      ))}
    </div>
  );
}