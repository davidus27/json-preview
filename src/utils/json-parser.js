export async function parseJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonText = stripJSONP(reader.result);
        resolve(JSON.parse(jsonText));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
function stripJSONP(text) {
  const trimmed = text.trim();
  const match = /^([a-zA-Z_$][0-9a-zA-Z_$]*)\((.*)\);?$/s.exec(trimmed);
  return match ? match[2] : text;
}