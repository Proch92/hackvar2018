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
var userSchema = new Schema({
        bot_id:                 String,
        acty_id:                String,
});

//MODEL DEFINITION
var indilium_model = mongoose.model('Indilium', indiliumSchema);

//METHODS
indilium_model.find(function (err, schema_data) {
        if (err) return console.error(err);
        return schema_data;
})