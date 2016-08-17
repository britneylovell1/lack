var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: function ($scope, $state, $firebaseAuth, $firebaseObject, UserFactory) {
	    $scope.signIn = function() {
	    	UserFactory.login()
	    	.then(function(home) {
	    		if (home) $state.go('home');
	    		else $state.go('landing');
	    	});
	    }

    }
    
  });
};
