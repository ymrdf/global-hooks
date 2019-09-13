import React from 'react';
import { Block } from './components/index';
import { useGlobalState } from 'global-hooks';

export const CounterBtn = () => {
  const [count, setCount] = useGlobalState('count', 0);
  return <button onClick={() => setCount(count+1)}>add</button>;
}

export const CounterDisplay = () => {
  const [count] = useGlobalState('count', 0);
  return <div>{count}</div>;
}

 const GlobalStateTest = () => {
  return (
    <Block title="useGlobalState test">
        <CounterBtn />
        <CounterDisplay />
    </Block>
  );
}

export default GlobalStateTest;

