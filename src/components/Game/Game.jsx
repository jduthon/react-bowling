import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sum } from '../../utils/array';
import {
  currentGameSelector,
  currentFrameSelector,
  currentPlayerNameSelector,
} from '../../redux/selectors';
import { roll } from '../../redux/actions';
import {
  frameIsFull,
  getEmptyFrame,
  frameIsEmpty,
} from '../../gameLogic/frame';

import { gamePropTypes, framePropTypes } from './propTypes';
import ScoreRow from './ScoreRow';
import RandomButton from './RandomButton';
import Lane from './Lane';

import './Game.css';

const framesWithEmpty = frames => [
  ...frames,
  ...new Array(10 - Math.min(frames.length, 10)).fill(getEmptyFrame()),
];

class Game extends React.Component {
  static propTypes = {
    game: gamePropTypes.isRequired,
    currentFrame: framePropTypes.isRequired,
    playerName: PropTypes.string.isRequired,
    roll: PropTypes.func.isRequired,
  };

  constructor(props) {
    const { currentFrame, playerName, game } = props;
    super(props);
    this.state = {
      currentFrame,
      playerName,
      game,
    };
  }

  componentWillUpdate(props, state) {
    const { currentFrame, playerName, game } = props;
    const { processing, currentFrame: nextFrame } = state;
    const { currentFrame: prevFrame, playerName: prevPlayer } = this.props;
    const playerChanged = playerName !== prevPlayer;
    const frameGotFull = frameIsFull(prevFrame) && !frameIsEmpty(nextFrame);
    if (processing) {
      return;
    }
    if (playerChanged || frameGotFull) {
      this.setState({
        processing: true,
      });
      window.setTimeout(() => {
        this.setState({
          playerName,
          currentFrame: getEmptyFrame(),
          game,
          processing: false,
        });
      }, 1000);
    } else if (currentFrame.score !== prevFrame.score) {
      this.setState({
        currentFrame,
        game,
      });
    }
  }

  handleRoll = pinsKnocked => {
    const { roll } = this.props;
    roll(pinsKnocked);
  };

  render() {
    const {
      game: { frames, end },
      playerName,
      currentFrame,
      processing,
    } = this.state;
    const pinsNumber = 10 - sum(currentFrame.rolls);
    return (
      <div className="game">
        <ScoreRow frames={framesWithEmpty(frames)} playerName={playerName} />
        <Lane pinsNumber={pinsNumber} />
        <div className="throw-area">
          <RandomButton
            pinsNumber={pinsNumber}
            disabled={end || processing}
            onClick={this.handleRoll}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: currentGameSelector(state),
  currentFrame: currentFrameSelector(state),
  playerName: currentPlayerNameSelector(state),
});

const mapDispatchToProps = {
  roll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
