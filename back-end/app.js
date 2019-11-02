const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// app.get('/', (req, res) => res.send('<h1 style="text-align: center">Invalid Page!</h1>'));

app.listen(port, () => console.log(`Example app listening on port ${port}!!!`));

//Middleware for CORS
app.use(cors());
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server dist folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, ('..') , 'front-end-dist')));

//Routing all HTTP requests to /aRoute to a controller
const messageController = require('./rest-controllers/message-controller');
 app.use('/message', messageController);
