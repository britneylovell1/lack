var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/templates/home.html',
    controller: function ($scope) {
      $scope.currentRoom = {name: 'Current Room'}
      $scope.rooms = [{name: 'Example1'}, {name: 'Example2'}, {name: 'Example3'}, {name: 'Example4'}]
    }
  });
};
