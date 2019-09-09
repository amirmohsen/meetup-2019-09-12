import PromiseWorker from 'promise-worker';
import { MESSAGE_TYPES, FIB_TYPES } from './types';

export default new (class Fib {
  private loaded: boolean = false;
  private jsWorker: PromiseWorker;
  private jsNativeWorker: PromiseWorker;
  private rustWorker: PromiseWorker;

  async load() {
    if (this.loaded) {
      return;
    }

    this.jsWorker = new PromiseWorker(new Worker('./worker.js'));
    this.jsNativeWorker = new PromiseWorker(new Worker('./worker.js'));
    this.rustWorker = new PromiseWorker(new Worker('./worker.js'));
    this.rustWorker.postMessage({
      type: MESSAGE_TYPES.LOAD
    });
    this.loaded = true;
  }

  async js(index) {
    const { number, duration } = await this.jsWorker.postMessage({
      type: MESSAGE_TYPES.FIB,
      payload: {
        type: FIB_TYPES.JS,
        index
      }
    });

    return {
      duration,
      number,
      index
    };
  }

  async jsNative(index) {
    const { number, duration } = await this.jsNativeWorker.postMessage({
      type: MESSAGE_TYPES.FIB,
      payload: {
        type: FIB_TYPES.JS_NATIVE,
        index
      }
    });

    return {
      duration,
      number,
      index
    };
  }

  async rust(index) {
    const { number, duration } = await this.rustWorker.postMessage({
      type: MESSAGE_TYPES.FIB,
      payload: {
        type: FIB_TYPES.RUST,
        index
      }
    });

    return {
      duration,
      number,
      index
    };
  }
})();
