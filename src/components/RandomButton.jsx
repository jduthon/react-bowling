import React from 'react';
import { connect } from 'react-redux';

import { roll } from '../redux/actions';
import { getRandomRoll } from '../cpu';

class RandomButton extends React.Component {
  randomRoll = () => {
    const { roll } = this.props;
    roll(getRandomRoll());
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

export default connect(null, mapDispatchToProps)(RandomButton);
