var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/home/teams/:teamId',
    templateUrl: '/templates/home.html',
    controller: function ($rootScope, $scope, $state, $firebaseArray, $stateParams, TeamFactory) {

      //for setting welcome message
      $rootScope.inRoom = false;
      TeamFactory.getCurrentTeam()
      .then(function (team) {
        $scope.currentTeam = team;
      });

      $scope.currentTeamId = $stateParams.teamId;
      $scope.currentRoom = { name: 'Current Room' };

      $scope.goToRoom = function () {
        $state.go('landing');
      };
    }
  });
};
