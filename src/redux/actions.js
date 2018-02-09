export const ROLL = 'roll';
export const RESET = 'reset';

export const roll = roll => ({ type: ROLL, roll });
export const reset = () => ({ type: RESET });
