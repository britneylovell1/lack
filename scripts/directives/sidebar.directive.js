var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($firebaseArray, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '../templates/sidebar.html',
    scope: {
      rooms: '=',
    },
    link: function(scope) {
      function getRooms() {
        var roomsRef = firebase.database().ref('rooms');
        return $firebaseArray(roomsRef);
      }
      scope.rooms = getRooms();

      scope.setCurrentRoom = function(room) {
        $rootScope.currentRoom = room;
      };
    }
  };
};
