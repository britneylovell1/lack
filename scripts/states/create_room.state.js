var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/create-room',
    templateUrl: '/templates/create_room.html',
    controller: function ($scope) {
      $scope.allMembers = ['Maggie', 'Britney', 'Elisabeth'];
    }
  });
};
