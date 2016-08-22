'use strict';

var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.listen(process.env.PORT || 3000);
app.listen(3000);

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

  console.log('in here: ', email);

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

var sendRecaps = function (email, notes, objective, roomName) {

  mailOptions.to = email;
  mailOptions.subject = 'Closed room recap';
  mailOptions.html = '<p>Your room ' + roomName + ' has been closed.</p><p>Objective:</p><p>'
                     + objective +
                     '<p>Notes:</p><p>'
                     + notes +
                     '</p>';

   transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
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

app.post('/close-room', function (req, res) {

  var emails = req.body.emails;
  var notes = req.body.notes;
  var objective = req.body.objective;
  var roomName = req.body.roomName;

  emails.forEach(function (email) {
    sendRecaps(email, notes, objective, roomName);
  });

  res.send('Success');

});

//add firebase listener: listen for on child added to email route

//cron job for room expiration:

var CronJob = require('cron').CronJob;
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAGlJNi77LCyxRye_4--6FM-sAP4uRFccM",
  authDomain: "shhh-lack.firebaseapp.com",
  databaseURL: "https://shhh-lack.firebaseio.com",
  storageBucket: "shhh-lack.appspot.com",
};

firebase.initializeApp(config);


// var job = new CronJob('00 00 04 * * 0-6', function () { //once a day at 4am
var job = new CronJob('* * * * * *', function () { //every second

  console.log('this is working');

  //go through all rooms and delete rooms where expiration date === today
  //delete those rooms from users' list of rooms

  var roomsRef = firebase.database().ref('rooms');
  roomsRef.on('value', function(snapshot) {
    console.log('snapshot: ', snapshot.val());
  });

}, null, true, 'America/Los_Angeles');

//useful date methods:
//getFullYear()
//.getMonth()
//.getDate()