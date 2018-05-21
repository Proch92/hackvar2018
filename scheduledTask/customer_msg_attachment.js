var program = require('commander');
var momenttz = require("moment-timezone");
var https = require('https');
var fs = require('fs');
var mongoose = require('mongoose');

let request = require('request-promise');
//HANDLE DEPENDANCES
//DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
        console.log('CONNECTION SUCCESSFUL');
});
var userData_acty = mongoose.model("userData_acty", ({
    tag 				: 	String,
    id 					: 	String,
    operatore_lv1       :   String,
    operatore_lv2       :   String,
    customer_sat        :   String,
    data                :   Date,
    durata              :   Number,
    n_foto 				: 	Number,
    n_video 			: 	Number
}));

async function getAttachment(idAssistenza, totAllegati){
    for(var i=0; i<totAllegati; i++){
        var options = {
            url: 'https://api.acty.com/wsapi/assistance/attachment/'+idAssistenza+'/'+i,
            auth: {
              user: '567',
              password: '5kBnnT6gSAIFa40q6ekmDvWE'
            },
            encoding : null
          }
        console.log("getAttachment");
        let a = await request.get(options)
                .then(function(res){
                    console.log('then');
                    const buffer = Buffer.from(res);
                    fs.writeFileSync('../files/'+idAssistenza+'_'+i+'.jpeg',buffer);
                });   
    }
}


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
    postReq.write(postData);
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
    from: program.seconds,
    numrow : 100
};
postJson( program.host, 443, parm, program.user+":"+program.password, "wsapi", "/assistance/list/",
    function(err, httpResul, httpJson) {
        if (err) {
            console.log(err);
        } else {
            httpJson.assistances.forEach(function(element) {
                if(element){
                    //CREATE A NEW ACTY RECORD 
                    var actyUser = new userData_acty({
                        tag 				: 	element.title,
                        id 					: 	element._id,
                        operatore_lv1       :   element.customer_id,
                        operatore_lv2       :   element.operator_id,
                        customer_sat        :   element.rank,
                        data                :   element.date,
                        durata              :   element.duration,
                        n_foto 				: 	element.photos,
                        n_video 			: 	element.videos
                    });
                    console.log('actyUser: '+actyUser);
                    actyUser.save(function (err, actyUser){
                        if (err) return console.error(err);
                            console.log('acty record created')
                    });
                    getAttachment(element._id, (element.photos + element.videos));
                }
            });
        }
});


