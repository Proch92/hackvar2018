//HANDLE DEPENDANCES
var mongoose = require('mongoose');

//SCHEMA DEFINITION
var Schema = mongoose.Schema;

module.exports = function() {
	var userData = new Schema({
    	modello_macchina 	: 	String,
        tipo_problema 		:   String,
        operatore_lv1 		:   String,
        operatore_lv2 		:   String,
        bot 				:   Boolean,
        customer_sat 		:   String,
        data 				:   Date,
        durata 				:   Number
	});
	mongoose.model("userData", userData);

	userData.save(function (err, userData) {
        if (err) return console.error(err);
        console.log("operation complete")
	})

	userData.find(function (err, schema_data) {
        if (err) return console.error(err);
        return schema_data;
	})
};