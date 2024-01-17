const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.resolve(__dirname, 'destination.txt'));

fs.writeFile(
    path.join(__dirname, 'destination.txt'), '', (err) => {
      if (err) throw err;
    },
);

stdout.write('Hello, enter text:\n');

stdin.on('data', (data) => {
    if (data.toString().trim() === 'exit') {
        process.exit();
    }
    fs.appendFile(
        path.join(__dirname, 'destination.txt'),
        data.toString(),
        (err) => {
        if (err) throw err;
      });
})

process.on('SIGINT', () => process.exit())
process.on('exit', () => stdout.write("\nGoodbye!"));