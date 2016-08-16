var angular = require('angular');
var app = angular.module('lack');
var AdminController = require('../controllers/admin.controller.js');

module.exports = function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: '/templates/admin.html',
    controller: AdminController
  });
};
