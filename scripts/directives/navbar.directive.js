var angular = require('angular');
var app = angular.module('lack');

module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: '../templates/navbar.html'
  };
};
