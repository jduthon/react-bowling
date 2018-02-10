import { createSelector } from 'reselect';
import { last } from '../utils/array';
import { frameIsFull, getEmptyFrame } from '../gameLogic/frame';

export const gameSelector = ({ game }) => game;

export const playersListSelector = createSelector(
  gameSelector,
  ({ playersList }) => playersList
);

export const playersSetSelector = createSelector(
  gameSelector,
  ({ playersSet }) => playersSet
);

export const playersGameSelector = createSelector(
  gameSelector,
  ({ playersGame }) => playersGame
);

export const currentPlayerIndexSelector = createSelector(
  gameSelector,
  ({ currentPlayerIndex }) => currentPlayerIndex
);

export const currentGameSelector = createSelector(
  playersGameSelector,
  currentPlayerIndexSelector,
  (playersGame, currentPlayerIndex) => playersGame[currentPlayerIndex]
);

export const currentFrameSelector = createSelector(
  currentGameSelector,
  ({ frames }) => {
    const lastFrame = last(frames);
    return !lastFrame || frameIsFull(lastFrame) ? getEmptyFrame() : lastFrame;
  }
);

export const currentPlayerNameSelector = createSelector(
  currentPlayerIndexSelector,
  playersListSelector,
  (currentIndex, players) => players[currentIndex]
);

const scoreSelector = ({ frames }) => last(frames).score;

export const scoresSelector = createSelector(
  playersListSelector,
  playersGameSelector,
  (playersList, playersGame) =>
    playersList.map((name, i) => ({
      name,
      score: scoreSelector(playersGame[i]),
    }))
);

export const gameEndSelector = createSelector(gameSelector, ({ playersGame }) =>
  playersGame.reduce((bool, { end }) => bool && end, true)
);
