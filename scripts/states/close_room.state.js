var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('closeRoom', {
    url: '/close-room',
    templateUrl: '/templates/close_room.html',
    controller: function ($scope, $state, $mdToast, EmailFactory) {

      $scope.currentRoom = { name: "ExampleCurrentRoom" };
      $scope.allMembers = ['Britney', 'Maggie', 'Elisabeth'];

      $scope.closeRoom = function () {

        EmailFactory.sendRoomNotes()
        .then(function () {

          $mdToast.show($mdToast.simple().textContent('Room closed!'));
          $state.go('home');

        });

      };

    }
  });
};


