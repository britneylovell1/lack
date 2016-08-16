var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: function ($scope, $firebaseAuth, $firebaseObject, UserFactory) {
	    $scope.signIn = function() {
	    	UserFactory.login();
	    }

		// still need to redirect to different state
    }
    
  });
};
