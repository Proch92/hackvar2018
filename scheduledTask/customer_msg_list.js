var program = require('commander');
var momenttz = require("moment-timezone");
var https = require('https');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/indilium-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
        console.log('CONNECTION SUCCESSFUL');
});
var userData_actyMsg = mongoose.model("userData_actyMsg", ({
    id 					: 	String,
    from_oper : Boolean,
    operatore_lv1       :   String,
    data                :   Date,
    text              :   String
}));

function postJson(host, port, persistentObj, auth, prefix, url, done) {
    var postData = JSON.stringify(persistentObj);
    debug("postData: ", postData);
    // request option
    var options = {
        host: host,
        port: port,
        method: 'POST',
        path: "/"+prefix+url,
        headers: {
            "Content-type": "application/json",
            'Content-Length': postData.length
        }
    };
    if (auth) {
        options.auth = auth;
    }

    var resString = '';
    var postReq = https.request(options,  function (httpRes) {
        debug("statusCode: ", httpRes.statusCode);

        httpRes.on('data', function (chunk) {
            debug("data");
            resString += chunk;
        });
        httpRes.on('end', function () {
            debug(resString);
            try {
                var retJson = JSON.parse(resString);
            } catch (e) {}
            done(null, httpRes.statusCode, retJson);
        });
    });

    postReq.on('error', function(err)  {
        debug('ERROR failed post into permitted:'+err.message);
        done(err);
    });
    postReq.write(postData); // even tried to add 'utf8' as second parameter
    postReq.end();
}

program
    .option('-v, --verbose', 'Enable verbose')
    .option('-w, --veryverbose', 'More verbose')
    .option('-h, --host <host>', 'Host to make call (default api.acty.com)')
    .option('-u, --user <api_user>', 'User for api authentication')
    .option('-p, --password <api_password>', 'Password for api authentication')
    .arguments('<seconds>')
    .action(function (seconds, cmd) {
        cmd.seconds = seconds;
    })
    .parse(process.argv);

var async = require("async");

var debug = require("debug")("acty:customer_msg_send");

var logger = {
    debug: debug,
    error: debug,
    info: debug
}

var winstonFile = {};

var jsonStringify = require('json-pretty');

if (program.veryverbose) {program.verbose = true;};
if (!program.host) {program.host = "api.acty.com"};
if (!program.user) {console.log("Api user mandatory (-u)");process.exit(1);}
if (!program.password) {console.log("Api password mandatory (-p)");process.exit(1);}
if (!program.seconds) {console.log("seconds mandatory ");process.exit(1);}

var parm = {
    from_now: program.seconds,
    numrow : 100
};
postJson( program.host, 443, parm, program.user+":"+program.password, "wsapi", "/customer/msg/list/",
    function(err, httpResul, httpJson) {
        if (err) {
            console.log(err);
        } else {
            console.log(httpResul);
            //console.log(jsonStringify(httpJson));
		httpJson.messages.forEach(function(element) {
		if(element){
		    //CREATE A NEW ACTY RECORD 
		    var actyUser = new userData_actyMsg({
			    id : 	element._id,
			    from_oper : element.from_oper,
			    operatore_lv1       :   element.customer.customer_id,
			    data                :   element.date,
			    text              :   element.text
		    });
		    actyUser.save(function (err, actyUser){
		        if (err) return console.error(err);
		            console.log('acty record created');
		    });
		}
            });
        }
});
        //process.exit(0);

//node customer_msg_list.js -u 567 -p 5kBnnT6gSAIFa40q6ekmDvWE -h api.acty.com 86400

//node customer_msg_attachment.js -u 567 -p 5kBnnT6gSAIFa40q6ekmDvWE -h api.acty.com 86400
