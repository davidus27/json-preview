onmessage = (e) => {
    const { data, query } = e.data;
  
    const isEmptyQuery = !query || !query.trim();
  
    const parseQuery = (q) => {
      if (isEmptyQuery) return [];
      return q.split(/\s*&\s*/i).map(part =>
        part.split(/\s*\|\s*/i).map(sub => {
          const [rawKey, rawVal] = sub.split(':');
          if (!rawKey || !rawVal) return null;
          return {
            key: rawKey.trim().toLowerCase(),
            value: rawVal.trim().toLowerCase()
          };
        }).filter(Boolean)
      );
    };
  
    const matchesConditions = (obj, path, conditions) => {
      if (isEmptyQuery) return true;
      return conditions.every(orGroup =>
        orGroup.some(({ key, value }) => {
          const checkMatch = (k, v, fullPath) =>
            (String(k).toLowerCase() === key && String(v).toLowerCase() === value) ||
            fullPath.toLowerCase().includes(`${key}:${value}`);
  
          if (typeof obj === 'object' && obj !== null) {
            for (const [k, v] of Object.entries(obj)) {
              const fullPath = [...path, k].join('.');
              if (checkMatch(k, v, fullPath)) return true;
            }
          } else {
            const lastKey = path[path.length - 1];
            return checkMatch(lastKey, obj, path.join('.'));
          }
  
          return false;
        })
      );
    };
  
    const conditions = parseQuery(query);
  
    const recurse = (value, key, path) => {
      const currentPath = [...path, key];
  
      if (value !== null && typeof value === 'object') {
        const entries = Array.isArray(value) ? value.map((v, i) => [i, v]) : Object.entries(value);
        const childMatches = entries
          .map(([childKey, childVal]) => recurse(childVal, childKey, currentPath))
          .filter(node => node !== null);
  
        const selfMatch = matchesConditions(value, currentPath, conditions);
  
        if (selfMatch || childMatches.length > 0) {
          return { key, value, path: currentPath, matches: selfMatch, children: childMatches };
        }
        return null;
      }
  
      const selfMatch = matchesConditions(value, currentPath, conditions);
      return selfMatch ? { key, value, path: currentPath, matches: true } : null;
    };
  
    let result = [];
    if (data !== null && typeof data === 'object') {
      const roots = Array.isArray(data) ? data.map((v, i) => [i, v]) : Object.entries(data);
      result = roots.map(([key, val]) => recurse(val, key, [])).filter(Boolean);
    } else {
      const single = recurse(data, 'root', []);
      if (single) result = [single];
    }
  
    postMessage(result);
  };
  