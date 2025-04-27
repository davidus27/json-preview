onmessage = (e) => {
  const { id, action, payload } = e.data;

  try {
    let result;

    switch (action) {
      case 'getNodeInfo':
        result = handleGetNodeInfo(payload.data, payload.path);
        break;

      case 'search':
        // stub: implement if needed
        result = { type: 'not_implemented' };
        break;

      case 'collapseAll':
        // stub
        result = { type: 'not_implemented' };
        break;

      case 'expandAll':
        // stub
        result = { type: 'not_implemented' };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    postMessage({ id, result });

  } catch (err) {
    postMessage({ id, error: err.message });
  }
};

// Helper: Navigate to the value at the given path
function getValueAtPath(obj, path) {
  try {
    return path.reduce((acc, key) => {
      if (acc == null) return undefined;
      return acc[key];
    }, obj);
  } catch (e) {
    return undefined;
  }
}

// Handler for getNodeInfo
function handleGetNodeInfo(data, path) {
  const value = getValueAtPath(data, path);

  if (value === null) {
    return { type: 'null', value: null };
  }

  if (value === undefined) {
    return { type: 'undefined' };
  }

  if (Array.isArray(value)) {
    return { type: 'array', length: value.length };
  }

  if (typeof value === 'object') {
    return { type: 'object', length: Object.keys(value).length };
  }

  return { type: 'primitive', value };
}
