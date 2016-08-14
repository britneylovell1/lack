var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('createTeam', {
    url: '/create-team',
    templateUrl: '/templates/create_team.html',
    controller: function ($scope) {
      $scope.emails = [];
    }
  });
};
