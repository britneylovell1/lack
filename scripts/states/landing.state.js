var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('landing', {
    url: '/',
    templateUrl: '../templates/landing.html'
  });
};
