const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
// todo For a production build add to an .env file
const port = 3000;


// app.get('/', (req, res) => res.send('<h1 style="text-align: center">Invalid Page!</h1>'));

app.listen(port, () => console.log(`Example app listening on port ${port}!!!`));

//Middleware for CORS
app.use(cors());

// Parses rest call body as json automatically
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server dist folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, ('..') , 'front-end-dist')));

//Routing all HTTP requests to /aRoute to a controller
const messageController = require('./controllers/message-controller');
 app.use('/message', messageController);

let Wit = null;
let interactive = null;
try {
 // if running from repo
 Wit = require('../').Wit;
 interactive = require('../').interactive;
} catch (e) {
 Wit = require('node-wit').Wit;
 interactive = require('node-wit').interactive;
}

const accessToken = (() => {
 if (process.argv.length !== 3) {
  console.log('No wit access token passed');
  process.exit(1);
 }
 return process.argv[2];
})();

const client = new Wit({accessToken});
interactive(client);
