const path = require('path');
const fs = require('fs');

const pathToTaskDirectory = path.join(__dirname, 'data');

fs.mkdir(pathToTaskDirectory, err => {
    if (err) throw new Error();
});

function createDirectoryAndFiles(directoryNumber, directoryName, fileName, fileData) {
    for (let i = 1; i <= directoryNumber; i++) {
        fs.mkdir(path.join(pathToTaskDirectory, `${directoryName}-${i}`), err => {
            if (err) throw new Error();
        });

        fs.writeFile(path.join(pathToTaskDirectory, `${directoryName}-${i}`, `${fileName}-${i}.txt`), `${fileData}-${i}`, err => {
            if (err) throw new Error();
        })
    }
}

function isDirectoryOrFile(pathTo) {
    fs.stat(pathTo, (err, stats) => {
        if (err) throw new Error();

        if (stats.isFile()) {
            console.log(`File: ${path.basename(pathTo)}`);
        } else if (stats.isDirectory()) {
            console.log(`Directory: ${path.basename(pathTo)}`);
        }
    })
}

createDirectoryAndFiles(5, 'data', 'text', 'Hello world');

isDirectoryOrFile(path.join(pathToTaskDirectory, 'data-2', 'text-2.txt'));


// fs.mkdir(path.join(pathToTaskDirectory, 'data-1'), err => {
//     if (err) throw new Error();
// });
//
// fs.writeFile(path.join(pathToTaskDirectory, 'data-1', 'text.txt'), 'Hello', err => {
//     if (err) throw  new Error();
// })
//
// fs.mkdir(path.join(pathToTaskDirectory, 'data-2'), err => {
//     if (err) throw new Error();
// });
//
// fs.writeFile(path.join(pathToTaskDirectory, 'data-2', 'text.txt'), 'Hello', err => {
//     if (err) throw  new Error();
// })
//
// fs.mkdir(path.join(pathToTaskDirectory, 'data-3'), err => {
//     if (err) throw new Error();
// });
//
// fs.writeFile(path.join(pathToTaskDirectory, 'data-3', 'text.txt'), 'Hello', err => {
//     if (err) throw  new Error();
// })
//
// fs.mkdir(path.join(pathToTaskDirectory, 'data-4'), err => {
//     if (err) throw new Error();
// });
//
// fs.writeFile(path.join(pathToTaskDirectory, 'data-4', 'text.txt'), 'Hello', err => {
//     if (err) throw  new Error();
// })
//
// fs.mkdir(path.join(pathToTaskDirectory, 'data-5'), err => {
//     if (err) throw new Error();
// });
//
// fs.writeFile(path.join(pathToTaskDirectory, 'data-5', 'text.txt'), 'Hello', err => {
//     if (err) throw  new Error();
// })
