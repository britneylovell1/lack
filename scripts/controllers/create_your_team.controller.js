var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');
// right now this controller is in the createYourTeam state.
// future task: modularize the state 


var createTeamCtrl = function($scope, $firebaseArray, $firebaseObject) {
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
		$scope.team.$save().then(function() {
      alert('Team saved!');
    }).catch(function(error) {
      alert('Error!');
    });	
	};
}

module.exports = createTeamCtrl;

