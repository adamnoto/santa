// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser());
app.use(morgan());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/", (request, response) => {
  response.send("Got a POST you sure?")
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
