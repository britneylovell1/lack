var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

// TODO:
// associate user and messages

module.exports = function($firebaseArray, $firebaseObject) {

	return {
		assocUserTeam: function(user, team) {
			// associate the users with the teams

			// set up association variables
			var userInfo = {
				[user.uid]: { userName: user.displayName }
			};

			// set up association variables
			var teamId = team.id || team.$id;
			var teamInfo = {
				[teamId]: { teamName: team.name }
			};

			// create user + team entries and set up references to them
			var userRef = firebase.database().ref().child('users/' + user.uid + '/teams');
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/users');


			// wait for the user to be created in the database
			firebase.database().ref().child('users/' + user.uid).once('child_added')
			.then(function() {

				// create associations in firebase
				userRef.update(teamInfo);
				teamRef.update(userInfo);

			})

			return user;

		},
		
		assocTeamRoom: function(team, room) {
			// Do we even need to add 'teams/team.id/rooms'???

	    // set up association variables
	    var teamId = team.id || team.$id;
			var teamInfo = {
				[teamId]: { teamName: team.name }
			};

	    var roomId = room.id || room.$id;
	    var roomInfo = {
	      [roomId]: { roomName: room.name }
	    };
	    

	    // create team + room entries and set up references to them
	    var teamRef = firebase.database().ref().child('teams/' + teamId + '/rooms');
	    var roomRef = firebase.database().ref().child('rooms/' + roomId + '/members');

	    // create associations in firebase
	    teamRef.update(roomInfo);
	    roomRef.update(teamInfo);

	    return team;

	  },

	  assocUserRoom: function(user, room) {

	    // set up association variables
			var userInfo = {
				[user.uid]: { userName: user.displayName }
			};

	    var roomId = room.id || room.$id;
	    var roomInfo = {
	      [roomId]: { roomName: room.name }
	    };

	    // create user + room entries and set up references to them
	    var userRef = firebase.database().ref().child('users/' + user.userId + '/rooms');
	    var roomRef = firebase.database().ref().child('rooms/' + roomId + '/members');

	    // create associations in firebase
	    userRef.update(roomInfo);
	    roomRef.update(userInfo);

	    return user;

	  },

	  assocRoomMessage: function() {
	  	// do this
	  }
		
	}

}