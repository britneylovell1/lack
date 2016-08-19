var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($rootScope, $scope, $firebaseArray, $firebaseObject, $state, EmailFactory, UserFactory, TeamFactory, AssocFactory, $mdToast) {
	// TODO: modularize this controller

  // set $scope.team to new team obj (but do not bind)
	var teamObj = TeamFactory.createTeam();
	$scope.team = teamObj;


	// save team.name and team.members in firebase
	$scope.saveTeam = function() {

		$scope.team.emails = $scope.emails;

		EmailFactory.sendInvitations($scope.team);

		$scope.team.$save().then(function() {
      $mdToast.show($mdToast.simple().textContent('Team saved!'));

      // bind the team obj to the rootScope.teamObj
			teamObj.$loaded().then(function () {
	      teamObj.$bindTo($rootScope, 'teamObj').then(function () {
	        console.log('$rootScope.teamObj ', $rootScope.teamObj);
	      });
	    });

      UserFactory.signIn()
        .then(function(user) {

          // associate user with team
          return AssocFactory.assocUserTeam(user, $scope.team)
        })
        .then(function(user) {

          // set this user as the admin
          TeamFactory.addTeamAdmin(user, $scope.team);
	        $state.go('home');
        });

      }).catch(function(error) {
        $mdToast.show($mdToast.simple().textContent('Error!'));
      });
	};



	//initialize empty array for Angular Material chips:
	$scope.emails = [];

}
