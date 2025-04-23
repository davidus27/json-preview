export const isObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
export const isArray = Array.isArray;
export function pathToString(path) {
  return path.map(seg => typeof seg === 'number' ? `[${seg}]` : seg).join('.');
}