import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { omitKeys } from '../../utils/object';

import { getRandomRoll } from '../../cpu';

import './RandomButton.css';

class RandomButton extends React.Component {
  randomRoll = () => {
    const { pinsNumber, disabled, onClick } = this.props;
    if (!disabled) {
      onClick(getRandomRoll(pinsNumber));
    }
  };

  render() {
    const { disabled } = this.props;
    return (
      <button
        className={cx('neon-button', 'random-button', {
          'random-button--disabled': disabled,
        })}
        {...omitKeys(this.props, ['pinsNumber'])}
        onClick={this.randomRoll}
      >
        Roll!
      </button>
    );
  }
}

RandomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  pinsNumber: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
};

RandomButton.defaultProps = {
  disabled: false,
};

export default RandomButton;
