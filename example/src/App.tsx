import React from 'react';
import './App.css';
import { Provider } from 'global-hooks';

import GlobalStateTest from './examples/GlobalStateTest';
import GlobalReducerTest from './examples/GlobalReducerTest';
import CompositeDemo from './examples/CompositeDemo';


const App: React.FC = () => {
  return (
    <Provider>
      <div className="App">
        <GlobalStateTest />
        <GlobalReducerTest />
        <CompositeDemo />
      </div>
    </Provider>
  );
}

export default App;
