import React from 'react';
import cx from 'classnames';

import { frameIsSpare, frameIsStrike } from '../../gameLogic/frame';

import { framePropTypes } from './propTypes';

import './Frame.css';

const Frame = ({ frame }) => {
  const { rolls, score } = frame;
  const isStrike = frameIsStrike(frame);
  const isSpare = frameIsSpare(frame);
  return (
    <div className="frame">
      <div className="frame__rolls">
        <div className="frame__roll">{!isStrike && rolls[0]}</div>
        <div
          className={cx('frame__roll', {
            'frame__roll--strike': isStrike,
            'frame__roll--spare': isSpare,
          })}
        >
          {isStrike && 'X'}
          {isSpare && '/'}
          {!isStrike && !isSpare && rolls[1]}
        </div>
      </div>
      <div className="frame__score">{score}</div>
    </div>
  );
};

Frame.propTypes = {
  frame: framePropTypes,
};

export default Frame;
