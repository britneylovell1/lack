var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home/teams/:teamId',
    templateUrl: '/templates/home.html',
    controller: function ($rootScope, $scope, $state, $firebaseArray, $stateParams) {

      $scope.currentTeamId = $stateParams.teamId;
      $scope.currentRoom = { name: 'Current Room' };
      $scope.rooms = [{ name: 'Example1', $id: 'test' }, { name: 'Example2', $id: 'test' }];

      $scope.goToRoom = function () {
        $state.go('landing');
      };

    }
  });
};
