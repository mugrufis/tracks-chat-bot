const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports = {
// writeFile function with filename, content and callback function
    newFile: (title, text) => {
        fs.writeFile(__dirname + '/../files/' +title + '.txt', text, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
    }
};
