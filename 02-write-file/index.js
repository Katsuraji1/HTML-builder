const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pathToFile = path.join('02-write-file','text.txt')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const File = fs.createWriteStream(pathToFile)

readline.emitKeypressEvents(process.stdin)


process.stdin.on('keypress',(c,key)=>{
    if(key && key.ctrl && key.name=='c'){
        console.log('Выход');
    }
}
)

function write(){
    rl.question('Введите текст ',text=>{
        if (text.toLocaleLowerCase()==='exit'){
            console.log('Выход');
            rl.close()
            return
        }
        File.write(text+'\n',err=>{
            if (err) console.log(err.message);
            write()
        })
    })
}
write()