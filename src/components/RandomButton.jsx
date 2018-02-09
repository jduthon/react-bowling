import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { roll } from '../redux/actions';
import { getRandomRoll } from '../cpu';

class RandomButton extends React.Component {
  randomRoll = () => {
    const { roll, pinsNumber } = this.props;
    roll(getRandomRoll(pinsNumber));
  };

  render() {
    return (
      <button className="neon-button" onClick={this.randomRoll}>
        Roll!
      </button>
    );
  }
}

const mapDispatchToProps = {
  roll,
};

RandomButton.propTypes = {
  roll: PropTypes.func.isRequired,
  pinsNumber: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(RandomButton);
