var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('googleSignup', {
    url: '/sign-up',
    templateUrl: '/templates/google_signup.html',
    controller: function ($scope, $firebaseAuth) {
				// TODO:
				// upon signup/signin, place current team on the $rootscope
				// create new user in firebase (done)
				// grab user name, email, photo from google (done)
				// associate with team 
				// associate with room

			function createUser(user) {

				// grab the user's google information
				var userInfo = {
				  name: user.displayName,
				  email: user.email,
				  photoUrl: user.photoURL
				};

	      // create the user obj in firebase + add the user info
	      var newUserRef = firebase.database().ref('users').child(user.uid).update(userInfo);

	    }
    	
      $scope.signUp = function() {}

				// Sign in Firebase using popup auth and Google as the identity provider.
				$scope.authObj = $firebaseAuth();

				$scope.authObj.$signInWithPopup("google")
				.then(function(result) {
					// console.log("Signed in as:", result.user);

					// create the user in firebase
					createUser(result.user);
					
				})
				.catch(function(error) {
					console.error("Authentication failed:", error);
				});
    }

  });
};
