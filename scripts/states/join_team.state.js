 var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('joinTeam', {
    url: '/join-team',
    templateUrl: '/templates/join_team.html',
    controller: function ($scope, UserFactory, $location, $firebaseAuth, $firebaseArray) {
      // TODO:
      // associate user with team 
      // place current team on the $rootscope 
      // what's up with the pop-up? it pops up, but then signs you in automatically
      // make error message pretty for user
      
      $scope.user;
      $scope.teamName = $location.search().teamName;
      $scope.teamId = $location.search().teamId;
      
      // sign up as a team member (not the admin)
      $scope.signUp = function() {

        UserFactory.signIn(adminStatus = false)
        .then(function(user) {

          $scope.user = user;  

          // associate user with team 
          UserFactory.assocUserTeam($scope.user, $scope.teamId)

        });

      }
      
      
      // put current team on the $rootscope

    }
	})
}
