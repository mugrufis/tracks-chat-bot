//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const textService = require('../services/text-service');
const messageService = require('../services/message-service');
const chatBotService = require('../services/chat-bot-service');
const csvService = require('../services/csv-service');



router.post('/', (req, res) => {
    let botReply = chatBotService.generateBotReply(req);
    const userID = messageService.verifyUserHasID(req);

    textService.addToFile(
        userID,
        messageService.formatUserText(req) + messageService.formatBotText(botReply.text),
        chatBotService.getSpecName(req)
    );

    csvService.addToCSVFile(
      userID,
      messageService.getUserText(req),
      chatBotService.getSpecName(req)
    );

    chatBotService.sendUserTextToWit(messageService.getUserText(req));

    res.send({
        user: messageService.getUser(req),
        specName: botReply.specName,
        text: botReply.text
    });
});

module.exports = router;
