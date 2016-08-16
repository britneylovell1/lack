var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('googleSignup', {
    url: '/sign-up',
    templateUrl: '/templates/google_signup.html',
    controller: function ($scope, UserFactory, $firebaseAuth, $firebaseArray) {
			// TODO:
			// make new user admin of the created team (on team model)
			// associate user with team 
			// place current team on the $rootscope 
			// what's up with the pop-up? it pops up, but then signs you in automatically
			// make error message pretty for user
    	
    	// sign up as an admin of a team
    	$scope.signUp = function() {
        UserFactory.signIn(adminStatus = true);
      }

      
      // put current team on the $rootscope
    }

  })
};
