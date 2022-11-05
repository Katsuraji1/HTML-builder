const path = require('path')
const fs = require('fs')
const file = path.join('01-read-file','text.txt')
const stream = new fs.ReadStream(file,{encoding:'utf8'})
stream.on('readable',()=>{
    let data = stream.read()
    if (data!==null) console.log(data)
})

stream.on('end',()=>{
})