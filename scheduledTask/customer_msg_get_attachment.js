var https = require('https');
var program = require('commander');
var momenttz = require("moment-timezone");
var request = require('request');
var fs = require('fs');
var actyTicket = require('../db/userData_acty.js');

//5b016d2caa1623ed3602d6c9/0
function getAttachment(idAssistenza, idAllegato){
    request('https://api.acty.com/wsapi/assistance/attachment/'+idAssistenza+'/'+idAllegato+'/').auth('567', '5kBnnT6gSAIFa40q6ekmDvWE', false).pipe(fs.createWriteStream('../files/'+idAssistenza+'_'+idAllegato));
}

function postJson(host, port, persistentObj, auth, prefix, url, done) {
    var postData = JSON.stringify(persistentObj);
    debug("postData: ", postData);
    // request option
    var options = {
        host: host,
        port: port,
        method: 'GET',
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
    //from: program.seconds,
    //numrow : 100
};
postJson( program.host, 443, parm, program.user+":"+program.password, "wsapi", "/assistance/attachment/5b016d2caa1623ed3602d6c9/0",
    function(err, httpResul, httpJson) {
        if (err) {
            console.log(err);
        } else {
            //console.log(httpResul);
            //console.log(jsonStringify(httpJson));
            //getAttachment(httpJson, 'aaa')
            if(httpJson){
                httpJson.assistances.forEach(function(element) {
                    console.log(element._id);
                    getAttachment();
                });
            }
        }
        process.exit(0);
});


//node customer_msg_list.js -u 567 -p 5kBnnT6gSAIFa40q6ekmDvWE -h api.acty.com 1000

//node customer_msg_list.js -u 567 -p 5kBnnT6gSAIFa40q6ekmDvWE -h api.acty.com 86400
