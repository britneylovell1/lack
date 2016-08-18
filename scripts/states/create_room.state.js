var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/create-room',
    templateUrl: '/templates/create_room.html',
    controller: function($log, $rootScope, $scope, $firebaseObject, $state, roomFactory, TeamFactory) {
      // TODO:
      // get team users from $rootscope.teamUsers
      // maybe we should assign an active team/active room
      // assoc. room with team
      // assoc. users with room



      console.log('TeamFactory.getCurrentTeam ', TeamFactory.getCurrentTeam());
      console.log('TeamFactory.getTeamMembers ', TeamFactory.getTeamMembers());

      // var teamMembers = TeamFactory.getTeamMembers();

      // $scope.roomMembers = roomFactory.members(teamMembers);

      $scope.querySearch = function(query) {
        var results = query ? $scope.members.filter(roomFactory.createFilterFor(query)) : null;
        return results;
      };

      $scope.room = roomFactory.createRoom();

      // we'd want to lookup the members in the database and then send those with the room to the database
      $scope.chipsmembers = [];

      $scope.saveRoom = function() {
        $scope.room.members = $scope.chipsmembers;
        $scope.room.$save().then(function() {
          alert('Room created!');
          $state.go('home');
        }).catch(function(error) {
          alert('Error!');
        });
      };
    }
  });
};
