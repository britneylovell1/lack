var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($stateProvider) {
  $stateProvider.state('closeRoom', {
    url: '/home/teams/:teamId/rooms/:roomId/close-room',
    templateUrl: '/templates/close_room.html',
    controller: function ($scope, $state, $mdToast, EmailFactory, $stateParams) {

      //grab team and room IDs from URL params:
      $scope.teamId = $stateParams.teamId;
      $scope.roomId = $stateParams.roomId;

      //TODO: fetch actual Room from firebase:
      $scope.currentRoom = { name: "ExampleCurrentRoom" };

      //TODO: fetch all team members and their emails
      $scope.allMembers = ['Britney', 'Maggie', 'Elisabeth'];

      //TODO: grab notes and member info from form
      $scope.data = {};

      $scope.closeRoom = function () {

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



