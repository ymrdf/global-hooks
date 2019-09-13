import React, { useEffect } from 'react';
import { Block } from '../components/index';

import { useBlockStyle } from './vm';

export const CounterBtn = () => {
  const [state, add1, ] = useBlockStyle();
  return <div>
    <div style={{width:state.width + 'px',height:'30px',backgroundColor:state.backgroundColor,margin:'6px auto'}}></div>
    <button onClick={() => add1()}>add1</button>
  </div>
}


export const CounterDisplay:React.SFC = () => {
  const [state, , increase, refresh] = useBlockStyle();
  return (
    <div>
      <div>{state.width}</div>
      <button onClick={() => increase(state.width)}>Increase</button>
      <button onClick={() => refresh()}>Refresh</button> 
    </div>
  );
}

 const CompositeDemo = () => {
  return (
    <Block title="useGlobalReducer test">
        <CounterBtn />
        <CounterDisplay />
    </Block>
  );
}

export default CompositeDemo;