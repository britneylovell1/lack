var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: function ($scope, $rootScope, $state, $firebaseAuth, $firebaseObject, $firebaseArray, UserFactory, TeamFactory) {
	    $scope.signIn = function() {
	    	UserFactory.login()
	    	.then(function(home) {

	    		// bind the team obj to the rootScope.teamObj
	    		// var teamObj = TeamFactory.getTeam()
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
				      teamObj.$bindTo($rootScope, 'teamObj').then(function () {
				        console.log('$rootScope.teamObj ', $rootScope.teamObj);
				      });
				    });

		    	})
		    	.catch(function(error) {
		    		console.log(error);
		    	});

		      // you don't have to go home, but you can't stay here
	    		if (home) $state.go('home');
	    		else $state.go('landing');
	    	});
	    }

    }
    
  });
};
