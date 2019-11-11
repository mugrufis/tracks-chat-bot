const chatBotController = require("../controllers/chat-bot-controller");
const chatBotSpecs = require("../utilities/chat-bot-specs");
const messageService = require('./message-service');

module.exports = {
    generateBotReply: function (req) {

        if (this.isDialogStart(req)) {
            return this.initialReply(req, true)
        }
        if (this.isFinalQuestion(req)) {
            return this.handleFinalQuestionReply(req);
        }

        // here can be added a function call to check if the value provided by the user is valid
        if (false) {
            const sameQuestion = this.getSameQuestion(req);
            // if invalid tell the user why
            sameQuestion.text = 'reason for rejection \n' + sameQuestion.text;
            return sameQuestion;
        }

        return this.getNextQuestion(req);
    },
    handleFinalQuestionReply: function (req) {
        if (messageService.getUserText(req).toLowerCase() === "y" || messageService.getUserText(req) === "restart") {
            return this.initialReply(req);
        }
        return this.formatReplyObject(chatBotSpecs.goodbye, "goodbye");
    },
    isFinalQuestion: function (req) {
        if (this.getSpecName(req) === "restart" || this.getSpecName(req) === "goodbye") {
            return true;
        }
    },
    initialReply: function (req, withGreeting) {
        const greeting = (withGreeting) ? this.generateBotGreeting() : '';
        return this.formatReplyObject(
            greeting + this.formatQuestionFromSpec(chatBotSpecs.specifications[0]),
            chatBotSpecs.specifications[0].name
        )
    },
    isDialogStart: function (req) {
        if (!messageService.getUserText(req) && !this.getSpecName(req)) {
            return true
        }
    },
    getNextQuestion: function (req) {
        const specs = chatBotSpecs.specifications;
        for (let i = 0; i < specs.length; i++) {
            if (this.getSpecName(req) === specs[i].name) {
                return this.formatReplyObject(this.formatQuestionFromSpec(specs[i + 1]), specs[i + 1].name);
            }
        }
    },
    getSameQuestion: function (req) {
        const specs = chatBotSpecs.specifications;
        for (let i = 0; i < specs.length; i++) {
            if (this.getSpecName(req) === specs[i].name) {
                return this.formatReplyObject(this.formatQuestionFromSpec(specs[i]), specs[i].name);
            }
        }
    },
    getSpecName: function (req) {
        return req.body.specName;
    }
    ,
    sendUserTextToWit: function (userText) {
        if (!userText) return;
        chatBotController.sendToAnalyze(userText);
    },
    generateBotGreeting: function () {
        return chatBotSpecs.greeting;
    },
    formatReplyObject: function (text, specName) {
        return {
            text,
            specName
        }
    },
    formatQuestionFromSpec: function (spec) {
        if (spec.name === "restart") return spec.text;

        let question = 'What is the trucks ';
        question += spec.name;
        if (spec.unit) question += "(in " + spec.unit + ")";
        question += "?";
        return question;
    }
}
;
