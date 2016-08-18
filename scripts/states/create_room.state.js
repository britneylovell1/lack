var angular = require('angular');
var app = angular.module('lack');
var RoomController = require('../controllers/room.controller.js');

module.exports = function($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/create-room',
    templateUrl: '/templates/create_room.html',
    resolve: {
      teamMembers: function(TeamFactory) { 
        return TeamFactory.getTeamMembers().$loaded()
      }
    },
    controller: RoomController
  });
};
