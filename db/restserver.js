var restify = require('restify');
const mongoose = require('mongoose');
const assert = require('assert');

//IMPORT MODELS
require('./models.js').initialize();
var UserID = mongoose.model('userID');
//var UserData_acty = mongoose.model('userData_acty');
var UserData_chatbot = mongoose.model('userData_chatbot');
var userData_acty = mongoose.model("userData_acty", ({
    tag 				: 	String,
    id 					: 	String,
    operatore_lv1       :   String,
    operatore_lv2       :   String,
    customer_sat        :   String,
    data                :   Date,
    durata              :   Number,
    n_foto 				: 	Number,
    n_video 			: 	Number
}));

mongoose.connect('mongodb://127.0.0.1:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connection made')
});

//RESTIFY
function insertUser(req, res, next) {
	newuser = new UserID({chatbot_id: req.params.sparkid, acty_id: req.params.actyid});
	newuser.save().then(() => console.log('new User created'));
	
	res.send(201);
	next();
}

function insertActy(req, res, next) {
	newacty = new userData_acty({
		tag				: 	req.params.tagapi,
		id 				: 	req.params.idapi,
		operatore_lv1 	: 	req.params.op1api,
		operatore_lv2 	: 	req.params.op2api,
		customer_sat 	: 	req.params.custapi,
		data 			: 	req.params.dataapi,
		durata 			: 	req.params.durapi,
		n_foto 			: 	req.params.fotoapi,
		n_video 		: 	req.params.videoapi 
	});
	newacty.save().then(() => console.log('acty record created'));

	res.send(201);
	next();
}

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.post('/users:sparkid:actyid', insertUser);
server.post('/acty:tagapi:idapi:op1api:op2api:custapi:dataapi:durapi:fotoapi:videoapi', insertActy);

server.listen(8080, '0.0.0.0', function() {
	console.log('%s listening at %s', server.name, server.url);
});