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
	    	.then(function (home) {

    			// get the current team id
    			// put this in a factory
	    		var currentUserId = firebase.auth().currentUser.uid;
				  var teamRef = firebase.database().ref('users').child(currentUserId).child('teams');
				  var teamArr = $firebaseArray(teamRef);

			  	teamArr.$loaded().then(function () {
				  	var teamKey = teamArr.$keyAt(0);
				  	console.log(teamKey);
				  	TeamFactory.setCurrentTeam(teamKey);
						// you don't have to go home, but you can't stay here
				  	if (home) $state.go('home', {teamId: teamKey});
	    			else $state.go('landing');

				  });

	    	})
	    	.catch(function(error) {
	    		console.log(error);
	    	});

	    };

    }

  });
};
