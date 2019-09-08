import React, { ReactElement, useState, useCallback } from 'react';
import styled from 'styled-components';

const NumberWrapper = styled.div`
  word-break: break-word;
`;

const FibResult = ({ header, index, number, duration }) => (
  <div>
    <h2>{header}</h2>
    <div>
      <strong>Index: </strong>
      {index}
    </div>
    <div>
      <strong>Number: </strong>
      <NumberWrapper>{number}</NumberWrapper>
    </div>
    <div>
      <strong>Duration: </strong>
      {duration}ms
    </div>
  </div>
);

const App = ({ Fib }): ReactElement => {
  const [index, setIndex] = useState('');
  const [jsResult, setJSResult] = useState();
  const [jsNativeResult, setJSNativeResult] = useState();
  const [rustResult, setRustResult] = useState();
  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      const indexAsNumber = Number.parseInt(index);
      if (Number.isInteger(indexAsNumber) && indexAsNumber >= 0) {
        setJSResult(await Fib.js(indexAsNumber));
        setJSNativeResult(await Fib.jsNative(indexAsNumber));
        setRustResult(await Fib.rust(indexAsNumber));
      } else {
        setJSResult(undefined);
        setJSNativeResult(undefined);
        setRustResult(undefined);
      }
    },
    [setJSResult, index]
  );

  return (
    <main>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          min="0"
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button type="submit">Generate</button>
        {jsResult && <FibResult header="JS Result" {...jsResult} />}
        {jsNativeResult && (
          <FibResult header="Native JS Result" {...jsNativeResult} />
        )}
        {rustResult && <FibResult header="Rust Result" {...rustResult} />}
      </form>
    </main>
  );
};

export default App;
