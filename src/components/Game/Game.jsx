import React from 'react';
import { connect } from 'react-redux';

import { sum } from '../../utils/array';
import {
  currentGameSelector,
  currentFrameSelector,
  currentPlayerNameSelector,
} from '../../redux/selectors';

import ScoreRow from './ScoreRow';
import RandomButton from './RandomButton';
import Lane from './Lane';

import './Game.css';

const framesWithEmpty = frames => [
  ...frames,
  ...new Array(10 - frames.length).fill({ rolls: [] }),
];

const Game = ({ game: { frames, end }, currentFrame, playerName }) => {
  const pinsNumber = 10 - sum(currentFrame.rolls);
  return (
    <div className="game">
      <ScoreRow frames={framesWithEmpty(frames)} playerName={playerName} />
      <Lane pinsNumber={pinsNumber} />
      <div className="throw-area">
        <RandomButton pinsNumber={pinsNumber} disabled={end} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  game: currentGameSelector(state),
  currentFrame: currentFrameSelector(state),
  playerName: currentPlayerNameSelector(state),
});

export default connect(mapStateToProps)(Game);
