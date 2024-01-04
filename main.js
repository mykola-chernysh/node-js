const path = require('path');
const fs = require('fs');

const pathToTaskDirectory = path.join(__dirname, 'data');

fs.mkdir(pathToTaskDirectory, err => {
    if (err) throw new Error();
});

function createDirectory(directoryNumber, nameDirectory) {

    for (let i = 1; i <= directoryNumber; i++) {
        fs.mkdir(path.join(pathToTaskDirectory, `${nameDirectory}-${i}`), err => {
            if (err) throw new Error();
        });

        fs.writeFile(path.join(pathToTaskDirectory, `${nameDirectory}-${i}`, 'text.txt'), 'Hello', err => {
            if (err) throw new Error();
        })
    }

}

createDirectory(5, 'data');

//
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
