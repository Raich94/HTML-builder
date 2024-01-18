const fs = require('fs');
const path = require('path');

fs.readdir(
    path.resolve(__dirname, 'secret-folder'),
    { withFileTypes: true },
    (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()) {
            fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
            if (err) {
                console.log(err);
            }
            const name = path.parse(path.resolve(__dirname, 'secret-folder', file.name)).name;
            const ext = path.extname(file.name).slice(1);
            const size = stats.size / 1000;
            console.log(`${name} - ${ext} - ${size}kb`);
            });
        }
      })
    }
  })