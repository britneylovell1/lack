var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: function ($scope, $firebaseAuth, $firebaseObject) {
    	// testing the controller
      // $scope.test = "login page";

      // this is for first time users
	    $scope.signIn = function() {
				// Sign Up with Firebase using popup auth and Google as the identity provider.
				$scope.authObj = $firebaseAuth();

				$scope.authObj.$signInWithPopup("google")
				.then(function(result) {
					console.log("Signed in as:", result.user.uid);
					var userId = result.user.uid;
				})
				.catch(function(error) {
					console.error("Authentication failed:", error);
				});
		}


		// use this somewhere
		// $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
		//   if (firebaseUser) {
		//     console.log("Signed in as:", firebaseUser.uid);
		//   } else {
		//     console.log("Signed out");
		//   }
		// });

		// still need to redirect to different state
    }
  });
};
