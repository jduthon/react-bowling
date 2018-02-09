import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';

import { omitKeys } from '../utils/object';

import { roll } from '../redux/actions';
import { getRandomRoll } from '../cpu';

import './RandomButton.css';

class RandomButton extends React.Component {
  randomRoll = () => {
    const { roll, pinsNumber, disabled } = this.props;
    if (!disabled) {
      roll(getRandomRoll(pinsNumber));
    }
  };

  render() {
    const { disabled } = this.props;
    return (
      <button
        className={cx('neon-button', 'random-button', {
          ['random-button--disabled']: disabled,
        })}
        onClick={this.randomRoll}
        {...omitKeys(this.props, ['roll', 'pinsNumber'])}
      >
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
  disabled: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(RandomButton);
