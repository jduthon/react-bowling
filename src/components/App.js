import React from 'react';
import { connect } from 'react-redux';

import { gameEndSelector, playersSetSelector } from '../redux/selectors';

import PlayersForm from './PlayersForm';
import Game from './Game';
import GameSummaryModal from './GameSummaryModal';

import './App.css';

const App = ({ end, playersSet }) => {
  return (
    <div className="app">
      {!playersSet && <PlayersForm />}
      {playersSet && <Game />}
      {end && <GameSummaryModal />}
    </div>
  );
};

const mapStateToProps = state => ({
  end: gameEndSelector(state),
  playersSet: playersSetSelector(state),
});

export default connect(mapStateToProps)(App);
