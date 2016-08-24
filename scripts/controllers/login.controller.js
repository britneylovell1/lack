var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($scope, $rootScope, $state, $firebaseAuth, $firebaseObject, $firebaseArray, UserFactory, TeamFactory) {

	// log in, duh
	$scope.signIn = function() {
		UserFactory.signIn()
		.then(function (home) {

			// get the current team and go to that home state
			TeamFactory.getCurrentTeam()
			.then(function(team){
				
				// you don't have to go home, but you can't stay here
				if (home) $state.go('home', {teamId: team.$id});
				else $state.go('landing');
			});

		})
		.catch(function (error) {
			console.log(error);
		});

	};
}
