var app = require('../app.js');

// create a team
// email team members
// set admin status
// do we need to associate the user 

app.factory('teamFactory', function() {

	function assocMembers(members) {
		// associate the each user to the team

		members.forEach(function(member, teamKey) {

			firebase.database().ref('/users').child(member).child('teams').push({
				teamKey: true
			});

		});
	}




	return {
		parseMembers: function(teamMembers) {
			// figure out how teamMembers is passed before tackling this
			// return an array of teamMembers ids
		},

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















