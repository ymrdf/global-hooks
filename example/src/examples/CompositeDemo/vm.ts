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
    case 'INIT':
      return action.playload;
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


function fetchColor(){
  return new Promise((r) => {
    setTimeout(() => r("#ffff00"),1000);
  });
}

function fetchWidth(){
  return new Promise((r) => {
    setTimeout(() => r(100),1000);
  });
}


function fetch(dispatch:Function) {
  return async function(){

    const color = await fetchColor();
    const width = await fetchWidth();

    dispatch({
      playload:{backgroundColor:color, width},
      type:'INIT'
    });
  }
}



export const useBlockStyle:() => [IState,Function,Function,Function] = () => {
  const [state,dispatch] = useGlobalReducer<IState,IAction,(state:IState, action:IAction) => IState>('blockStyle', reducer, initState);
  // async init the data;
  if(state.width === initState.width){
    fetch(dispatch)();
  }

  const add1 = () => dispatch({type:'ADD1'});
  const increase = (n:number) => dispatch({type:'INCREASE',playload:n});
  const refresh = fetch(dispatch);

  // export the async function;
  return [state,  add1, increase, refresh];
}