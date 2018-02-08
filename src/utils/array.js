export const sum = arr => arr.reduce((sum, v) => sum + v);
export const last = arr => arr[arr.length - 1];
export const flatten = arr => arr.reduce((flat, v) => [...flat, ...v], []);
