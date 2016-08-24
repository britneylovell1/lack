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
        scope.userId = UserFactory.getCurrentUser().uid;
        var roomsRef = firebase.database().ref('users').child(scope.userId + '/rooms');
        return $firebaseArray(roomsRef);
      }
      scope.rooms = getRooms();

      // this function isn't getting invoked. why? 
      scope.resetNotification = function (roomId) {
        console.log('in reset')
        // reset the notification status
        var buzzRef = firebase.database().ref('users/' + scope.userId).child('rooms/' + roomId + '/buzzWord');
        buzzRef.set(false);

        var VipRef = firebase.database().ref('users/' + scope.userId).child('rooms/' + roomId + '/VIP');
        VipRef.set(false);
      };
    }
  };
};
