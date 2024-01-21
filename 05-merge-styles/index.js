const fs = require('fs');
const path = require('path');

const bundle = path.resolve(__dirname, 'project-dist', 'bundle.css');

// fs.appendFile(bundle, '',(err) => {
//     if (err) throw err;
// });
let data = '';

fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            if (path.extname(file.name) === '.css') {
                const readSrteam = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
                const writeStream = fs.createWriteStream(bundle);
                readSrteam.forEach((chunk) => {
                    data += chunk +'\n';
                    writeStream.write(data)
                })
            }
        })
    }
})

// const xz = async () => {
//     fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
//         if (err)
//             console.log(err);
//         else {
//             files.forEach(file => {
//                 if (path.extname(file.name) === '.css') {
//                     const readSrteam = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
//                     const writeStream = fs.createWriteStream(bundle);
//                     readSrteam.forEach(chunk => {
//                         data += chunk +'\n';
//                         writeStream.write(data)
//                     })
//                 }
//             })
//         }
//     })
// }

// xz()