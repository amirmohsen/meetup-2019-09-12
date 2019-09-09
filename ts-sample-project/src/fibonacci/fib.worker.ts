import registerPromiseWorker from 'promise-worker/register';
import jsFib from 'fibonacci-fast';
import { MESSAGE_TYPES, FIB_TYPES } from './types';

const ctx: Worker = self as any;

let rustFib;

const fib = {
  [FIB_TYPES.JS]: ({ index }) => {
    const { number } = jsFib.get(index);
    return number.toString();
  },
  [FIB_TYPES.JS_NATIVE]: ({ index }) => {
    let f0 = 0n;
    let f1 = 1n;
    for (let i = 0; i < index; i += 1) {
      let f2 = f0 + f1;
      f0 = f1;
      f1 = f2;
    }
    return f0.toString();
  },
  [FIB_TYPES.RUST]: ({ index }) => {
    return rustFib(index);
  }
};

const actions = {
  [MESSAGE_TYPES.LOAD]: async () => {
    if (!rustFib) {
      ({ fib: rustFib } = await import('rust-sample-package'));
    }
  },
  [MESSAGE_TYPES.FIB]: ({ type, index }) => {
    const fibFunc = fib[type];

    if (!fibFunc) {
      throw new Error(`No fib function exists for type "${type}"`);
    }

    const start = Date.now();
    const number = fibFunc({ index });
    const duration = Date.now() - start;

    return {
      number,
      duration
    };
  }
};

const runOnType = ({ type, payload }) => {
  if (!Object.values(MESSAGE_TYPES).includes(type)) {
    throw new Error(`Invalid message type "${type}"`);
  }

  if (!actions[type]) {
    throw new Error(`Undefined message type "${type}"`);
  }

  return actions[type](payload);
};

registerPromiseWorker(runOnType);

type workerFactory = () => Worker;

export default (ctx as unknown) as workerFactory;
