var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($firebaseObject, $firebaseArray, $state) {

  return {

    fetchTeamObj: function () {

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
          return teamObj;
        });

      });

    },

    checkIfAdmin: function (userId, team, shouldRedirect) {

      var adminRef = firebase.database().ref().child('teams/' + team.$id + '/admin');
      var adminList = $firebaseArray(adminRef);

      adminList.$loaded()
      .then(function () {

        for (var i = 0; i < adminList.length; i++){
          var admin = adminList[i];
          if (admin.userId === userId) {
            return true;
          } else {
            if (shouldRedirect){
              $state.go('landing');
            }
            return false;
          }
        }
      });

    },

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

        var teamUsersRef = firebase.database().ref('teams').child(teamId + '/users');
        var membersArr = $firebaseArray(teamUsersRef);

        membersArr.$loaded().then(function () {
          return membersArr;
        });

      });

    }
  };
};

