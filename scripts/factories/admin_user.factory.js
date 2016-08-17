var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($firebaseObject) {

  return {

    fetchCurrentUserId: function () {
      return firebase.auth().currentUser.uid;
    },

    fetchAllTeamMembers: function () {

      var currentUserId = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref('users').child(currentUserId);
      var obj = $firebaseObject(ref);

      obj.$loaded().then(function () {

        var teams = obj.teams;
        var firstTeamIndex = Object.keys(teams)[0];
        var teamId = teams[firstTeamIndex].teamId;

        var teamRef = firebase.database().ref('teams').child(teamId);
        var teamObj = $firebaseObject(teamRef);

        teamObj.$loaded().then(function () {

          var allMembers = teamObj.users;
          console.log(allMembers);
          return allMembers;

        });

      });
    }
  };
};

