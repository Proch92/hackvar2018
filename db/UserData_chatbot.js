//HANDLE DEPENDANCES
var mongoose = require('mongoose');

//SCHEMA DEFINITION
var Schema = mongoose.Schema;

module.exports = function() {
    var userData_chatbot = new Schema({
        modello_macchina    :   String,
        tipo_problema       :   String,
        tag                 :   String,
        id                  :   String,
        operatore_lv1       :   String,
        customer_sat        :   String,
        data                :   Date,
        durata              :   Number,
    });
    mongoose.model("userData_chatbot", userData_chatbot);

    userData.save(function (err, userData_chatbot) {
        if (err) return console.error(err);
        console.log("operation complete")
    })

    userData.find(function (err, schema_data) {
        if (err) return console.error(err);
        return schema_data;
    })
};