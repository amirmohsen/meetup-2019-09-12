import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = async Fib => {
  ReactDOM.render(<App Fib={Fib} />, document.querySelector('#app-wrapper'));
};

export default render;
