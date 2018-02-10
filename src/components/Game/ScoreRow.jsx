import React from 'react';
import PropTypes from 'prop-types';

import Frame from './Frame';
import { framePropTypes } from '../../propTypes';

import './ScoreRow.css';

const ScoreRow = ({ frames, playerName }) => (
  <div className="score-row">
    <div className="score-row__player-name">{playerName}</div>
    <div className="score-row__frames">
      {frames.map((frame, i) => <Frame key={i} frame={frame} />)}
    </div>
  </div>
);

ScoreRow.propTypes = {
  frames: PropTypes.arrayOf(framePropTypes).isRequired,
  playerName: PropTypes.string.isRequired,
};

export default ScoreRow;
