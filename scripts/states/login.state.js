var angular = require('angular');
var app = angular.module('lack');

// TODO:

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: function ($scope, $rootScope, $state, $firebaseAuth, $firebaseObject, $firebaseArray, UserFactory, TeamFactory) {

    	// log in, duh
			$scope.signIn = function() {
				UserFactory.login()
				.then(function (home) {

					// get the current team and go to that home state
					// var teamArr = TeamFactory.getCurrentTeam();
					// teamArr.$loaded()
					// .then(function () {
					// 	var teamKey = teamArr.$keyAt(0);
					TeamFactory.getCurrentTeamId()
					.then(function(teamKey){
						
						console.log(teamKey)
						// you don't have to go home, but you can't stay here
						if (home) $state.go('home', {teamId: teamKey});
						else $state.go('landing');
					});

				})
				.catch(function (error) {
					console.log(error);
				});

			};
		}
  });
};
