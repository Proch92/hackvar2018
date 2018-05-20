//HANDLE DEPENDANCES
var mongoose = require('mongoose');

//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
        console.log('CONNECTION SUCCESSFUL');
});

//SCHEMA DEFINITION
var Schema = mongoose.Schema;
var indiliumSchema = new Schema({
        modello_macchina:       String,
        tipo_problema:          String,
        operatore_lv1:          String,
        operatore_lv2:          String,
        bot:                    Boolean,
        customer_sat:           String,
        data:                   Date,
        durata:                 Number
});

//MODEL DEFINITION
var indilium_model = mongoose.model('Indilium', indiliumSchema);

var test = new indilium_model({
        modello_macchina:       'xz1',
        tipo_problema:          'software',
        operatore_lv1:          '1234',
        operatore_lv2:          '',
        bot:                    1,
        customer_sat:           'high',
        data:                   '2018-05-20T13:00:00',
        durata:                 267 
});

test.save(function (err, test) {
        if (err) return console.error(err);
        console.log("operation complete")
})

//METHODS
indilium_model.find(function (err, schema_data) {
        if (err) return console.error(err);
        return schema_data;
})