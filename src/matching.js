import { lcs } from "./lcs.js"
import { constantMatrix } from "./utils.js"

export const match = (a, b) => {
  const subsequence = lcs(a, b)
  const matching = constantMatrix(a.length + 1, b.length + 1, false)

  subsequence.forEach(([aIndex, bIndex]) => matching[aIndex + 1][bIndex + 1] = true)
  return matching
}

// Experimental, for debug purposes
export const prettryPrintMatching = (a, b, aLabel, bLabel) => {
  const subsequence = lcs(a, b)
  if (subsequence.length === 0) {
    console.log(`No matching between ${aLabel} and ${bLabel}`)
    return
  }

  const changes = []
  let sIndex = 0, ar = 0, br = 0

  while (sIndex < subsequence.length) {
    const [aIndex, bIndex] = subsequence[sIndex]
    if (ar !== aIndex) {
      changes.push([[ar, aIndex - 1], [-1, -1]])
    }

    if (br !== bIndex) {
      changes.push([[-1, -1], [br, bIndex - 1]])
    }

    while (sIndex + 1 < subsequence.length && consecutiveChanges(subsequence[sIndex], subsequence[sIndex + 1])) {
      sIndex++
    }

    const [aNewR, bNewR] = subsequence[sIndex]
    changes.push([[aIndex, aNewR], [bIndex, bNewR]])

    ar = aNewR + 1
    br = bNewR + 1
    sIndex++
  }

  const aLength = a.length
  const bLength = b.length

  if (ar !== aLength) {
    changes.push([[ar, aLength - 1], [-1, -1]])
  }

  if (br !== bLength) {
    changes.push([[-1, -1], [br, bLength - 1]])
  }

  console.log(`${aLabel}-${bLabel} matching:`)
  changes.forEach(([[al, ar], [bl, br]]) => {
    const aRange = al != -1 && ar != -1 ? `${al + 1}-${ar + 1}` : '-'
    const bRange = bl != -1 && br != -1 ? `${bl + 1}-${br + 1}` : '-'

    console.log(`${aRange}\t(${aLabel})\t|\t${bRange}\t(${bLabel})`)
  })
}

const consecutiveChanges = ([ai, bi], [aj, bj]) => aj == ai + 1 && bj == bi + 1
