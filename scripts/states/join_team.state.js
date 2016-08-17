 var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('joinTeam', {
    url: '/join-team',
    templateUrl: '/templates/join_team.html',
    controller: function ($scope, UserFactory, $location, $firebaseAuth, $firebaseArray) {
      // TODO:
      // place current team on the $rootscope 
      // what's up with the pop-up? it pops up, but then signs you in automatically
      // make error message pretty for user
      
      // $scope.user;
      $scope.team = {
        id: $location.search().teamId,
        name: $location.search().teamName
      };
      
      
      // sign up as a team member 
      $scope.signUp = function() {

        UserFactory.signIn()
        .then(function(user) {

          // $scope.user = user;  

          // associate user with team 
          return UserFactory.assocUserTeam(user, $scope.team)

        });

      }
      
      // put current team on the $rootscope

    }
	})
}
