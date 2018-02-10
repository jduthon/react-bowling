import { combineReducers } from 'redux';

import { last } from '../utils/array';
import { roll, isGameEnd } from '../gameLogic/bowling';
import { frameIsFull } from '../gameLogic/frame';
import { ROLL, RESET, SET_PLAYERS } from './actions';

const getInitialState = playersList => ({
  playersList,
  playersGame: playersList.map(() => ({ frames: [] })),
  currentPlayerIndex: 0,
});

const initialState = getInitialState(['Player 1']);

const rollReducer = (state, action) => {
  const { frames } = state;
  const nextState = {
    ...state,
  };
  if (isGameEnd(frames)) {
    throw new Error('Cannot roll whereas end has been reached');
  }
  nextState.frames = roll(frames, action.roll);
  if (isGameEnd(nextState.frames)) {
    nextState.end = true;
  }
  return nextState;
};

const game = (state = initialState, action) => {
  if (action.type === ROLL) {
    const { currentPlayerIndex, playersGame: prevPlayersGame } = state;
    const playersGame = prevPlayersGame.map(
      (p, i) => (i === currentPlayerIndex ? rollReducer(p, action) : p)
    );
    if (frameIsFull(last(playersGame[currentPlayerIndex].frames))) {
      return {
        ...state,
        playersGame,
        currentPlayerIndex: (currentPlayerIndex + 1) % playersGame.length,
      };
    }
    return {
      ...state,
      playersGame,
    };
  }
  if (action.type === RESET) {
    console.log(state.playersList);
    console.log({ ...state });
    return getInitialState(state.playersList);
  }
  if (action.type === SET_PLAYERS) {
    return {
      ...getInitialState(action.playersList),
      playersSet: true,
    };
  }
  return state;
};

export default combineReducers({
  game,
});
