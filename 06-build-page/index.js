const path = require('path')
const fs = require('fs')

const pathToSrcHtml = path.join(__dirname,'template.html')
const pathToComponents = path.join(__dirname,'components')
const pathToProjectDest = path.join(__dirname,'project-dist')
const pathToDestHtml = path.join(pathToProjectDest,'template.html')
const pathToAssets = path.join(__dirname,'assets')
const pathToAssetsDest = path.join(__dirname,'project-dist','assets')
const pathToStylesSrc = path.join(__dirname,'styles')
const pathToStylesDest = path.join(pathToProjectDest,'style.css')


function createFolders(){
    fs.mkdir(pathToProjectDest,(err)=>{
    if(err) console.log('Папка уже создана')
})

fs.mkdir(pathToAssetsDest,(err)=>{
    if(err) console.log('Папка уже создана')
})
}



async function createHtmlPage(){
    let HTMLContent = await fs.promises.readFile(pathToSrcHtml,'utf8')
    const components = await fs.promises.readdir(pathToComponents)

    for(let item of components){
        let pathToItem = path.join(__dirname,'components',item)
        let content = await fs.promises.readFile(pathToItem,'utf8')
        let fileName = item.split('.')[0]
        HTMLContent = HTMLContent.replace(`{{${fileName}}}`,content)
    }

    fs.promises.writeFile(pathToDestHtml,HTMLContent)
}


async function copyFolder(){
    let AssetsFolder = await fs.promises.readdir(pathToAssets,{withFileTypes:true})
    for(let file of AssetsFolder){
        let pathToEachFolder = path.join(__dirname,'project-dist','assets',file.name)
        fs.mkdir(pathToEachFolder,(err)=>{
            if(err) console.log(err)
        })
    }
    const pathToEachFolderDest = await fs.promises.readdir(pathToAssetsDest)
    const pathToEachFolderSrc = await fs.promises.readdir(pathToAssets)
    for(let files of pathToEachFolderDest){
        for(let filesSrc of pathToEachFolderSrc )
        if(files === filesSrc){
            let currentFolder = path.join(__dirname,'assets',filesSrc)
            let contentFolder = await fs.promises.readdir(currentFolder)
            for (let content of contentFolder){
                let contentFolderSrc = path.join(currentFolder,content)
                let contentFolderDest = path.join(__dirname,'project-dist','assets',files,content)
                fs.promises.copyFile(contentFolderSrc,contentFolderDest)
            }
        }
    }

}


async function copyStyles (){
    let commonStyle = ''
    const folderStylesContent = await fs.promises.readdir(pathToStylesSrc)
    for(let styles of folderStylesContent){
        let pathToCurrentStyle = path.join(pathToStylesSrc,styles)
        let content = await fs.promises.readFile(pathToCurrentStyle,'utf8')
        commonStyle+=content
    }
    await fs.promises.writeFile(pathToStylesDest,commonStyle)
}

async function removeFolder(directory){
    let folder = await fs.promises.readdir(directory)

    for(let files of folder){
        if (!path.extname(files)){
            await removeFolder(path.join(directory,files))
            await fs.promises.rmdir(path.join(directory,files))
        } else{
            fs.unlink(path.join(directory,files),(err)=>{
                if(err) console.log(err);
            })
        }
    }
}


fs.stat(pathToProjectDest,(err)=>{
    if(err) {
        createFolders().then(()=>{
            copyStyles()
            copyFolder()
            createHtmlPage()
        })
    } else{
        removeFolder(pathToProjectDest).then(()=>{
            createFolders()
            copyStyles()
            copyFolder()
            createHtmlPage()
        })
    }
})


