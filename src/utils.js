/* Creates rows x cols matrix with copies of the same value */
export const constantMatrix = (rows, cols, value) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => value))

/* Finds index of first element in arr for which predicate returns true. Returns -1 if no such index exists. */
export const findFirstIndex = (arr, startIndex = 0, predicate = v => v) => {
  for (let i = startIndex; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return i
    }
  }

  return -1
}
