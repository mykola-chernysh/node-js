const path = require('path');
const fs = require('fs');

const pathToTaskDirectory = path.join(__dirname, 'data');

fs.mkdir(pathToTaskDirectory, err => {
    if (err) throw new Error();
});

function createDirectoryAndFiles(directoryNumber, directoryName, fileName, fileData) {
    for (let i = 1; i <= directoryNumber; i++) {
        let nameDir = `${directoryName}-${i}`;
        let nameFile = `${fileName}-${i}.txt`;
        let dataFile = `${fileData}-${i}`;

        fs.mkdir(path.join(pathToTaskDirectory, nameDir), err => {
            if (err) throw new Error();
        });

        fs.writeFile(path.join(pathToTaskDirectory, nameDir, nameFile), dataFile, err => {
            if (err) throw new Error();
        })
    }
}

function isDirectoryOrFile() {
    const pathToCheck = getFiles(pathToTaskDirectory);

    for (let i = 0; i < pathToCheck.length; i++) {
        const normPath = path.normalize(pathToCheck[i]);

        fs.stat(normPath, (err, stats) => {
            if (err) throw err;

            if (stats.isFile()) {
                console.log(`File: ${path.basename(normPath)}`);
            } else if (stats.isDirectory()) {
                console.log(`Directory: ${path.basename(normPath)}`);
            }
        })
    }
}

function getFiles(pathToCheckDir, files = []) {
    const fileList = fs.readdirSync(pathToCheckDir)

    for (const file of fileList) {
        const name = path.join(pathToCheckDir, file)

        if (fs.statSync(name).isDirectory()) {
            files.push(name);
            getFiles(name, files)
        } else {
            files.push(name)
        }
    }

    return files
}

createDirectoryAndFiles(5, 'data', 'text', 'Hello world');
isDirectoryOrFile();


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
