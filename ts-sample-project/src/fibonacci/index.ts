import PromiseWorker from 'promise-worker';

export default new (class Fib {
  private worker: PromiseWorker;

  async load() {
    if (this.worker) {
      return;
    }

    this.worker = new PromiseWorker(new Worker('./worker.js'));
    await this.worker.postMessage({ type: 'load' });
  }

  async js(index) {
    const start = Date.now();

    const number = await this.worker.postMessage({
      type: 'fib',
      payload: {
        type: 'js',
        index
      }
    });

    const duration = Date.now() - start;

    return {
      duration,
      number,
      index
    };
  }

  async jsNative(index) {
    const start = Date.now();

    const number = await this.worker.postMessage({
      type: 'fib',
      payload: {
        type: 'jsNative',
        index
      }
    });

    const duration = Date.now() - start;

    return {
      duration,
      number,
      index
    };
  }

  async rust(index) {
    const start = Date.now();

    const number = await this.worker.postMessage({
      type: 'fib',
      payload: {
        type: 'rust',
        index
      }
    });

    const duration = Date.now() - start;

    return {
      duration,
      number,
      index
    };
  }
})();
