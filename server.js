// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/config')
var port = process.env.PORT || config.port || 8080;
var database = require('./config/database');config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration
mongoose.connect(database.localUrl);

app.use(express.static('./public'));
app.use('/taggle', express.static(__dirname + '/node_modules/taggle/src'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

// routes
require('./app/routes.js')(app);

// listen (start app with node server.js)
app.listen(port);
console.log("App listening on port " + port);
