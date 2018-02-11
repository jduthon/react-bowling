import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { omitKeys } from '../../utils/object';

import { getRandomRoll } from '../../cpu';

import './Ball.css';

class Ball extends React.Component {
  randomRoll = () => {
    const { pinsNumber, disabled, onClick } = this.props;
    if (!disabled) {
      onClick(getRandomRoll(pinsNumber));
    }
  };

  render() {
    const { disabled, rolling, rollDuration, ...btnProps } = this.props;
    return (
      <button
        className={cx('ball', {
          'ball--rolling': rolling,
          'ball--disabled': disabled,
        })}
        style={{ animationDuration: `${rollDuration / 1000}s` }}
        {...omitKeys(btnProps, ['pinsNumber', 'onClick'])}
        onClick={this.randomRoll}
      />
    );
  }
}

Ball.propTypes = {
  onClick: PropTypes.func.isRequired,
  pinsNumber: PropTypes.number.isRequired,
  rollDuration: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  rolling: PropTypes.bool,
};

Ball.defaultProps = {
  disabled: false,
  rolling: false,
};

export default Ball;
