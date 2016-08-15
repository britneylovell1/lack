var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('googleSignup', {
    url: '/sign-up',
    templateUrl: '/templates/google_signup.html',
    controller: function ($scope, userFactory, $firebaseAuth, $firebaseArray) {
				// TODO:
				// make new user admin of the created team (on team model)
				// associate user with team (waiting for that info from email)
				// upon signup/signin, place current team on the $rootscope 
				// what's up with the pop-up? it pops up, but then signs you in automatically
				// make error message pretty for user
    	
      $scope.signUp = function() {

				// Sign in Firebase using popup auth and Google as the identity provider.
				$scope.authObj = $firebaseAuth();

				$scope.authObj.$signInWithPopup("google")
				.then(function(result) {

					// check if the user account already exists 
					userFactory.checkOrCreateUser(result.user)

					// associate user with team

					// put current team on the $rootscope

					// add "admin" property on the current team + and set the user to "admin"


				})
				.catch(function(error) {
					// NEED TO MAKE THIS ERROR ALERT PRETTY FOR THE USER
					console.error("Authentication failed:", error);

					// Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;

					alert(errorCode, "\nAuthentication failed:\n", errorMessage);

				});
			}
    }

  });
};
