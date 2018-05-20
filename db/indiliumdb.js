
//HANDLE DEPENDANCES
var mongoose = require('mongoose');
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
//METHODS
indilium_model.find(function (err, schema_data) {
        if (err) return console.error(err);
        console.log(schema_data);
})
//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
        console.log('CONNECTION SUCCESSFUL');
});
