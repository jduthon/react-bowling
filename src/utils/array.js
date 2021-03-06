export const sum = arr => arr.reduce((sum, v) => sum + v, 0);
export const last = arr => arr[arr.length - 1];
export const flatten = arr => arr.reduce((flat, v) => [...flat, ...v], []);
export const equals = (a, b) =>
  a.reduce((bool, v, i) => bool && v === b[i], true);

