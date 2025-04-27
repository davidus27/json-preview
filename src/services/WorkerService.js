/**
 * Service to handle communication with the web worker
 */
class WorkerService {
  constructor() {
    this.callbacks = new Map();
    this.nextId = 1;
    this.initWorker();
  }

  initWorker() {
    if (this.worker) return;
    
    this.worker = new Worker(new URL('../utils/worker.js', import.meta.url));
    
    this.worker.onmessage = (e) => {
      const { id, result, error } = e.data;
      const callback = this.callbacks.get(id);
      
      if (callback) {
        if (error) {
          callback.reject(new Error(error));
        } else {
          callback.resolve(result);
        }
        
        this.callbacks.delete(id);
      }
    };

    this.worker.onerror = (error) => {
      console.error('Worker error:', error);
    };
  }

  _createTask(action, payload) {
    // Make sure worker is initialized
    this.initWorker();
    
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.callbacks.set(id, { resolve, reject });
      this.worker.postMessage({ id, action, payload });
    });
  }

  search(data, searchTerm, caseSensitive = false) {
    return this._createTask('search', { data, searchTerm, caseSensitive });
  }

  collapseAll(data) {
    return this._createTask('collapseAll', { data });
  }

  expandAll() {
    return this._createTask('expandAll', {});
  }

  getNodeInfo(data, path) {
    return this._createTask('getNodeInfo', { data, path });
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// Create a singleton instance
const workerService = new WorkerService();
export default workerService;