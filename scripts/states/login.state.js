var angular = require('angular');
var app = angular.module('lack');
var LoginController = require('../controllers/login.controller.js')

// TODO:

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: LoginController
  });
};
