var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');


var createTeamState = function($stateProvider){
	$stateProvider.state('createYourTeam', {
		url: '/create-team',
		templateUrl: '../templates/create_your_team.html',

		// future task: modularize the controller
		controller: function($scope, $firebaseArray, $firebaseObject, $state, EmailFactory, UserFactory, TeamFactory) {
			// TODO:
			// place current team on the $rootscope 
			// clear input field + reset $scope.team
			// redirect to that team's state

			// function createTeam() {
	  //     // create the team obj in firebase + get the reference to it
	  //     var newTeamRef = firebase.database().ref('teams').push();

	  //     // return the team as a synchronized object
	  //     return $firebaseObject(newTeamRef);
	  //   }

	    // this should be the new team obj.
			$scope.team = TeamFactory.createTeam();

			// save team.name and team.members in firebase
			// figure out how to parse/save the members with Material chips
			$scope.saveTeam = function() {
				
				$scope.team.emails = $scope.emails;

				EmailFactory.sendInvitations($scope.team);

				$scope.team.$save().then(function() {


			      }).catch(function(error) {
			        alert('Error!');
			      });

			  UserFactory.signIn()
        .then(function(user) {

          // associate user with team 
          return UserFactory.assocUserTeam(user, $scope.team)
        })
        .then(function(user) {

          // set this user as the admin
          UserFactory.addTeamAdmin(user, $scope.team);
	        $state.go('home');
        });
			};

			//initialize empty array for Angular Material chips:
			$scope.emails = [];

		}
	})
}

module.exports = createTeamState;
