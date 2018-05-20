var restify = require('restify');
const mongoose = require('mongoose');
const assert = require('assert')
//require('models.js').initialize();
const User = require('userID')

mongo.connect('mongodb://localhost:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('successful')
});

function insertUser(req, res, next) {
	newuser = new User({})
	
	res.send(201);
	next();
}

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.post('/users', insertUser);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});