export const frameIsStrike = ({ rolls }) => rolls[0] === 10;
export const frameIsSpare = ({ rolls: [a, b] }) => a + b === 10;
export const frameIsFull = frame =>
  frameIsStrike(frame) || frame.rolls.length === 2;
export const frameIsEmpty = ({ rolls }) => rolls.length === 0;
export const getEmptyFrame = _ => ({ rolls: [], score: 0 });

