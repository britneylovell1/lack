var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($state, AdminUserFactory) {

  return {

    restrict: 'E',
    templateUrl: '../templates/navbar.html',

    link: function (scope, element, attrs) {

      scope.loggedIn = false;

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          scope.loggedIn = true;
          //TODO: FIX ADMIN CHECK
          // $rootScope.isAdmin = AdminUserFactory.checkIfAdmin(user.uid, scope.team, false);
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
