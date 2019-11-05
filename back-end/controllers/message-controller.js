//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const textController = require('../services/text-service.js');
const messageService = require('../services/message-service')

let botGreeting = "To add bot greeting message";


// This method is called only when a user enters the chat
// Sends a greeting along with a temporary ID until the user is identified
router.get('/', (req, res) => {
    res.send(
        {
            text: botGreeting,
            user: {
                tempID: messageService.newTempIDAndInitializeRelatedFile(botGreeting)
            }
        });
});

router.post('/', (req, res, next) => {
    const userID = messageService.getUserID(req);
    textController.appendToFile(user,
        req.body.date + ' ' + user + ' ' + req.body.text
        );

    res.send({
        text: "To add actual bot response",
        user: user
    });
});

module.exports = router;
