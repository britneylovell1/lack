var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('googleSignup', {
    url: '/sign-up',
    templateUrl: '/templates/google_signup.html',
    controller: function ($scope, UserFactory, $firebaseAuth, $firebaseArray) {
			// TODO:
			// place current team on the $rootscope 
    	
    	// sign up as an admin of a team
      $scope.signUp = function() {

        UserFactory.signIn()
        .then(function(user) {

          // associate user with team 
          return UserFactory.assocUserTeam(user, $scope.team)
        })
        .then(function(user) {

          // set this user as the admin
          UserFactory.addTeamAdmin(user, $scope.team);
        });

      }


      // put current team on the $rootscope
    }

  })
};
