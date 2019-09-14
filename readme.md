# global-hooks

Hooks to manage Global state for React.It's very easy to use.

[![npm version](https://img.shields.io/npm/v/global-hooks.svg?style=flat-square)](https://www.npmjs.com/package/global-hooks)[![npm](https://img.shields.io/npm/dm/global-hooks.svg)](https://www.npmjs.com/package/global-hooks)

[中文](./docs/zh-cn.md)

## Installation

```bash
$ npm install --save global-hooks
```

or

```
$ yarn add global-hooks
```

## Usage
### Provider
global-hooks provides Provider component, which makes the global state available to the rest of your app. It doesn't have any props, just make it as the root component of the component tree;
```js
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'global-hooks'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  rootElement
)
```

### useGlobalState(name:string,initState:any)
```
  @param name String, name of global state to be used.
  @param initState any, init value of state to be used.
  @returns [state:any, setState:function].
```
```js
  const [count, setCount] = useGlobalState("count",0);
```
useGlobalState is a Hook which just like React's useState, but it add some global state into React App; useGlobalState returns a pair: the current state value and a function that lets you update it. You can call this function from everyWhere.The name argument mark which state you will use. If give it the same name param, it would return the same state, wherever you use it. All components used the state will update, wherever you update the state;

```js
import React from 'react';
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
    <div>
        <CounterBtn />
        <CounterDisplay />
    </div>
  );
}

export default GlobalStateTest;

```

### useGlobalReducer( name:string, reducer:(state:S, action) => newState:S, initState:S, initFn?:(state:S) => S)
```
  @param name String, name of global state to be used.
  @param reducer:(state, action) => newState, a reducer function.
  @param initState any, init value of state to be used.
  @param initFn:(initState) => state, a function helped to calculate init state.
  @returns [state:any, dispatch:funtion].
```

useGlobalReducer is a Hook which just like React's useReducer, but it add some global state into React App;useGlobalReducer returns the state paired with a dispatch method. You can call dispatch from everyWhere.The name argument mark which state you will use. If give it the same name param, it would return the same state, wherever you use it. All components used the state will update, wherever you update the state;

```js
import React from 'react';
import { useGlobalReducer } from 'global-hooks';

const reducer = (state, action) => {
  switch(action.type){
    case 'ADD1':
      return {...state,width:state.width + 1};
    case 'INCREASE':
      return {...state,width:state.width + action.playload};
    case 'CHANGE_COLOR':
      const rgb = [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)];
      const color = `rgba(${rgb.join(',')},1)`;
      return {...state, backgroundColor:color};
    default:
      return state;
  }
}

const initState = {backgroundColor:'#ff00ff',width:30}

const useStyle = () => {
  const [state,dispatch] = useGlobalReducer('style', reducer, initState);

  const add1 = () => dispatch({type:'ADD1'});
  const increase = (n) => dispatch({type:'INCREASE',playload:n});
  const changeColor = () => dispatch({type:'CHANGE_COLOR'});

  return [state, add1, increase, changeColor];
}

export const CounterBtn = () => {
  const [state, add1, ] = useStyle();
  return <div>
    <div style={{width:state.width + 'px',height:'30px',backgroundColor:state.backgroundColor,margin:'6px auto'}}></div>
    <button onClick={() => add1()}>add1</button>
  </div>

}


export const CounterDisplay = () => {
  const [state, , increase, changeColor] = useStyle();
  return (
    <div>
      <div>width:{state.width}</div>
      <button onClick={() => increase(10)}>increase</button>
      <button onClick={() => changeColor()}>change color</button>
    </div>
  );
}

 const GlobalReducerTest = () => {
  return (
    <div>
        <CounterBtn />
        <CounterDisplay />
    </div>
  );
}

export default GlobalReducerTest;
```
## best practice
Even global-hooks make you easy to use and update global state, but useing global hooks in components isn't a good ideal.Because in complex situations, it would be difficult to manage the codes.It's better to build your own hooks in one file to manage a state, and import it in different components.You could look at example/CompositeDemo.

## run example

```bash
$ cd example
$ npm install
$ npm run start
```

## license

MIT
