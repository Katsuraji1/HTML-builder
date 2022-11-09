const fs = require('fs')
const path = require('path')

const pathToSrcFolder = path.join(__dirname,'styles')
const pathToDestFolder = path.join(__dirname,'project-dist','bundle.css')

let result =''

async function copyStyles(){
    const cssFiles = await fs.promises.readdir(pathToSrcFolder)
    for (files of cssFiles){
        if(path.extname(files)==='.css'){
            let newPathToFiles = path.join(__dirname,'styles',files)
            let content = await fs.promises.readFile(newPathToFiles,'utf8')
            result += content
        }
    }
    createFile()
}


async function createFile (){   
    await fs.promises.writeFile(pathToDestFolder,result)
}
copyStyles()