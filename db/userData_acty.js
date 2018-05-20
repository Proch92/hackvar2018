//HANDLE DEPENDANCES
var mongoose = require('mongoose');

//SCHEMA DEFINITION
var Schema = mongoose.Schema;

module.exports = function() {
    var userData_acty = new Schema({
        modello_macchina    :   String,
        tipo_problema       :   String,
        tag 				: 	String,
        id 					: 	String,
        operatore_lv1       :   String,
        operatore_lv2       :   String,
        customer_sat        :   String,
        data                :   Date,
        durata              :   Number,
        n_foto 				: 	Number,
        n_video 			: 	Number
    });
    mongoose.model("userData_acty", userData_acty);

    //userData_acty.save(function (err, userData_acty) {
    //    if (err) return console.error(err);
    //  console.log("operation complete")
    //})

    //userData_acty.find(function (err, schema_data) {
    //    if (err) return console.error(err);
    //    return schema_data;
    //})
};