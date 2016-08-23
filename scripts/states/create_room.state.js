var angular = require('angular');
var app = angular.module('lack');
var CreateRoomController = require('../controllers/create_room.controller.js');

module.exports = function($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/home/teams/:teamId/create-room',
    templateUrl: '/templates/create_room.html',
    controller: CreateRoomController
  });
};
