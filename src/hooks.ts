import { useContext } from "react";
import { context } from "./provider";

import {
  Dispatch,
  IEmptyObj,
  Reducer,
  ReducerAction,
  ReducerState
} from "./definitions";

/**
 * useGlobalState is a Hook which just like React's useState, but it add some global state into React App;
 * useGlobalState returns a pair: the current state value and a function that lets you update it.
 * You can call this function from everyWhere.The name argument mark which state you will use.
 * @param name String, name of global state to be used.
 * @param initState any, init value of state to be used.
 * @returns [state:any, setState:function].
 */
export function useGlobalState<S>(name: string, initState: S) {
  if (typeof name !== "string") {
    throw new Error("useGlobalState's first param must be a string");
  }
  const store: IEmptyObj = useContext(context);

  if (!store.state.hasOwnProperty(name)) {
    store.state[name] = initState;
  }

  return [store.state[name], store.setStateFactory(name)];
}

/**
 * useGlobalReducer is a Hook which just like React's useReducer, but it add some global state into React App;
 * useGlobalReducer returns the state paired with a dispatch method.
 * You can call dispatch from everyWhere.The name argument mark which state you will use.
 * @param name String, name of global state to be used.
 * @param reducer:(state, action) => newState, a reducer function.
 * @param initState any, init value of state to be used.
 * @param initFn:(initState) => state, a function helped to calculate init state.
 * @returns [state:any, dispatch:funtion].
 */
export function useGlobalReducer<S, A, R extends Reducer<S, A>>(
  name: string,
  reducer: R,
  initState: S,
  initFn?: (state: S) => S
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  if (typeof name !== "string") {
    throw new Error("useGlobalState's first param must be a string");
  }

  const store: IEmptyObj = useContext(context);

  if (!store.state.hasOwnProperty(name)) {
    const initialState: S =
      initFn !== undefined ? initFn(initState) : ((initState as any) as S);
    store.state[name] = initialState;
  }

  const setState = store.setStateFactory(name);

  const dispatch: Dispatch<A> = (action: A) => {
    const newState = reducer(store.state[name], action);
    setState(newState);
  };

  return [store.state[name], dispatch];
}
