var angular = require('angular');
var app = angular.module('lack');
var TeamController = require('../controllers/team.controller.js');


var createTeamState = function($stateProvider){
	$stateProvider.state('createYourTeam', {
		url: '/create-team',
		templateUrl: '../templates/create_your_team.html',
		controller: TeamController
	})
}

module.exports = createTeamState;
