var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/create-room',
    templateUrl: '/templates/create_room.html',
    resolve: {
      teamMembers: function(TeamFactory) { 
        return TeamFactory.getTeamMembers().$loaded()
      }
    },
    controller: function($log, $rootScope, $scope, $state, $firebaseObject, roomFactory, UserFactory, teamMembers) {
      // TODO:
      // get team users from $rootscope.teamUsers
      // assoc. room with team
      // assoc. users with room

      // reformat teamMembers array
      var members = roomFactory.members(teamMembers);
      console.log(members);

      $scope.querySearch = function(query) {
        var results = query ? members.filter(roomFactory.createFilterFor(query)) : null;
        return results;
      };

      // create the room
      $scope.room = roomFactory.createRoom();
      $scope.user = UserFactory.getCurrentUser();

      // we'd want to lookup the members in the database and then send those with the room to the database
      $scope.chipsmembers = [];

      $scope.saveRoom = function() {
        // $scope.room.members = $scope.chipsmembers;
        $scope.room.$save().then(function() {
          alert('Room created!');

          // create user-room associations
          // haven't tested this out yet! This is just pseudo-code
          // need to figure out $scope.room.members formatting
          $scope.chipsmembers.forEach(function(member) {
            console.log(member);
            roomFactory.assocUserRoom(member, $scope.room)
          })

          // make this user the admin
          roomFactory.addRoomAdmin($scope.user, $scope.room)

          $state.go('home');



        }).catch(function(error) {
          alert('Error!');
        });
      };
    }
  });
};
