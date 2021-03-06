var nodemailer = require('nodemailer');
var restify = require('restify')

  , userSave = require('save')('user')
  var server = restify.createServer({ name: 'contact-api' })
 
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})
server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

 server.get('/user', function (req, res, next) {
  userSave.find({}, function (error, users) {
    res.send(users)
  })
})


 //adding gmail hook

 server.post('/contact-api', function (req, res) {
	console.log(req.params.name);
	console.log(req.params.email);
  console.log(req.params.phone);
  console.log(req.params.year);
  console.log(req.params.make);
  console.log(req.params.model);
	console.log(req.params.message);
  
	var mailOpts, smtpTrans;


	var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'webserver@buycarsfrom.me',
        pass: '43110WebPage'
    }
});

	//mail options
	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;',
		to: 'toddgurz@buycarsfrom.me',
		subject: 'Website contact form',
		text: req.params.name +" " +
          req.params.email +" "+
          req.params.phone + " " +
          req.params.year + " " +
          req.params.make + " " +
          req.params.model + " "+
          req.params.message
	};

	transporter.sendMail(mailOpts, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
});