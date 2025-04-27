// /* JSON Preview Worker
//  * Handles CPU-intensive operations off the main thread
//  */

// // Process search through JSON data
// function searchData(data, searchTerm, caseSensitive) {
//   const results = [];
//   const searchTermLower = caseSensitive ? searchTerm : searchTerm.toLowerCase();
  
//   function traverse(obj, path = []) {
//     if (Array.isArray(obj)) {
//       obj.forEach((item, index) => {
//         traverse(item, [...path, index]);
//       });
//     } else if (obj && typeof obj === 'object') {
//       Object.entries(obj).forEach(([key, value]) => {
//         const keyMatch = caseSensitive 
//           ? key.includes(searchTerm)
//           : key.toLowerCase().includes(searchTermLower);
          
//         if (keyMatch) {
//           results.push([...path, key]);
//         }
        
//         traverse(value, [...path, key]);
//       });
//     } else {
//       // Primitive value
//       const stringValue = String(obj);
//       const valueMatch = caseSensitive 
//         ? stringValue.includes(searchTerm) 
//         : stringValue.toLowerCase().includes(searchTermLower);
        
//       if (valueMatch) {
//         results.push(path);
//       }
//     }
//   }
  
//   traverse(data);
//   return results;
// }

// // Process collapse all nodes in data
// function collapseAllNodes(data) {
//   const collapsedState = {};
  
//   function traverse(obj, path = '') {
//     if (Array.isArray(obj)) {
//       collapsedState[path] = true;
//       obj.forEach((item, index) => {
//         if (typeof item === 'object' && item !== null) {
//           traverse(item, path ? `${path}.${index}` : `${index}`);
//         }
//       });
//     } else if (obj && typeof obj === 'object') {
//       collapsedState[path] = true;
//       Object.entries(obj).forEach(([key, value]) => {
//         if (typeof value === 'object' && value !== null) {
//           traverse(value, path ? `${path}.${key}` : key);
//         }
//       });
//     }
//   }
  
//   traverse(data);
//   return collapsedState;
// }

// // Process expand all nodes
// function expandAllNodes() {
//   return {};
// }

// // Get node type and related information
// function getNodeInfo(data, path) {
//   if (!path || path.length === 0) {
//     return null;
//   }

//   try {
//     const value = path.reduce((acc, key) => (acc ? acc[key] : undefined), data);
//     const isArray = Array.isArray(value);
//     const isObject = value && typeof value === 'object' && !isArray;
    
//     const type = isArray ? 'array' : isObject ? 'object' : 'primitive';
//     const length = isArray ? value.length : isObject ? Object.keys(value).length : null;
    
//     return {
//       type,
//       length,
//       value: type === 'primitive' ? value : null
//     };
//   } catch (error) {
//     return {
//       type: 'error',
//       error: error.message
//     };
//   }
// }

// // Message handler
// onmessage = function(e) {
//   const { id, action, payload } = e.data;
  
//   let result;
//   try {
//     switch (action) {
//       case 'search':
//         result = searchData(payload.data, payload.searchTerm, payload.caseSensitive);
//         break;
//       case 'collapseAll':
//         result = collapseAllNodes(payload.data);
//         break;
//       case 'expandAll':
//         result = expandAllNodes();
//         break;
//       case 'getNodeInfo':
//         result = getNodeInfo(payload.data, payload.path);
//         break;
//       default:
//         throw new Error(`Unknown action: ${action}`);
//     }
    
//     postMessage({ id, result });
//   } catch (error) {
//     postMessage({ id, error: error.message });
//   }
// };



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
