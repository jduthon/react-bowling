import React, { Component } from 'react';
import { connect } from 'react-redux';

import { last, sum } from '../utils/array';
import { gameSelector } from '../redux/selectors';
import { frameIsFull, getEmptyFrame } from '../gameLogic/frame';

import ScoreRow from './ScoreRow';
import RandomButton from './RandomButton';
import Lane from './Lane';

import './App.css';

const framesWithEmpty = frames => [
  ...frames,
  ...new Array(10 - frames.length).fill({ rolls: [] }),
];

const App = ({ game: { frames } }) => {
  const lastFrame = last(frames) || getEmptyFrame();
  const pinsNumber = 10 - sum(lastFrame.rolls);
  return (
    <div className="app">
      <ScoreRow frames={framesWithEmpty(frames)} />
      <Lane pinsNumber={pinsNumber} />
      <div className="throw-area">
        <RandomButton pinsNumber={pinsNumber} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  game: gameSelector(state),
});

export default connect(mapStateToProps)(App);
