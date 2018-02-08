import React from 'react';
import { connect } from 'react-redux';

import { roll } from '../redux/actions';
import { getRandomRoll } from '../cpu';

class RandomButton extends React.Component {
  randomRoll = () => {
    const { roll } = this.props;
    console.log(roll);
    console.log(getRandomRoll());
    roll(getRandomRoll());
  };

  render() {
    return <button onClick={this.randomRoll}>Click to do a random roll</button>;
  }
}

const mapDispatchToProps = {
  roll,
};

export default connect(null, mapDispatchToProps)(RandomButton);
