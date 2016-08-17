 var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('joinTeam', {
    url: '/join-team',
    templateUrl: '/templates/join_team.html',
    controller: function ($scope, $state, $location, UserFactory, TeamFactory) {
      // TODO:
      // what's up with the pop-up? it pops up, but then signs you in automatically
      // make error message pretty for user

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
          TeamFactory.assocUserTeam(user, $scope.team)

          // go to user home page
          $state.go('home');

        });

      }

    }
  })
}
