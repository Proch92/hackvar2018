var models = ['userData.js', 'userId.js'];

exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])();
    }
};

//To inizialize all schemas for a given node session:
//		require('models.js').initialize()
//
//To get a model:
//		var myModel = mongoose.model( "myModel" );