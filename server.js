// setup the server reqs
var express    = require('express');
var app        = express();
var morgan     = require('morgan');
var bodyParser = require('body-parser');
const config   = require('./config/config.js');
const port     = process.env.PORT || config.port;

// set up the grid filesystem
var fs = require('fs');
var multer = require('multer');
var dirname = require('path').dirname(__dirname);
var Grid = require("gridfs-stream");
var gridfs;

// establish db connection
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
var db;

MongoClient.connect(config.db.url, (err, client) => {
	if (err) return console.log(err);

	db = client.db(config.db.name);
	gridfs = Grid(client.db(config.db.fs_name), mongo);

	app.listen(port, () => {
		console.log("App listening on port " + port);
	})
})

// set app guidelines
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname +'/images'));
app.use(multer({dest: './images/'}).any());

// route requests around
app.get('/', (req, res) => {
	db.collection('memes').find().toArray((err, result) => {
		if (err) return console.log(err);
		res.render('index.ejs', {memes: result});
	})
})

app.post('/memes', (req, res) => {
	db.collection('memes').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to database');
		res.redirect('/');
	})
})

app.all('/upload', (req ,res) => {
	var filename = req.files.file.name;
	var path = req.files.file.path;
	var type = req.files.file.mimetype;

	var writestream = gridfs.createWriteStream({
		filename: filename
	});

	var read_stream = fs.createReadStream(dirname + '/' + path);
	read_stream.pipe(writestream);
});

app.get('/file/:id', (req,res) => {
	var pic_id = req.param('id');

	gridfs.files.find({filename: pic_id}).toArray(function (err, files) {

		if (err) {
			res.json(err);
		}
		if (files.length > 0) {
			var mime = 'image/jpeg';
			res.set('Content-Type', mime);
			var read_stream = gridfs.createReadStream({filename: pic_id});
			read_stream.pipe(res);
		} else {
			res.json('File Not Found');
		}
	});
});