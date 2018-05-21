<<<<<<< Updated upstream
var request = require('request-promise');
var fs = require('fs');
/*request('https://api.acty.com/wsapi/assistance/attachment/5b016d2caa1623ed3602d6c9/0').auth('567', '5kBnnT6gSAIFa40q6ekmDvWE', false).pipe(fs.createWriteStream('doodle.png'))
*/
var options = {
url: 'https://api.acty.com/wsapi/assistance/attachment/5b016d2caa1623ed3602d6c9/0',
	auth: {
	  user: '567',
	  password: '5kBnnT6gSAIFa40q6ekmDvWE'
	},
	encoding : null
}
request.get(options)
.then(function(res){
    const buffer = Buffer.from(res);
    fs.writeFileSync('tmp.jpeg',buffer);
 });

//asyncReq
=======
var request = require('request');
var fs = require('fs');
request('https://api.acty.com/wsapi/assistance/attachment/5b016d2caa1623ed3602d6c9/0').auth('567', '5kBnnT6gSAIFa40q6ekmDvWE', false).pipe(fs.createWriteStream('doodle.png'))
>>>>>>> Stashed changes
