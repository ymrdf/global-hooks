# global-hooks

简单易用的管理react项目全局状态的React hooks.

[![Build Status](https://travis-ci.org/ymrdf/redux-simplifier.svg?branch=master)](https://travis-ci.org/ymrdf/redux-simplifier)[![npm version](https://img.shields.io/npm/v/redux-simplifier.svg?style=flat-square)](https://www.npmjs.com/package/redux)[![npm](https://img.shields.io/npm/dm/redux-simplifier.svg)](https://www.npmjs.com/package/redux-simplifier)

[ENGLISH](../readme.md)

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
global-hooks提供一个Provider组件来保存全局的变量,你不需要给他提供任何props,你只需要把它做为程序的根组件就可以了.
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

useGlobalState 类似于react的useState, 不同之处是它是在全局增加一个状态.它也返回一个数组,数组的第一项是一个状态,第二项是一个让你可更新此状态的函数.useGlobalState的第一个参数标记状态的名称.在任何位置执行useGlobalState,只要name参数相同,返回的数据就是同一个.在任何位置更新状态,所有用到对应状态的组件都会更新.

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
useGlobalReducer 类似于useReducer, 不同之处是它是在全局增加一个状态.它也返回一个数组,数组的第一项是一个状态,很二项是一个dispatch函数.useGlobalState的第一个参数标记状态的名称.在任何位置执行useGlobalState,只要name参数相同,返回的数据就是同一个.执行dispatch函数更新状态,所有用到对应状态的组件都会更新.

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
## 最佳实践
虽然global-hooks让你很容易的使用和更新全局状态,但是强烈建议你不要在组件内部直接使用global-hooks提供的hooks函数,因为这样在复杂的情况下,很不利于代码维护.最好是使用自定义hooks统一管理状态,再在不同组件中引入.可心参考一下example中的CompositeDemo.

## run example

```bash
$ cd example
$ npm install
$ npm run start
```

## license

MIT
