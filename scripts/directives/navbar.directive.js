var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($state, AdminUserFactory, $rootScope, TeamFactory) {

  return {

    restrict: 'E',
    templateUrl: '../templates/navbar.html',

    link: function (scope, element, attrs) {

      scope.loggedIn = false;

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          scope.loggedIn = true;
          //check if user is admin:
          TeamFactory.getCurrentTeam()
          .then(function (team) {
            scope.team = team;
            AdminUserFactory.checkIfAdmin(user.uid, scope.team)
              .then(function (bool) {
                $rootScope.isAdmin = bool;
              });
            });
        } else {
          scope.loggedIn = false;
        }
      });

      scope.signout = function () {
        firebase.auth().signOut().then(function () {
          scope.loggedIn = false;
          $state.go('landing');
        }, function (error) {
          console.log(error);
        });
      };

    }
  };
};
