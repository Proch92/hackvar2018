var program = require('commander');
var momenttz = require("moment-timezone");
var https = require('https');
<<<<<<< Updated upstream
//var request = require('request');
var fs = require('fs');
var mongoose = require('mongoose');
let request = require('request-promise');
//var actyTicket = require('../db/userData_acty.js');
//HANDLE DEPENDANCES
//DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/indilium-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
        console.log('CONNECTION SUCCESSFUL');
});
var userData_acty = mongoose.Schema({
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


//var userData_acty = mongoose.model('Kitten', kittySchema);
var modelUserData_acty = mongoose.model("userData_acty", userData_acty);
=======
var request = require('request');
var fs = require('fs');
//var actyTicket = require('../db/userData_acty.js');
//HANDLE DEPENDANCES
var mongoose = require('mongoose');

//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/indilium-db');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
//db.once('open', function() {
//        console.log('CONNECTION SUCCESSFUL');
//});
>>>>>>> Stashed changes

//SCHEMA DEFINITION
//var Schema = mongoose.Schema;
/*
var userData_acty = new Schema({
    tag 				: 	String,
    id 					: 	String,
    operatore_lv1       :   String,
    operatore_lv2       :   String,
    customer_sat        :   String,
    data                :   Date,
    durata              :   Number,
    n_foto 				: 	Number,
    n_video 			: 	Number
<<<<<<< Updated upstream
});
=======
});*/
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    
=======
    /*
>>>>>>> Stashed changes

        Modello Macchina 
        Tipo Problema (Hardware/Software) 

        Tag - Title
        Operatore 1° Livello  - .customer_id
        Operatore 2° Livello  - operator
        Durata intervento  - customer_id
        Customer Satisfaction - Rank
        Data
        Id
        Numero Attachment Photo
        Numero Attachment Video

    */
<<<<<<< Updated upstream
//5b016d2caa1623ed3602d6c9/0
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
    //../files/'+
    //console.log(tmp);
    
}
    //request(options).pipe(fs.createWriteStream('../files/'+idAssistenza+'/'+idAllegato));
    //console.log("options: "+options);
    /*request.get(options)
    .on('response',function(err, res, body) {
         console.log(response.statusCode) // 200 
         body.pipe(fs.createWriteStream('../files/'+idAssistenza+'/'+idAllegato));
     })
     .on('finish',function(err, res, body) {
        console.log('finish'+response.statusCode) // 200 
        body.pipe(fs.createWriteStream('../files/'+idAssistenza+'/'+idAllegato));
    });
    let tmp = new Promise(resolve =>
        request(options)
          .pipe(fs.createWriteStream('../files/'+idAssistenza+'/'+idAllegato+'.png'))
          .on('finish', resolve));
     //request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);

=======

//5b016d2caa1623ed3602d6c9/0
function getAttachment(idAssistenza, idAllegato){
    //../files/'+
    //console.log(tmp);
    var options = {
        url: 'https://api.acty.com/wsapi/assistance/attachment/'+idAssistenza+'/'+idAllegato,
        auth: {
          user: '567',
          password: '5kBnnT6gSAIFa40q6ekmDvWE'
        }
      }
    console.log("troia");

    request.get(options)
    .on('response', function(err, res, body) {
         console.log(response.statusCode) // 200 
         body.pipe(fs.createWriteStream('../files/'+idAssistenza+'/'+idAllegato));
     });
>>>>>>> Stashed changes
    /*request(options, function (err, res, body) {
        if (err) {
          console.log("err: "+err);
          return;
        }
<<<<<<< Updated upstream
    })*/
  /*
=======
        console.dir('headers', res.headers);
        console.dir('status code', res.statusCode);
        //console.dir(body)
        console.log("response: "+response);
        console.log("body: "+body);
        body.pipe(fs.createWriteStream('../files/'+idAssistenza+'/'+idAllegato));
 
    })*/
  
   /* request.get(
        { url: tmp,
            {'auth': {
                'user':'567', 
                'password':'5kBnnT6gSAIFa40q6ekmDvWE', 
                'sendImmediately': false
            }
        }},function (error, response, body) {});
              response.pipe(fs.createWriteStream('../files/'+idAssistenza+'/'+idAllegato));
          */  
    /*
    
>>>>>>> Stashed changes
    request({url:tmp,
             user:'567', 
             password: '5kBnnT6gSAIFa40q6ekmDvWE'}, function (error, response, body) {
        if(!error){
            var res= body.pipe(fs.createWriteStream(idAssistenza+'_'+idAllegato+'.png'));
            console.log("!errore: "+res);
            
        }else{
            console.log('errore!');
        }
    });*/
<<<<<<< Updated upstream

=======
}
>>>>>>> Stashed changes

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
    from: program.seconds,
    numrow : 100
};
postJson( program.host, 443, parm, program.user+":"+program.password, "wsapi", "/assistance/list/",
    function(err, httpResul, httpJson) {
        if (err) {
            console.log(err);
        } else {
            //console.log(httpResul);
            //console.log(jsonStringify(httpJson));
            httpJson.assistances.forEach(function(element) {
                if(element){
                    //console.log(element._id +' roba: '+element.customer_id+' element.date: '+element.date);
                    //CREATE A NEW ACTY RECORD 
<<<<<<< Updated upstream
                    var actyUser = new modelUserData_acty({
=======
                    var actyUser = new userData_acty({
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    actyUser.save(function(err, actyUser) {
                        if(err) throw err;
                    });
                    getAttachment(element._id, (element.photos + element.videos));
=======
                    actyUser.save(function(err, user1) {
                        if(err) throw err;
                    });
                    for(var i=0; i<(element.photos + element.videos)-1; i++){
                        getAttachment(element._id, i);
                    }
>>>>>>> Stashed changes
                }
            });
        }
        process.exit(0);
});

//node customer_msg_list.js -u 567 -p 5kBnnT6gSAIFa40q6ekmDvWE -h api.acty.com 1000

//node customer_msg_list.js -u 567 -p 5kBnnT6gSAIFa40q6ekmDvWE -h api.acty.com 86400
