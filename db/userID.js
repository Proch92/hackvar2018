//HANDLE DEPENDANCES
var mongoose = require('mongoose');

//SCHEMA DEFINITION
var Schema = mongoose.Schema;

module.exports = function() {
	var userID = new Schema({
    	chatbot_id 	: 	String,
        acty_id 	:   String
	});
	mongoose.model("userID", userID);

	userID.save(function (err, userID) {
        if (err) return console.error(err);
        console.log("operation complete")
	})
};