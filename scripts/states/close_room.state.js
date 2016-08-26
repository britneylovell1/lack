var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');
var CloseRoomController = require('../controllers/close_room.controller.js');

module.exports = function ($stateProvider) {
  $stateProvider.state('closeRoom', {
    url: '/home/teams/:teamId/rooms/:roomId/close-room',
    templateUrl: '/templates/close_room.html',
    resolve: {
      roomData: function ($stateParams, $firebaseObject) {
        var teamRef = firebase.database().ref('rooms/' + $stateParams.roomId);
        return $firebaseObject(teamRef);
      },
      roomMembers: function ($stateParams, $firebaseArray) {
        var membersRef = firebase.database().ref('rooms/' + $stateParams.roomId + '/members');
        return $firebaseArray(membersRef);
      }
    },
    controller: CloseRoomController
  });
};
