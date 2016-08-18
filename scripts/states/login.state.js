var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
		controller: function ($scope, $rootScope, $state, $firebaseAuth, $firebaseObject, $firebaseArray, UserFactory, TeamFactory) {
				$scope.signIn = function() {
		  		UserFactory.login()
		  		.then(function(home) {

		  		var currentUserId = firebase.auth().currentUser.uid;
				  var ref = firebase.database().ref('users').child(currentUserId);
				  var obj = $firebaseObject(ref);

				  obj.$loaded().then(function () {

				    var teams = obj.teams;
				    var firstTeamIndex = Object.keys(teams)[0];
				    var teamId = teams[firstTeamIndex].teamId;

				    var teamUsersRef = firebase.database().ref('teams').child(teamId + '/users');
				    var membersArr = $firebaseArray(teamUsersRef);
				    var teamRef = firebase.database().ref('teams').child(teamId);
				    var teamObj = $firebaseObject(teamRef);

				    teamObj.$loaded().then(function () {
				    	if (home) $state.go('home', {teamId: teamObj.$id});
				    	// you don't have to go home, but you can't stay here
				    	else $state.go('landing');
				    });

		    	})
		    	.catch(function(error) {
		    		console.log(error);
		    	});

		  	});
		  };
    }
  });
};
