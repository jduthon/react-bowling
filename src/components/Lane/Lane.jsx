import React from 'react';
import PropTypes from 'prop-types';

import Pin from './Pin';
import './Lane.css';

const Lane = ({ pinsNumber = 10 }) => (
  <div className="lane">
    <div className="lane__hole">
      {Array(pinsNumber)
        .fill(0)
        .map((_, i) => <Pin key={i} />)}
    </div>
  </div>
);

Lane.propTypes = {
  pinsNumber: PropTypes.number.isRequired,
};

export default Lane;
