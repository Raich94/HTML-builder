const fs = require('fs');
const path = require('path');

const readSrteam = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

readSrteam.on('data', data => console.log(data));