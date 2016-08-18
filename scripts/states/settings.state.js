var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider){
  $stateProvider.state('settings', {
    url: '/settings',
    templateUrl: '../templates/settings.html',
    controller: require('../controllers/settings.controller.js')
  });
};
