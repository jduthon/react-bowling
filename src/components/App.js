import React, { Component } from 'react';
import { connect } from 'react-redux';

import { last, sum } from '../utils/array';
import { gameSelector, currentFrameSelector } from '../redux/selectors';
import { frameIsFull, getEmptyFrame } from '../gameLogic/frame';

import ScoreRow from './ScoreRow';
import RandomButton from './RandomButton';
import Lane from './Lane';
import GameSummaryModal from './GameSummaryModal';

import './App.css';

const framesWithEmpty = frames => [
  ...frames,
  ...new Array(10 - frames.length).fill({ rolls: [] }),
];

const App = ({ game: { frames, end }, currentFrame }) => {
  const pinsNumber = 10 - sum(currentFrame.rolls);
  return (
    <div className="app">
      <ScoreRow frames={framesWithEmpty(frames)} />
      <Lane pinsNumber={pinsNumber} />
      <div className="throw-area">
        <RandomButton pinsNumber={pinsNumber} disabled={end} />
      </div>
      {end && <GameSummaryModal />}
    </div>
  );
};

const mapStateToProps = state => ({
  game: gameSelector(state),
  currentFrame: currentFrameSelector(state),
});

export default connect(mapStateToProps)(App);
