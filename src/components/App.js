import React, { Component } from 'react';

import { flatten, sum } from '../utils/array';

import ScoreRow from './ScoreRow';

import './App.css';

const fakeRolls = new Array(10).fill([5, 3]);

const fakeState = {
  frames: fakeRolls.map((rolls, i) => ({
    rolls,
    score: sum(flatten(fakeRolls.slice(0, i + 1))),
  })),
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <ScoreRow frames={fakeState.frames} />
      </div>
    );
  }
}

export default App;
