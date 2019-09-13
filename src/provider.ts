import * as React from 'react';

interface IEmptyObj{
  [props:string]:any
}

interface IContext{
  state:IEmptyObj,
  setStateFactory:(key:string) => ((data:any) => void)
}

const initContext:IContext = {state:{}, setStateFactory:(key:string) => {
  return (data:any) => {};
}}

export const context = React.createContext(initContext);

/**
 * Provider to store all global states.
 */
export class Provider extends React.Component {
  constructor(props:{children:any}) {
    super(props);
    this.state = {};
  }

  setStateFactory = (keys:string) => {
    return (data:any) => {
      this.setState({[keys]:data});
    }
  };

  render() {
    return React.createElement(context.Provider,{value:{state:this.state,setStateFactory:this.setStateFactory}},this.props.children);
  }
}