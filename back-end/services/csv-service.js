const fs = require('fs');
const path = require('path');
const chatBotSpecs = require("../utilities/chat-bot-specs");

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
    addToCSVFile: function (title, text, specName) {
        if (!this.isSpec(specName)) return;

        if (this.fileExists(title)) {
            let editedText = text;
            if (this.isFirstSpec(specName)) {
                editedText = "\n" + editedText;
            } else {
                editedText = "," + editedText;
            }
            this.appendToFile(title, editedText);
        } else {
            const startingText = this.createCSVHeaders() + text;
            this.createFile(title, startingText);
        }
    }, appendToFile: (title, text) => {
        fs.appendFile(pathToFile(title), text, function (err) {
            if (err) throw err;
            console.log(title + ' updated');
        });
    },
    createCSVHeaders: function () {
        return this.getSpecNames().join() + "\n";
    },
    fileExists: function (title) {
        return fs.existsSync(pathToFile(title));
    },
    isSpec: function (specName) {
        if (this.getSpecNames().indexOf(specName) !== -1) {
            return true;
        }
    },
    getSpecNames: function () {
        let specNames = [];
        for (let spec of chatBotSpecs.specifications) {
            specNames.push(spec.name);
        }
        specNames.pop();
        return specNames;
    },
    getSpecPosition: function (specName) {
        return this.getSpecNames().indexOf(specName);
    },
    isFirstSpec: function (specName) {
        if (this.getSpecPosition(specName) === 0) {
            return true;
        }
    }
};

function pathToFile(title) {
    return path.join(__dirname, ('..'), 'files', title + '.csv');
}

