'use strict';

var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var CronJob = require('cron').CronJob;
var firebase = require('firebase');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);

var config = {
  apiKey: 'AIzaSyAGlJNi77LCyxRye_4--6FM-sAP4uRFccM',
  authDomain: 'shhh-lack.firebaseapp.com',
  databaseURL: 'https://shhh-lack.firebaseio.com',
  storageBucket: 'shhh-lack.appspot.com',
};

firebase.initializeApp(config);

var transporter = nodemailer.createTransport(process.env.SMTP_URL);

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

//listen for team creation:

var teamsRef = firebase.database().ref('teams');
teamsRef.on('child_added', function (data) {
  var emails = data.val().emails;
  var teamId = data.key;
  var teamName = data.val().name;
  emails.forEach(function (email) {
    sendEmail(email, teamId, teamName);
  });
});

//listen for new member invitations:

var invitesRef = firebase.database().ref('new-members-email-queue');
invitesRef.on('child_added', function (data) {
  var emails = data.val().emails;
  var teamId = data.val().teamId;
  var teamName = data.val().name;
  emails.forEach(function (email) {
    sendEmail(email, teamId, teamName);
  });
});

//listens for room closing

var emailQueueRef = firebase.database().ref('close-room-email-queue');
emailQueueRef.on('child_added', function (data) {
  var emails = data.val().emails;
  var notes = data.val().notes;
  var objective = data.val().objective;
  var roomName = data.val().roomName;
  emails.forEach(function (email) {
    sendRecaps(email, notes, objective, roomName);
  });
});

//cron job for room expiration:

var checkDate = function (date) {
  var today = new Date();
  if (
    today.getFullYear() === date.getFullYear() 
    &&
    today.getMonth() === date.getMonth()
    &&
    today.getDate() >= date.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};

var job = new CronJob('00 00 04 * * 0-6', function () {

  var roomsRef = firebase.database().ref('rooms');

  roomsRef
    .once('value', function(snapshot) {
      var rooms = snapshot.val();
      var keys = Object.keys(rooms);
      keys.forEach(function (key) {
        var key = key;
        var thisRoom = rooms[key];
        var expDate = new Date(thisRoom.date);
        var shouldDelete = checkDate(expDate);

        if (shouldDelete) {
          var members = thisRoom.members;
          var memberKeys = Object.keys(members);
          memberKeys.forEach(function (memberKey) {
            var memberRef = firebase.database().ref('users/' + memberKey + '/rooms/' + key);
            memberRef.remove();
          })
          var refToDelete = firebase.database().ref('rooms/' + key);
          refToDelete.remove();
        }

      });
    });

}, null, true, 'America/Los_Angeles');
