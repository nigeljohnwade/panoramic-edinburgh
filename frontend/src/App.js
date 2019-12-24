import React from 'react';
import Amplify from '@aws-amplify/core';
import { AWSAppSyncClient, AUTH_TYPE } from 'aws-appsync';
import config from './aws-exports';
import logo from './logo.svg';
import './App.css';

Amplify.configure(config);
console.log(config);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
