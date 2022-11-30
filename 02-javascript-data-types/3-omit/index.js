/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const objKeys = Object.keys(obj);

  const filteredKeys = objKeys.filter((key) => !fields.includes(key));

  const entries = filteredKeys.map(key => [key, obj[key]]);

  return Object.fromEntries(entries);
};
