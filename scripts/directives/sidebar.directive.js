var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($state, $firebaseArray, $rootScope, UserFactory, $stateParams) {
  return {
    restrict: 'E',
    templateUrl: '../templates/sidebar.html',
    scope: {
      rooms: '=',
      currentTeamId: '='
    },
    link: function (scope) {

      scope.teamId = $stateParams.teamId;

      function getRooms () {
        var user = UserFactory.getCurrentUser();
        var roomsRef = firebase.database().ref('users').child(user.uid + '/rooms');
        return $firebaseArray(roomsRef);
      }
      scope.rooms = getRooms();

      scope.setCurrentRoom = function (room) {
        $rootScope.currentRoom = room;
      };
    }
  };
};
