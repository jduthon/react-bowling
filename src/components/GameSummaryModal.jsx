import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reset } from '../redux/actions';
import { scoresSelector } from '../redux/selectors';

import './GameSummaryModal.css';

const GameSummaryModal = ({ reset, scores }) => (
  <div className="game-summary">
    <h2 className="game-summary__title">Game end!</h2>
    {scores.map(({ name, score }, i) => (
      <div className="game-summary__score" key={i}>
        {`${name}'s score: ${score}`}
      </div>
    ))}
    <button className="game-summary__reset neon-button" onClick={reset}>
      New game
    </button>
  </div>
);

GameSummaryModal.propTypes = {
  reset: PropTypes.func.isRequired,
  scores: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapStateToProps = state => ({
  scores: scoresSelector(state),
});

const mapDispatchToProps = {
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSummaryModal);
