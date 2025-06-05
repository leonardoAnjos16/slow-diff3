import { getChunks } from "./diff3.js"

const LEFT_CONFLICT_MARKER = '<<<<<<<'
const BASE_INIT_CONFLICT_MARKER = '|||||||'
const BASE_END_CONFLICT_MARKER = '======='
const RIGHT_CONFLICT_MARKER = '>>>>>>>'

export const merge = (Ma, Mb, aLines, oLines, bLines) => {
  const sameContent = (aLines, bLines, [al, ar], [bl, br]) => {
    if (ar - al != br - bl) return false
    return !aLines.slice(al - 1, ar).some((aLine, i) => aLine != bLines[bl + i - 1])
  }

  const spanToText = (lines, [l, r]) => {
    if (l > r) return ''
    return lines.slice(l - 1, r).join('\n') + '\n'
  }

  const conflict = (aSpan, oSpan, bSpan) => {
    let result = LEFT_CONFLICT_MARKER + '\n'
    result += spanToText(aLines, aSpan)

    result += BASE_INIT_CONFLICT_MARKER + '\n'
    result += spanToText(oLines, oSpan)
    result += BASE_END_CONFLICT_MARKER + '\n'

    result += spanToText(bLines, bSpan)
    result += RIGHT_CONFLICT_MARKER + '\n'

    return result
  }

  const chunkToText = ([stable, aSpan, oSpan, bSpan]) => {
    if (stable) {
      return spanToText(oLines, oSpan)
    }

    if (sameContent(aLines, bLines, aSpan, bSpan)) {
      return spanToText(aLines, aSpan)
    }

    if (sameContent(aLines, oLines, aSpan, oSpan)) {
      return spanToText(bLines, bSpan)
    }

    if (sameContent(oLines, bLines, oSpan, bSpan)) {
      return spanToText(aLines, aSpan)
    }

    return conflict(aSpan, oSpan, bSpan)
  }

  const chunks = getChunks(Ma, Mb, aLines.length, oLines.length, bLines.length)
  return chunks.map(chunkToText).join('')
}
