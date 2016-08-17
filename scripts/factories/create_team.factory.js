var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

// TODO:
// clear input field + reset $scope.team
// redirect to that team's state

module.exports = function($firebaseObject) {

	return {
		createTeam: function() {
		
      // create the team obj in firebase + get the reference to it
      var newTeamRef = firebase.database().ref('teams').push();

      // return the team as a synchronized object
      return $firebaseObject(newTeamRef);
    }

	}
}















