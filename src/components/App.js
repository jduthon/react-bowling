import React, { Component } from 'react';
import { connect } from 'react-redux';

import { flatten, sum } from '../utils/array';
import { gameSelector } from '../redux/selectors';

import ScoreRow from './ScoreRow';
import RandomButton from './RandomButton';

import './App.css';

const framesWithEmpty = frames => [
  ...frames,
  ...new Array(10 - frames.length).fill({ rolls: [] }),
];

const App = ({ game }) => (
  <div className="App">
    <ScoreRow frames={framesWithEmpty(game.frames)} />
    <RandomButton />
  </div>
);

const mapStateToProps = state => ({
  game: gameSelector(state),
});

export default connect(mapStateToProps)(App);
