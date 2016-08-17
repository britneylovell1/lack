var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($firebaseObject) {
  return {
    restrict: 'E',
    templateUrl: '../templates/sidebar.html',
    scope: {
      rooms: '=',
    },
    link: function(scope) {
      function getRooms() {
        var roomsRef = firebase.database().ref('rooms');
        return $firebaseObject(roomsRef);
      }
      scope.rooms = getRooms();
    }
  };
};
