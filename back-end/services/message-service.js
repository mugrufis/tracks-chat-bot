module.exports = {
    getUserID: function (req) {
        return req.body.user.id;
    },
    getUserText: function (req) {
        return req.body.text;
    },
    formatBotText: function (botText) {
        return new Date() + ' ' + "Bot: " + botText + "\n";
    },
    formatUserText: function (req) {
        if (!req.body.text) return '';
        return new Date(req.body.date) + ' ' + this.getUserID(req) + ': ' + req.body.text + "\n";
    }


};
