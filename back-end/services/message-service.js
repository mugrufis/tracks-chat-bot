const utils = require("../utilities/utilities");

module.exports = {
    getUserID: function (req) {
       return this.getUser(req).id;
    },
    getUser: function (req) {
        return req.body.user;
    },
    getUserText: function (req) {
        return req.body.text;
    },
    formatBotText: function (botText) {
        return new Date() + ' ' + "Bot: " + botText + "\n";
    },
    formatUserText: function (req) {
        if (!req.body.text) return '';
        return new Date(req.body.date) + ' ' + this.getUserID(req) + ': ' + this.getUserText(req) + "\n";
    },
    assignNewIDToUser: function (req, newID) {
         this.getUser(req).id = newID;
        return newID;
    },
    verifyUserHasID(req) {
        if (this.getUserID(req)) return this.getUserID(req);
        return this.assignNewIDToUser(req, utils.generateUniqueId());
    },
    getQuestionNumber(req) {
        return req.body.questionNumber
    }

};
