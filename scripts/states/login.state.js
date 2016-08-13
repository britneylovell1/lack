var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: function ($scope, $firebaseAuth) {
    	// testing the controller
      $scope.test = "login page";

	    $scope.signIn = function() {
				// Sign in Firebase using popup auth and Google as the identity provider.
				$scope.authObj = $firebaseAuth();

				$scope.authObj.$signInWithPopup("google")
				.then(function(result) {
					console.log("Signed in as:", result.user.uid);
				})
				.catch(function(error) {
					console.error("Authentication failed:", error);
				});
			}

			// still need to redirect to different state
    }
  });
};
