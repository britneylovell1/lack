var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($state, AdminUserFactory, $rootScope) {

  return {

    restrict: 'E',
    templateUrl: '../templates/navbar.html',

    link: function (scope, element, attrs) {

      $rootScope.loggedIn = false;
      $rootScope.isAdmin = false;

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          $rootScope.loggedIn = true;
          scope.team = AdminUserFactory.fetchTeamObj();
          $rootScope.isAdmin = AdminUserFactory.checkIfAdmin(user.uid, scope.team, false);
        } else {
          scope.loggedIn = false;
        }
      });

      scope.signout = function () {
        firebase.auth().signOut().then(function () {
          $rootScope.loggedIn = false;
          $state.go('landing');
        }, function (error) {
          console.log(error);
        });
      };

    }
  };
};
