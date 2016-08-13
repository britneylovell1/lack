var angular = require('angular');
var app = angular.module('lack');
// var createTeamCtrl = require('../controllers/create_your_team.controller.js')

var createTeamState = function($stateProvider){
	$stateProvider.state('createYourTeam', {
		url: '/create-team',
		templateUrl: '../templates/create_your_team.html',
		controller: function() {

		}
	})
}

module.exports = createTeamState;


