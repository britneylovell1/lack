var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($state, $firebaseArray, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '../templates/sidebar.html',
    scope: {
      rooms: '=',
      currentTeamId: '='
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
