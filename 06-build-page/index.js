const fs = require('fs');
const path = require('path');

let template = '';
let dataStyle = '';
const componentsArr = [];
const folderAssets = path.resolve(__dirname, 'assets');
const folderAssetsCopy = path.resolve(__dirname, 'project-dist', 'assets');


fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, (err) => {
        if (err) {
            console.log(err)
            return;
        }
});

const readTemplate = async () => {
    const readSrteam = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
    await readSrteam.forEach(chunk => {
        template += chunk
    })
    return template
}

const getNameHtmlFile = async () => {
    const files = await fs.promises.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true });
    for await (const file of files) {
        if (path.extname(file.name) === '.html') {
            componentsArr.push(path.basename(file.name, '.html'));
        }
    }
    return componentsArr
}

const changeTemplate = async () => {
    for await (let componentsName of componentsArr) {
        let templateComponents = '';
        const readSrteamComponents = fs.createReadStream(path.resolve(__dirname, 'components', `${componentsName}.html`), 'utf-8');
        await readSrteamComponents.forEach(chunk => {
            templateComponents += chunk;
        })
        template = template.split(`{{${componentsName}}}`).join(`${templateComponents}`)
    }
    return template
}

const createHtml = async () => {
    await readTemplate()
    await getNameHtmlFile()
    await changeTemplate();
    const output = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
    output.write(template)
}

const createStyle = () => {
    fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                if (path.extname(file.name) === '.css') {
                    const readSrteam = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
                    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
                    readSrteam.forEach((chunk) => {
                        dataStyle += chunk + '\n';
                        writeStream.write(dataStyle)
                    })
                }
            })
        }
    })
}
const copyAssets = async (from, to) => {
    await fs.promises.rm(to, { recursive: true, force: true }, (err) => {
        if (err) {
            console.log(err);
        }
    });
    fs.mkdir(to, { recursive: true }, (err) => {
            if (err) {
                console.log(err)
                return;
            }
    });
    fs.readdir(from, { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                fs.stat(path.resolve(from, file.name), (err, stats) => {
                    if (err) {
                        console.log(err)
                    }
                    if (!stats.isDirectory()) {
                        fs.copyFile(path.resolve(from, file.name), path.resolve(to, file.name), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    } else {
                        copyAssets(path.resolve(from, file.name), path.resolve(to, file.name))
                    }
                })
            })
        }
    })
}

createHtml()
createStyle();
copyAssets(folderAssets, folderAssetsCopy)