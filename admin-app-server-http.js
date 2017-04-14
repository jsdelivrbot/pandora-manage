var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 8120);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app')));

console.log(path.join(__dirname, 'app'));

app.get("/*", function(req, res, next){

	var ext = req.originalUrl.split('.').pop();

	if(ext == "js" || ext == "css" || ext == "woff" || ext == "ttf") {
		next();
	} else {
		res.sendfile(path.join(__dirname, 'app/index.html'));
	}

});

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
