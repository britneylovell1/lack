var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/templates/home.html',
    controller: function ($scope) {
      $scope.currentRoom = { name: "ExampleCurrentRoom" };
      $scope.allMembers = ['Britney', 'Maggie', 'Elisabeth'];
      $scope.high_pri_rooms = ['ExampleHighPriorityRoom, AnotherHighPriorityRoom'];
      $scope.low_pri_rooms = ['ExampleLowPriorityRoom', 'AnotherLowPriorityRoom'];
    }
  });
};
