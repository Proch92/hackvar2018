var mongoose = require('mongoose');

require('./models.js').initialize()
var userID = mongoose.model('userID');

//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
        console.log('CONNECTION SUCCESSFUL');
});

var user1 = new userID({chatbot_id: '1234', acty_id: '4321'});
user1.save(function(err) {
        if(err) throw err;
});
