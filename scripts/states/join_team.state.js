var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('joinTeam', {
    url: '/join-team',
    templateUrl: '/templates/join_team.html',
    controller: function ($rootScope, $scope, $state, $location, $firebaseObject, UserFactory, TeamFactory, AssocFactory, $mdToast) {
      // TODO:
      // REMEMBER TO PULL FROM MASTER

      $scope.team = {
        id: $location.search().teamId,
        name: $location.search().teamName
      };

      // sign up as a team member
      $scope.signUp = function() {

        UserFactory.signIn()
        .then(function(user) {
          // associate user with team
          return AssocFactory.assocUserTeam(user, $scope.team)
        })
        .then(function() {
          // go to user home page
          $state.go('home', {teamId: $scope.team.id});
          
        })
        .catch(function(error) {
          $mdToast.show($mdToast.simple().textContent('Error!'));
        });

      }

    }
  })
}
