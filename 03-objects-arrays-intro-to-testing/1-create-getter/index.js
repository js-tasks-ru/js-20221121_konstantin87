/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const targetObjectKeys = path.split('.');

  return (targetObject) => {
    if (Object.keys(targetObject).length === 0) {
      return;
    }

    let currentLevel = targetObject;

    for (const key of targetObjectKeys) {
      currentLevel = currentLevel[key];
    }

    return currentLevel;
  };
}
