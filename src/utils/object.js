export const omitKeys = (obj, keys) =>
  Object.keys(obj)
    .filter(k => keys.indexOf(k) !== -1)
    .reduce((acc, k) => ({
      ...acc,
      [k]: obj[k],
    }));
