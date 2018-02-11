import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPlayers } from '../redux/actions';
import { playersListSelector } from '../redux/selectors';

import './PlayersForm.css';

class PlayersForm extends React.Component {
  constructor(props) {
    const { players } = props;
    super(props);
    this.state = {
      players,
    };
  }

  handleChange = index => ({ target: { value } }) => {
    const { players } = this.state;
    players[index] = value;
    this.setState({ players });
  };

  handleAdd = e => {
    const { players } = this.state;
    const { maxPlayers } = this.props;
    if (players.length < maxPlayers) {
      this.setState({
        players: [...players, `Player ${players.length + 1}`],
      });
    }
    e.preventDefault();
  };

  handleDelete = index => e => {
    const { players } = this.state;
    if (players.length > 1) {
      this.setState({ players: players.filter((_, i) => index !== i) });
    }
    e.preventDefault();
  };

  handleSubmit = e => {
    const { setPlayers } = this.props;
    const { players } = this.state;
    setPlayers(players);
    e.preventDefault();
  };

  render() {
    const { players } = this.state;
    return (
      <form className="players-form" onSubmit={this.handleSubmit}>
        {players.map((name, i) => (
          <div key={i} className="players-form__field">
            <input
              type="text"
              className="players-form__input"
              value={name}
              onChange={this.handleChange(i)}
            />
            <button
              className="neon-button players-form__delete"
              onClick={this.handleDelete(i)}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="neon-button players-form__add"
          onClick={this.handleAdd}
        >
          +
        </button>
        <input
          type="submit"
          value="Play!"
          className="neon-button players-form__submit"
        />
      </form>
    );
  }
}

PlayersForm.propTypes = {
  setPlayers: PropTypes.func.isRequired,
  maxPlayers: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PlayersForm.defaultProps = {
  maxPlayers: 4,
};

const mapStateToProps = state => ({
  players: playersListSelector(state),
});

const mapDispatchToProps = {
  setPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersForm);
