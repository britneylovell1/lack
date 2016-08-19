var angular = require('angular');
var app = angular.module('lack');

// TODO:
// use Promise.all in team.$save
// figure out team.id or .$id

module.exports = function($rootScope, $scope, $firebaseArray, $firebaseObject, $state, EmailFactory, UserFactory, TeamFactory, AssocFactory, $mdToast) {

  // set $scope.team to new team obj 
	$scope.team = TeamFactory.createTeam();

	// save team.name and team.members in firebase
	$scope.saveTeam = function() {

		$scope.team.emails = $scope.emails;

		EmailFactory.sendInvitations($scope.team);

		$scope.team.$save()
		.then(function() {
      $mdToast.show($mdToast.simple().textContent('Team saved!'));

      UserFactory.signIn()
        .then(function(user) {

          // associate user with team
          AssocFactory.assocUserTeam(user, $scope.team)
          // set this user as the admin
          return TeamFactory.addTeamAdmin(user, $scope.team);
        })
        .then(function() {
        	// is it team.id or team.$id????
	        $state.go('home', {teamId: $scope.team.id});
	      })

    }).catch(function(error) {
      $mdToast.show($mdToast.simple().textContent('Error!'));
    })

	}

	//initialize empty array for Angular Material chips:
	$scope.emails = [];

}
