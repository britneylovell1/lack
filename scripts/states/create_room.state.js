var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/create-room',
    template: '<h1>Hi {{ test }} </h1>',
    controller: function ($scope) {
      $scope.test = "testing testing 123";
    }
  });
};
