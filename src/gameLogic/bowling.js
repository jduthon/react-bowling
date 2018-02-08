import { sum, last } from '../utils/array';
import {
  frameIsStrike,
  frameIsSpare,
  frameIsEmpty,
  getEmptyFrame,
  frameIsFull,
} from './frame';

export const roll = (state, roll) => {
  const frames = [...state.frames];
  let currentFrame = frames.pop() || getEmptyFrame();
  if (frameIsFull(currentFrame)) {
    frames.push(currentFrame);
    currentFrame = { rolls: [] };
  }
  const lastFrame = last(frames) || getEmptyFrame();
  const lastIsStrike = frameIsStrike(lastFrame);
  const lastIsSpare = frameIsSpare(lastFrame);
  const isDoubleScore =
    lastIsStrike || (lastIsSpare && frameIsEmpty(currentFrame));
  if (isDoubleScore) {
    lastFrame.score += roll;
  }
  currentFrame.rolls.push(roll);
  currentFrame.score = lastFrame.score + sum(currentFrame.rolls);
  return {
    ...state,
    frames: [...frames, currentFrame],
  };
};
