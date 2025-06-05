import { lcs } from "./lcs.js"
import { constantMatrix } from "./utils.js"

export const match = (a, b) => {
  const subsequence = lcs(a, b)
  const matching = constantMatrix(a.length + 1, b.length + 1, false)

  subsequence.forEach(([aIndex, bIndex]) => matching[aIndex + 1][bIndex + 1] = true)
  return matching
}

// Experimental, for debug purposes
export const getChanges = (a, b) => {
  const subsequence = lcs(a, b)
  const aLength = a.length, bLength = b.length

  const changes = []
  let al = 0, ar = 0, bl = 0, br = 0

  for (let i = 0; i < subsequence.length; i++) {
    const [aIndex, bIndex] = subsequence[i] 
    if (aIndex == ar && bIndex == br) {
      ar++
      br++
    } else if (aIndex == ar) {
      if (ar > al && br > bl) {
        changes.push([[al, ar - 1], [bl, br - 1]])
        al = ar++
      }

      changes.push([[-1, -1], [br, bIndex - 1]])
      bl = bIndex
      br = bIndex + 1
    } else if (bIndex == br) {
      if (ar > al && br > bl) {
        changes.push([[al, ar - 1], [bl, br - 1]])
        bl = br++
      }

      changes.push([[ar, aIndex - 1], [-1, -1]])
      al = aIndex
      ar = aIndex + 1
    } else {
      if (ar > al && br > bl) {
        changes.push([[al, ar - 1], [bl, br - 1]])
      }

      changes.push([[ar, aIndex - 1], [-1, -1]])
      changes.push([[-1, -1], [br, bIndex - 1]])

      al = aIndex
      ar = aIndex + 1

      bl = bIndex
      br = bIndex + 1
    }
  }

  if (ar > al && br > bl) {
    changes.push([[al, ar - 1], [bl, br - 1]])
  }

  if (ar < aLength) {
    changes.push([[ar, aLength - 1], [-1, -1]])
  }

  if (br < bLength) {
    changes.push([[-1, -1], [br, bLength - 1]])
  }

  return changes.map(([[al, ar], [bl, br]]) => [[al + 1, ar + 1], [bl + 1, br + 1]])
}
