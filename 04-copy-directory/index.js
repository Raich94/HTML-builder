const fs = require('fs');
const path = require('path');

const folderFiles = path.join(__dirname, 'files');
const folderFilesCopy = path.join(__dirname, 'files-copy');

const copyFolder = async () => {
    await fs.promises.rm(folderFilesCopy, { recursive: true, force: true }, (err) => {
        if (err) {
            console.log("Error Found:", err);
        }
    });
    fs.mkdir(folderFilesCopy,
        { recursive: true },
        (err) => {
            if (err) {
                console.log(err)
                return;
            }
    });
    fs.readdir(folderFiles, { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                const originalFile = path.join(__dirname, 'files', file.name);
                const copylFile = path.join(__dirname, 'files-copy', file.name);
                fs.copyFile(originalFile, copylFile, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            })
        }
    })
}

copyFolder()