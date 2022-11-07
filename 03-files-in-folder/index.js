const path = require('path')
const fs = require('fs')
const pathToFolder = path.join(__dirname,'secret-folder')

fs.readdir(pathToFolder,{withFileTypes:true},(err,files)=>{
    files.forEach((files)=>{
        if(files.isFile()){
        const pathToFile = path.join(pathToFolder,files.name)
        fs.stat(pathToFile,(err,stats)=>{
            console.log (files.name.split('.')[0],'-',path.extname(files.name).split('.')[1],'-',stats.size + ' bytes')
        })
        }
    })
})