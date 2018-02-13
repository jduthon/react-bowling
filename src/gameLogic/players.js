const getNextIndex = arr => index => (index + 1) % arr.length;

export const getNextPlayerIndex = ({ playersGame, currentPlayerIndex }) => {
  const getNext = getNextIndex(playersGame);
  let nextIndex = getNext(currentPlayerIndex);
  while (playersGame[nextIndex].end && nextIndex !== currentPlayerIndex) {
    if (nextIndex === currentPlayerIndex) {
      // We reached the end of all players, so go back to first one
      return getNext(currentPlayerIndex);
    }
    nextIndex = getNext(nextIndex);
  }
  return nextIndex;
};
