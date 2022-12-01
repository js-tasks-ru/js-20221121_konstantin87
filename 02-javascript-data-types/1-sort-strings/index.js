/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const options = { caseFirst: 'upper', numeric: true };

  const collator = new Intl.Collator(['ru', 'en'], options);

  const sortCallback = param === 'asc' ? (a, b) => collator.compare(a, b) : (a, b) => collator.compare(b, a);

  return [...arr].sort(sortCallback);
}
