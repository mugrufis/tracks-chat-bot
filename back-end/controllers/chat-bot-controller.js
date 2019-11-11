'use strict';

module.exports = {
    getWit: function () {

    },
    // todo For a production build these strings should be added to an .env file
    sendToAnalyze: function (textToAnalyze) {
        const q = encodeURIComponent(textToAnalyze);
        const uri = 'https://api.wit.ai/message?q=' + q;
        const auth = 'Bearer ' + 'PKCJ6IOTOVK3KHHX2BDN2AFAKUXDYAQA';
        fetch(uri, {headers: {Authorization: auth}})
            .then(res => res.json())
            .then(res => console.log(res));
    }
};




