import { combineReducers } from 'redux';

import { roll, isGameEnd } from '../gameLogic/bowling';
import { ROLL } from './actions';

const game = (state = { frames: [] }, action) => {
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
  return state;
};

export default combineReducers({
  game,
});
