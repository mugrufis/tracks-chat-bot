const fs = require('fs');
const path = require('path');

module.exports = {
    createFile: (title, text) => {
        fs.writeFile(
            pathToFile(title),
            new Date + ' Bot ' + text,
            function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
    },
    appendToFile: (title, text) => {
        fs.appendFile(pathToFile(title), text, function (err) {
            if (err) throw err;
            console.log(title +' updated');
        });
    },
    deleteFile: (title) => {
        fs.unlinkSync(pathToFile(title), (err) => {
            if (err) throw err;
            console.log(title +' was successfuly deleted');
        });
    },
    concatFile: (fromTitle, toTitle) => {
        this.readFile(fromTitle).then((data) => {
            this.appendToFile(toTitle, data)
        })
    },
    readFile: function (title) {
        fs.readFile(pathToFile(title), {encoding: 'utf-8'}, function (err, data) {
            if (err) throw err;
            return data;
        });
    }
};

function pathToFile(title) {
    return __dirname + '/../files/' + title + '.txt';
}
