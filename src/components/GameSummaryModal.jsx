import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reset } from '../redux/actions';
import { scoreSelector } from '../redux/selectors';

import './GameSummaryModal.css';

const GameSummaryModal = ({ reset, score }) => (
  <div className="game-summary">
    <h2 className="game-summary__title">Game done!</h2>
    <div className="game-summary__score">Your score: {score}</div>
    <button className="game-summary__reset neon-button" onClick={reset}>
      New game
    </button>
  </div>
);

GameSummaryModal.propTypes = {
  resetGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  score: scoreSelector(state),
});

const mapDispatchToProps = {
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSummaryModal);
