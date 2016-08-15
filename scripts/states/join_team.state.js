var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('joinTeam', {
    url: '/join-team',
    templateUrl: '/templates/join_team.html',
    controller: function ($scope) {
      $scope.teamName = "Example Team Name"
      // TODO:
      // check to see if user is already in firebase
      // if user exists, add team to user (etc.)
      // if user does not exits, create new user
    }
  });
};