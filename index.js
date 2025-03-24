const {Command} = require('commander')
const program = new Command()
const fs = require('fs')

program
    .name('file-util')
    .description('CLI to count words from a file')
    .version('0.0.1')
program.command('Count')
    .description('Count words from a string')
    .argument('<string>' , 'Path to the File')
    .action((filename) => {
        fs.readFile(filename , 'utf-8' ,(err,data) => {
            if(err){
                console.log("Error reading file")
                return;
            }
            const words = data.match(/\b\w+\b/g);
            console.log('Word Count : ', words ? words.length: 0);
        })
    })
program.parse();