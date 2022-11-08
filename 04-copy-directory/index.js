const fs = require('fs')
const path = require('path')

const pathToFolder = path.join(__dirname,'files')
const pathToCopyFolder = path.join(__dirname,'copy-file')


function createCopyFolder (){

    fs.stat(pathToCopyFolder,(err)=>{
        if(err){
            fs.mkdir(pathToCopyFolder,err=>{
                if (err) console.log(err)
            })
            CopyFiles()
        } else {
            fs.readdir(pathToCopyFolder,(err,files)=>{
                if (err) console.log(err.message)
                files.forEach((files)=>{
                    fs.unlink(path.join(__dirname,'copy-file',files),(err)=>{
                        if(err) console.log(err);
                    })
                })
            })
            CopyFiles()
        }
    })


}

function CopyFiles(){
    fs.readdir(pathToFolder,(err,files)=>{
        if(err) console.log(err)
        files.forEach((files)=>{
            let pathToFiles1 = path.join(__dirname,'files',files)
            let pathToFiles2 = path.join(__dirname,'copy-file',files)
            fs.copyFile(pathToFiles1,pathToFiles2,(err)=>{
                if(err) throw(err)
            })
        })
    })
}

createCopyFolder()


