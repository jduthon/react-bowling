import { createSelector } from 'reselect';
import { last } from '../utils/array';
import { frameIsFull, getEmptyFrame } from '../gameLogic/frame';

export const gameSelector = ({ game }) => game;
export const currentFrameSelector = createSelector(
  gameSelector,
  ({ frames }) => {
    const lastFrame = last(frames);
    return !lastFrame || frameIsFull(lastFrame) ? getEmptyFrame() : lastFrame;
  }
);
export const scoreSelector = createSelector(
  gameSelector,
  ({ frames }) => last(frames).score
);
