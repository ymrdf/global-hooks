import React from 'react';
import { Block } from './components/index';
import { useGlobalReducer } from 'global-hooks';

interface IState{
  backgroundColor:string,
  width:number
}

interface IAction {
  type:string,
  playload?:any
}


const reducer = (state:IState, action:IAction) => {
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


const initState:IState={backgroundColor:'#ff00ff',width:30}



const useStyle:() => [IState,Function,Function,Function] = () => {
  const [state,dispatch] = useGlobalReducer<IState,IAction,(state:IState, action:IAction) => IState>('style', reducer, initState);

  const add1 = () => dispatch({type:'ADD1'});
  const increase = (n:number) => dispatch({type:'INCREASE',playload:n});
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


export const CounterDisplay:React.SFC = () => {
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
    <Block title="useGlobalReducer test">
        <CounterBtn />
        <CounterDisplay />
    </Block>
  );
}

export default GlobalReducerTest;