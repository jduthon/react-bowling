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
  currentFrame.rolls.push(roll);
  if (frames.length > 10) {
    frames[9].score += roll;
    frames.push(currentFrame);
    return [
      ...frames.slice(0, 9),
      ...frames.slice(9).map(f => ({ ...f, score: frames[9].score })),
    ];
  }
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
  currentFrame.score =
    (lastFrame.score || 0) +
    (frames.length === 10 ? 0 : sum(currentFrame.rolls));
  return [...frames, currentFrame];
};

export const isGameEnd = frames => {
  if (frames.length >= 10) {
    const lastFrame = frames[9];
    if (frameIsStrike(lastFrame)) {
      return (
        frames.length > 11 &&
        ((frameIsStrike(frames[10]) && frames.length === 12) ||
          frameIsFull(frames[10]))
      );
    }
    if (frameIsSpare(lastFrame)) {
      return frames.length === 11;
    }
    return frameIsFull(lastFrame);
  }
  return false;
};
