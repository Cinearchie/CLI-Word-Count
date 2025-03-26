const {Command} = require('commander')
const program = new Command()
//const program1 = new Command()
const fs = require('fs')

// program
//     .name('file-util')
//     .description('CLI to count words from a file')
//     .version('0.0.1')
// program.command('Count')
//     .description('Count words from a file')
//     .argument('<string>' , 'Path to the File')
//     .action((filename) => {
//         fs.readFile(filename , 'utf-8' ,(err,data) => {
//             if(err){
//                 console.log("Error reading file")
//                 return;
//             }
//             const words = data.match(/\b\w+\b/g);
//             console.log('Word Count : ', words ? words.length: 0);
//         })
//     })
// program.parse();



const FILE_PATH = '/Users/archishman/Desktop/Cohort/Week_4/todos.json';

const readTasks = () => {
    try {
        return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
    } catch (error) {
        return [];
    }
};


const saveTasks = (tasks) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

program
    .name('CLI_TODO')
    .description('A TODO CLI')
    .version('0.0.1')
program.command('addTodo')
    .description('Add a TODO')
    .argument('<string>' , 'Todo name')
    .action((todoName) => {
        let taskArr = readTasks();
        taskArr.push(todoName);
        saveTasks(taskArr);
        console.log(`${todoName} added to the list`);
    });
program.command('deleteTodo')
    .description('Delete a TODO')
    .argument('<string>' , 'Todo name')
    .action((todoName) => {
        let taskArr = readTasks();
        taskArr = taskArr.filter(el => el !== todoName);
        saveTasks(taskArr);
        console.log(`${todoName} deleted from the list`);
    });
    program.command('showTodo')
    .description('Show TODO')
    .action(() => {
        let taskArr = readTasks();
        if (taskArr.length === 0) {
            console.log("No TODOs available.");
        } else {
            console.log("Your TODOs:");
            taskArr.forEach(todo => console.log(todo));
        }
    });

program.parse();
