import { constantMatrix } from "./utils.js"

const NO_ANSWER = -1
const SKIP_I = 1
const SKIP_J = 2
const SKIP_IJ = 3

export const lcs = (a, b) => {
  const memo = constantMatrix(a.length, b.length, NO_ANSWER)
  const bestAction = constantMatrix(a.length, b.length, NO_ANSWER)

  const _lcs = (i = 0, j = 0) => {
    if (i >= a.length || j >= b.length) return 0
    if (memo[i][j] != NO_ANSWER) return memo[i][j]

    let ans = NO_ANSWER
    if (ans == NO_ANSWER || _lcs(i, j + 1) > ans) {
      ans = _lcs(i, j + 1)
      bestAction[i][j] = SKIP_J
    }

    if (ans == NO_ANSWER || _lcs(i + 1, j) > ans) {
      ans = _lcs(i + 1, j)
      bestAction[i][j] = SKIP_I
    }

    if (a[i] == b[j] && (ans == NO_ANSWER || _lcs(i + 1, j + 1) + 1 > ans)) {
      ans = _lcs(i + 1, j + 1) + 1
      bestAction[i][j] = SKIP_IJ
    }

    memo[i][j] = ans
    return ans
  }

  _lcs()

  return retrieveSubsequence(bestAction, a.length, b.length)
}

const retrieveSubsequence = (bestAction, aLength, bLength) => {
  let i = 0, j = 0
  const subsequence = []
  
  while (i < aLength && j < bLength) {
    if (bestAction[i][j] == SKIP_I) i++
    else if (bestAction[i][j] == SKIP_J) j++
    else subsequence.push([i++, j++])
  }

  return subsequence
}
