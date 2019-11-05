const fs = require('fs');
const path = require('path');

module.exports = {
    createFile: (title, text) => {
        fs.writeFile(
            pathToFile(title),
            text,
            function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
    },
    appendToFile: (title, text) => {
        fs.appendFile(pathToFile(title), text, function (err) {
            if (err) throw err;
            console.log(title + ' updated');
        });
    },
    deleteFile: (title) => {
        fs.unlinkSync(pathToFile(title), (err) => {
            if (err) throw err;
            console.log(title + ' was successfuly deleted');
        });
    },
    readFile: function (title) {
        fs.readFile(pathToFile(title), {encoding: 'utf-8'}, function (err, data) {
            if (err) throw err;
            return data;
        });
    },
    addToFile: function (title, text) {
        if (this.fileExists(title)) {
            this.appendToFile(title, text);
        } else {
            this.createFile(title, text);
        }

    },
    fileExists: function (title) {
       if (fs.existsSync(pathToFile(title))) return true;
       return false;
    }
};

function pathToFile (title) {
    return path.join(__dirname, ('..'), 'files', title + '.txt');
}
