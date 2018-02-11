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
import Lane from './Lane';
import Ball from './Ball';

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
    rollDuration: PropTypes.number,
  };

  static defaultProps = {
    rollDuration: 500,
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
    const { roll, rollDuration } = this.props;
    this.setState({ rolling: true });
    window.setTimeout(() => {
      roll(pinsKnocked);
      this.setState({ rolling: false });
    }, rollDuration);
  };

  render() {
    const {
      game: { frames, end },
      playerName,
      currentFrame,
      processing,
      rolling,
    } = this.state;
    const { rollDuration } = this.props;
    const pinsNumber = 10 - sum(currentFrame.rolls);
    return (
      <div className="game">
        <ScoreRow frames={framesWithEmpty(frames)} playerName={playerName} />
        <Lane pinsNumber={pinsNumber} />
        <div className="throw-area">
          <Ball
            rolling={rolling}
            rollDuration={rollDuration}
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
