import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import matching from './utils/matching'

const test = matching({
  "bids": [
    [100, 2, 1],
    [100, 1, 1],
  ],
  "asks": [
    [100, 1, 1],
    [103, 2, 1],
  ]
})
console.log(test)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
