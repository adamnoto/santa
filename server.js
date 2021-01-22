// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const { User } = require("./user");

app.set("view engine", "ejs");
app.use(bodyParser());
app.use(morgan());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', (request, response) => {
  const accepted = request.app.get("accepted");
  const user = request.app.get("user")

  response.render("pages/index", {
    accepted: accepted,
    user: user,
  });

  request.app.set("accepted", undefined);
  request.app.set("user", undefined);
});

app.post("/", (request, response) => {
  const userName = request.body.username;
  const wish = request.body.wish;
  User.findByUsername(userName).then((user) => {
    request.app.set("accepted", user.canReceivePresent());
    request.app.set("user", user);
    response.redirect("/");
  }).catch((reason) => {
    // we may handle this and report error to centralized
    // error system such as Sentry
    request.app.set("accepted", false);
    response.redirect("/");
  })
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

