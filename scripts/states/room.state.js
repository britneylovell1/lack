var angular = require('angular');
var app = angular.module('lack');
var RoomController = require('../controllers/room.controller.js');

module.exports = function($stateProvider) {
  $stateProvider.state('home.room', {
    url: '/rooms/:roomId',
    templateUrl: '/templates/room.html',
    controller: RoomController
    
  });
};
