import fs from 'fs'

export const getFileLines = filePath => {
  const fileData = fs.readFileSync(filePath, 'utf-8')
  return fileData.split('\n')
}
