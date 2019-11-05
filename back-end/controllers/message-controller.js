//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const textService = require('../services/text-service.js');
const messageService = require('../services/message-service');

let botResponse = "To add actual bot response";

router.post('/', (req, res) => {
    textService.addToFile(
        messageService.getUserID(req),
        messageService.formatUserText(req) + messageService.formatBotText(botResponse)
    );

    res.send({
        text: botResponse
    });
});

module.exports = router;
