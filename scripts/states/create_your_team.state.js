var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');


var createTeamState = function($stateProvider){
	$stateProvider.state('createYourTeam', {
		url: '/create-team',
		templateUrl: '../templates/create_your_team.html',

		// future task: modularize the controller
		controller: function($scope, $firebaseArray, $firebaseObject, $state) {
			// TODO:
			// create a team in firebase
			// clear input field + reset $scope.team
			// email team members (figure out how to do this)
			// set admin status for current user
			// associate each member (including current user) to the team
			// redirect to that team's state

			function createTeam() {
		      // create the team obj in firebase + get the reference to it
		      var newTeamRef = firebase.database().ref('teams').push();

		      // return the team as a synchronized object
		      return $firebaseObject(newTeamRef);
		    }

		    // this should be the new team obj.
			$scope.team = createTeam();

			// save team.name and team.members in firebase
			// figure out how to parse/save the members with Material chips
			$scope.saveTeam = function() {
				$scope.team.emails = $scope.emails;
				$scope.team.$save().then(function() {
			        alert('Team saved!');
			        $state.go('home');
			      }).catch(function(error) {
			        alert('Error!');
			      });
			};
			//initialize empty array for Angular Material chips:
			$scope.emails = [];
		}
	})
}

module.exports = createTeamState;
