// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const util = require('util');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  const date = new Date();
  res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString()
  })
});

app.get('/api/:date?', (req, res) => {
  const date = isNaN(+req.params.date) ? req.params.date : +req.params.date;

  console.log(date, typeof date)
  const dateInMs = new Date(date).getTime()
  return !isNaN(dateInMs) ? res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString()
  }) : res.json({
    error: "Invalid Date"
  })
});

// listen for requests :)
var listener = app.listen(3002, function () {
  console.log('Your app is listening on port ' + 3002);
});
