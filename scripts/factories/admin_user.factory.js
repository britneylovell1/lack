var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($firebaseObject, $firebaseArray, $state) {

  return {

    checkIfAdmin: function (userId, team) {

      var adminRef = firebase.database().ref().child('teams/' + team.$id + '/admin');
      var adminList = $firebaseArray(adminRef);

      return adminList.$loaded()
      .then(function () {

        for (var i = 0; i < adminList.length; i++){
          var admin = adminList[i];
          if (admin.$id === userId) {
            return true;
          }
        }
        return false;

      });

    },

    removeFromTeam: function (teamId, membersArr, userToRemove) {

      membersArr.$remove(userToRemove).then(function () {

        var userTeamsRef = firebase.database().ref().child('users/' + userToRemove.$id + '/teams');
        var userTeams = $firebaseArray(userTeamsRef);

        userTeams.$loaded().then(function () {

          var teamRec = userTeams.$getRecord(teamId);

          userTeams.$remove(teamRec).then(function () {

            var refAdmin = firebase.database().ref().child('teams/' + teamId + '/admin');
            var adminArr = $firebaseArray(refAdmin);

            adminArr.$loaded().then(function () {

              var record = adminArr.$getRecord(userToRemove.$id);

              adminArr.$remove(record).then(function () {

                console.log('User successfully removed');

              });
            });
          });
        });
      });
    }
  };
};

