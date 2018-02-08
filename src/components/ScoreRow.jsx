import React from 'react';
import PropTypes from 'prop-types';

import Frame from './Frame';
import { framePropTypes } from '../propTypes';

import './ScoreRow.css';

const ScoreRow = ({ frames }) => (
  <div className="score-row">
    {frames.map((frame, i) => <Frame key={i} frame={frame} />)}
  </div>
);

ScoreRow.propTypes = {
  frames: PropTypes.arrayOf(framePropTypes),
};

export default ScoreRow;
