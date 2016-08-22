var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');


module.exports = function ($state, AdminUserFactory, $rootScope, TeamFactory, $location) {

  return {

    restrict: 'E',
    templateUrl: '../templates/navbar.html',

    link: function (scope, element, attrs) {

      scope.loggedIn = false;

      scope.goHome = function () {
        TeamFactory.getCurrentTeam()
          .then(function(team){
            scope.team = team;
            AdminUserFactory.checkIfAdmin(team)
              .then(function (bool) {
                $rootScope.isAdmin = bool;
                $state.go('home', {teamId: scope.team.$id});
              });
          });
      };
      scope.log = function () {
        console.log('it works');
      };

      firebase.auth().onAuthStateChanged(function (user) {
        // This prevents a user from creating a new team when they're signed in
        if (user) {
          scope.loggedIn = true;
          scope.goHome();
        } else {
          scope.loggedIn = false;
          if (!$location.search().teamId) {
            $state.go('landing');
          }
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
