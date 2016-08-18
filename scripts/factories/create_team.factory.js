var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

// TODO:
// clear input field + reset $scope.team
// redirect to that team's state

module.exports = function($firebaseObject, $firebaseArray) {

	return {
		createTeam: function() {

      // create the team obj in firebase + get the reference to it
      var newTeamRef = firebase.database().ref('teams').push();

      // return the team as a synchronized object
      return $firebaseObject(newTeamRef);
    },

    assocUserTeam: function(user, team) {

			// associate the users with the teams
			var userInfo = {
				userId: user.uid,
				userName: user.displayName
			};

			var teamId = team.id || team.$id
			var teamInfo = {
				teamId: teamId,
				teamName: team.name
			};

			// set up references
			var userRef = firebase.database().ref().child('users/' + user.uid + '/teams');
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/users');

			// wait for the user to be created in the database
			firebase.database().ref().child('users/' + user.uid).once('child_added')
			.then(function() {

				// add team to 'users' model
				$firebaseArray(userRef).$add(teamInfo);

				// add user to 'teams' model
				$firebaseArray(teamRef).$add(userInfo);
			})

			return user;

		},

		addTeamAdmin: function (user, team) {

			// add a user as an admin on the teams model
			var userInfo = {
				userId: user.uid || user.$id,
				userName: user.displayName || user.userName
			};
			var teamId = team.id || team.$id;

			var teamRef = firebase.database().ref().child('teams/' + teamId + '/admin');

			$firebaseArray(teamRef).$add(userInfo);

		},

		removeUserFromTeam: function (user, team) {

			// var teamId = team.$id;
			// var teamRef = firebase.database().ref()
		}

	};
};















