import { sum, last } from '../utils/array';
import {
  frameIsStrike,
  frameIsSpare,
  frameIsEmpty,
  getEmptyFrame,
  frameIsFull,
} from './frame';

export const roll = (previousFrames, roll) => {
  const frames = [...previousFrames];
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
    if (lastIsStrike) {
      const lastLastFrame = frames[frames.length - 2] || getEmptyFrame();
      if (frameIsStrike(lastLastFrame)) {
        lastLastFrame.score += roll;
        lastFrame.score += roll;
      }
    }
    lastFrame.score += roll;
  }
  currentFrame.rolls.push(roll);
  currentFrame.score = lastFrame.score + sum(currentFrame.rolls);
  return [...frames, currentFrame];
};

export const isGameEnd = frames => {
  const lastFrame = last(frames);
  return frames.length === 10 && frameIsFull(lastFrame);
};
