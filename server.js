// set up
var express = require('express');
var app = express();
var config = require('./config/config.js')
var port = process.env.PORT || config.port;
var morgan = require('morgan');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect(config.db_url, (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(port, () => {
		console.log("App listening on port " + port);
	})
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
	db.collection('memes').find().toArray((err, result) => {
		if (err) return console.log(err)
		res.render('index.ejs', {memes: result})
	})
})

app.post('/memes', (req, res) => {
	db.collection('memes').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to database')
		res.redirect('/')
	})
})