const chatBotController = require('../controllers/chat-bot-controller.js');
const utils = require('../utilities/utilities.js');
const textService = require('./text-service')



module.exports = {
    tempFilesTitles : [],
    getUser: function (req) {
        let user = req.body.user;
        if (!user.tempID) {
            return user
        }
        return chatBotController.extractUserFromText(req.body);
    },

    newTempIDAndInitializeRelatedFile: function (botGreeting) {
        const tempID = this.getNewTempID();
        this.createTempFile(tempID, botGreeting);
        return tempID;
    },

    createTempFile: function (title, text) {
        textService.createFile(title, text);
    },

    getNewTempID: function () {
        let tempTitle;
        do {
            tempTitle = utils.getRandomString();
        } while (this.isNotUnique(tempTitle));

        return tempTitle;
    },

    isNotUnique: function (tempTitle) {
        if (this.tempFilesTitles.indexOf(tempTitle) !== -1) {
            return true;
        }
        this.tempFilesTitles.push(tempTitle);
        return false;
    }
};
