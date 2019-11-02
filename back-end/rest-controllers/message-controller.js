//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const textController = require('../file-controllers/text-controller.js');


//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    res.send("GET");
});

//POST HTTP method to /bucketlist

// todo Model the response??
router.post('/', (req,res,next) => {
    res.send("POST");
    textController.newFile(req.body.user,
        req.body.timestamp + ' User:' + req.body.user + " said:" + req.body.text
        );
});

//DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    res.send("DELETE");

});

module.exports = router;
