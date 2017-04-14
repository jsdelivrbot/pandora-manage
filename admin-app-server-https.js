var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');
var https = require('https');
var http = require('http');

var app = express();

var options = {
  key: fs.readFileSync('/usr/local/sslcerts/cert.key'),
  cert: fs.readFileSync('/usr/local/sslcerts/cert.crt')
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app')));

console.log(path.join(__dirname, 'app'));

app.get("/*", function(req, res, next){

  var ext = req.originalUrl.split('.').pop();

  if(ext == "js" || ext == "css") {
    next();
  } else {
    res.sendfile(path.join(__dirname, 'app/index.html'));
  }

});

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
