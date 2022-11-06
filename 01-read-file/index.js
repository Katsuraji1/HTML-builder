const path = require('path')
const fs = require('fs')
const pathToFile = path.join('01-read-file','text.txt')

const stream = fs.createReadStream(pathToFile)

stream.pipe(process.stdout)