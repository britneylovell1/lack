'use strict';

var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);


//add headers middleware
app.all('*', function(req, res,next) {


    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});
//end add headers middleware

var transporter = nodemailer.createTransport('smtps://thelackteam%40gmail.com:Maggie43!@smtp.gmail.com');

var mailOptions = {

  from: 'Team Lack <the.lack.team@gmail.com>',
  to: 'mneterval@gmail.com',
  subject: 'You have been invited to join a Lack team',
  text: 'Test'

};

var sendEmail = function (email, teamId, teamName) {

  mailOptions.to = email;
  mailOptions.html = '<p>You have been invited to join '
                      + teamName +
                      ' on Lack! Click <a href="http://localhost:5000/#/join-team?teamId='
                      + teamId +
                      '&teamName='
                      + teamName +
                      '&email='
                      + email +
                      '">here</a> to get started.</p>';
  //return new promise, resolve with this:
  transporter.sendMail(mailOptions, function (error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

};

app.post('/send-emails', function (req, res) {

  var teamId = req.body.$id;
  var teamName = req.body.name;
  var emails = req.body.emails;

  emails.forEach(function (email) {
    sendEmail(email, teamId, teamName);
  });

  res.send('Success');

});

//add firebase listener: listen for on child added to email route
