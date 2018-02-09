import { combineReducers } from 'redux';

import { roll, isGameEnd } from '../gameLogic/bowling';
import { ROLL, RESET } from './actions';

const initialState = {
  frames: [],
};

const game = (state = initialState, action) => {
  if (action.type === ROLL) {
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
  }
  if (action.type === RESET) {
    return {
      ...initialState,
    };
  }
  return state;
};

export default combineReducers({
  game,
});
