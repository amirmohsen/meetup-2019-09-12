import Fib from './fibonacci';
import render from './render';

const start = async () => {
  await Fib.load();
  render(Fib);
};

start();
