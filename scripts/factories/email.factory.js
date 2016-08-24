var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($http, $firebaseArray) {
  return {
    sendInvitations: function (team, emails) {
      if (emails) {
        team.emails = emails;
      }
    },
    inviteNewMembers: function (data) {
      console.log('data: ', data);
      var emailQueueRef = firebase.database().ref().child('new-members-email-queue');
      var emailQueue = $firebaseArray(emailQueueRef);
      emailQueue.$loaded()
      .then(function () {
        emailQueue.$add(data);
        console.log('email queue: ', emailQueue);
      })
      .then(function () {
        return;
      });
    },
    sendRoomNotes: function (data) {
      var emailQueueRef = firebase.database().ref().child('close-room-email-queue');
      var emailQueue = $firebaseArray(emailQueueRef);
      emailQueue.$loaded()
      .then(function () {
        emailQueue.$add(data);
      })
      .then(function () {
        return;
      });
    }
  };
};
