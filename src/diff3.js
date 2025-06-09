import { findFirstIndex } from "./utils.js"

export const getChunks = (Ma, Mb, aLength, oLength, bLength) => {
  const chunks = []
  let lo = 0, la = 0, lb = 0
  let foundLastChunk = false, lastChunkIsStable

  while (!foundLastChunk) {
    let i = 1
    while (la + i <= aLength && lo + i <= oLength && lb + i <= bLength && Ma[lo + i][la + i] && Mb[lo + i][lb + i]) {
      i++
    }

    if (la + i > aLength && lo + i > oLength && lb + i > bLength) {
      foundLastChunk = true
      lastChunkIsStable = true
    } else if (i == 1) {
      let o = lo + 1
      while (o <= oLength && (findFirstIndex(Ma[o], la + 1) == -1 || findFirstIndex(Mb[o], lb + 1) == -1)) {
        o++
      }

      if (o > oLength) {
        foundLastChunk = true
        lastChunkIsStable = false
      } else {
        let a = findFirstIndex(Ma[o], la + 1)
        let b = findFirstIndex(Mb[o], lb + 1)
        chunks.push([false, [la + 1, a - 1], [lo + 1, o - 1], [lb + 1, b - 1]])
  
        lo = o - 1
        la = a - 1
        lb = b - 1
      }
    } else {
      chunks.push([true, [la + 1, la + i - 1], [lo + 1, lo + i - 1], [lb + 1, lb + i - 1]])

      lo = lo + i - 1
      la = la + i - 1
      lb = lb + i - 1
    }
  }

  if (lo < oLength || la < aLength || lb < bLength) {
    chunks.push([lastChunkIsStable, [la + 1, aLength], [lo + 1, oLength], [lb + 1, bLength]])
  }

  return chunks
}

export const prettyPrintChunk = ([stable, [al, ar], [ol, or], [bl, br]]) => {
  const stableStatus = stable ? 'stable' : 'unstable'
  const left = al <= ar ? `${al}-${ar}` : '-'
  const base = ol <= or ? `${ol}-${or}` : '-'
  const right = bl <= br ? `${bl}-${br}` : '-'

  console.log(`${stableStatus} chunk:\t\t${left}\t(L)\t|\t${base}\t(B)\t|\t${right}\t(R)`)
}
