var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('joinTeam', {
    url: '/join-team',
    templateUrl: '/templates/join_team.html',
    controller: function ($scope, $location) {
      $scope.teamName = $location.search().teamName;
      $scope.teamId = $location.search().teamId;
      $scope.email = $location.search().email;
      console.log($scope.teamName, $scope.teamId, $scope.email);
    }
  });
};


