export const ROLL = 'roll';
export const RESET = 'reset';
export const SET_PLAYERS = 'set_players';

export const roll = roll => ({ type: ROLL, roll });
export const reset = () => ({ type: RESET });
export const setPlayers = playersList => ({ type: SET_PLAYERS, playersList });

