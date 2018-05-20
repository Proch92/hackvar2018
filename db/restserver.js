var restify = require('restify');
const mongoose = require('mongoose');
const assert = require('assert')
require('models.js').initialize();

const url = "mongodb://localhost:27017/indilium-db";

function insertUser(req, res, next) {

	
	res.send(201);
	next();
}

mongo.connect('mongodb://localhost:27017/indilium-db');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('successful')
});

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.post('/users', insertUser);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});