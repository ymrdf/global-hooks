export interface IEmptyObj{
  [props:string]:any
}

export type Dispatch<A> = (action:A) => void;

export type Reducer<S, A> = (prevState: S, action: A) => S;

export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;

export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;