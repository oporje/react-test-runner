import React from 'react';
import style from  './App.module.css';
import TestRunner from './containers/test-runner/test-runner';

function App() {
  return (
    <div className={style.App}>
      <TestRunner />
    </div>
  );
}

export default App;
