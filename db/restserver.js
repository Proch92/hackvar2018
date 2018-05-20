var restify = require('restify');
//var db = require('indiliumdb');
//var db = require('usersdb');

function insertUser(req, res, next) {
	params = req.query;
	//save to db
	res.send(201);
	next();
}

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.post('/users', insertUser);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});