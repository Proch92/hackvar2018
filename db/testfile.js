var mongoose = require('mongoose');

//IMPORT MODELS
require('./models.js').initialize()
var userID = mongoose.model('userID');
var userData_acty = mongoose.model('userData_acty');
var userData_chatbot = mongoose.model('userData_chatbot');

//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
        console.log('CONNECTION SUCCESSFUL');
});

//CREATE A NEW USERID RECORD 
var user1 = new userID({
        chatbot_id      :       '1234', 
        acty_id         :       '4321'
});
user1.save(function(err, user1) {
        if(err) throw err;
});

//CREATE A NEW ACTY RECORD 
var user2 = new userData_acty({
        modello_macchina        :       'xyz',
        tipo_problema           :       'software',
        id                      :       '1234',
        operatore_lv1           :       '1',
        operatore_lv2           :       '2',
        customer_sat            :       'high',
        data                    :       '2018-05-20T17:24:00',
        durata                  :       2600,
        n_foto                  :       5,
        n_video                 :       7
});
user2.save(function(err, user1) {
        if(err) throw err;
});

//CREATE A NEW CHATBOT RECORD 
var user3 = new userData_chatbot({
        modello_macchina        :       'xyz',
        tipo_problema           :       'software',
        id                      :       '1234',
        operatore_lv1           :       '1',
        customer_sat            :       'high',
        data                    :       '2018-05-20T17:24:00',
        durata                  :       2600
});
user3.save(function(err, user1) {
        if(err) throw err;
});

//FINDS THE FIRST ELEMENT IN A SCHEMA THAT SATISFIES THE QUERY
userData_acty.findOne({modello_macchina : 'xyz'}, function (err, data) {
        if (err) return handleError(err);
        console.log('%s\n%s\n%s', data.modello_macchina, data.tipo_problema, data.id);
});

try {
  const results = userData_chatbot.find({});
  console.log(results);
} catch (err) {
  throw err;
}
