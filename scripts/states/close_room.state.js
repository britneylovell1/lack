var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($stateProvider) {
  $stateProvider.state('closeRoom', {
    url: '/home/teams/:teamId/rooms/:roomId/close-room',
    templateUrl: '/templates/close_room.html',
    resolve: {
      roomMembers: function ($stateParams, $firebaseArray) {
        var membersRef = firebase.database().ref('rooms/' + $stateParams.roomId + '/members');
        return $firebaseArray(membersRef);
      },
      roomData: function ($stateParams, $firebaseObject) {
        var teamRef = firebase.database().ref('rooms/' + $stateParams.roomId);
        return $firebaseObject(teamRef);
      }
    },
    controller: function ($scope, $state, $mdToast, EmailFactory, $stateParams, TeamFactory, roomMembers, roomData) {

      console.log('MEMBERS REF: ', roomMembers);
      console.log('ROOM DATA: ', roomData);

      //grab team and room IDs from URL params:
      $scope.teamId = $stateParams.teamId;
      $scope.roomId = $stateParams.roomId;

      //fetch resolved room object:
      $scope.currentRoom = roomData;

      //fetch all team members in room:
      $scope.allMembers = roomMembers;
      //have .userName and .$id properties

      //TODO: grab notes and member info from form
      $scope.data = {};

      $scope.closeRoom = function () {

        //TODO: fetch email address of each selected member and add to data obj.

        //TODO: finish this factory function
        EmailFactory.sendRoomNotes($scope.data)
        .then(function () {

          //TODO: delete room from everywhere it is stored in firebase

          $mdToast.show($mdToast.simple().textContent('Room closed!'));
          $state.go('home');

        });

      };

    }
  });
};



