var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

// TODO:
// create a team in firebase
// clear input field + reset $scope.team
// email team members (figure out how to do this)
// set admin status for current user
// associate each member (including current user) 
	// to the team 
// redirect to that team's state

// old stuff
app.factory('teamFactory', function() {

	// helper function for createTeam
	function assocMembers(members) {
		// associate the each user to the team
		members.forEach(function(member, teamKey) {
			firebase.database().ref('/users').child(member).child('teams').push({
				teamKey: true
			});
		});
	}

	return {
		createTeam: function(teamName, teamMembers) {
			// teamMembers needs to be an array 

			// get the current user's id (the team creator's id)
			// or do we pass in the user id?
			// var user = firebase.auth().currentUser

			// add team and get a key for a new team.
			var newTeamKey = firebase.database().ref().child('teams').push().key;

			// associate the each user to the team
			assocMembers(teamMembers, newTeamKey);

			// set user to admin status
			firebase.database().ref('/users').child(user).update({
				admin: true,
			});
		},

		emailMembers: function() {
			// email the team members
		}

	}
})















