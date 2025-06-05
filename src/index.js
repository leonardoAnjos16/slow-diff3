import { parseCommandLineArguments } from './arguments.js'
import { getChunks, prettyPrintChunk } from './diff3.js'
import { getFileLines } from './files.js'
import { match } from './matching.js'
import { merge } from './merge.js'

const run = () => {
  const { args, options } = parseCommandLineArguments()
  const [left, base, right] = args

  const [leftLines, baseLines, rightLines] = [left, base, right].map(getFileLines)

  const Ma = match(baseLines, leftLines)
  const Mb = match(baseLines, rightLines)

  if (options.merge) {
    console.log(merge(Ma, Mb, leftLines, baseLines, rightLines))
  } else {
    const chunks = getChunks(Ma, Mb, leftLines.length, baseLines.length, rightLines.length)
    chunks.forEach(prettyPrintChunk)
  }
}

run()
