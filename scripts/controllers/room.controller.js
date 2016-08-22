var angular = require('angular');
var app = angular.module('lack');

// TODO:
// put teamMembers in the resolve
// associate rooms with teams

module.exports = function($log, $rootScope, $scope, $state, $stateParams, $firebaseObject, roomFactory, UserFactory, AssocFactory, $mdToast, $location, TeamFactory) {

  var members = [];
  // get the team members
  TeamFactory.getCurrentTeam()
    .then(function(team) {
      // put the current team on the scope for room association
      $scope.team = team;
      return TeamFactory.getTeamMembers(team.$id).$loaded();

    })
    .then(function(teamMembers) {
      // Reformat teamMembers array for the query
      console.log('teamMembers', teamMembers);
      members = roomFactory.members(teamMembers);

      $scope.querySearch = function(query) {
        var results = query ? members.filter(roomFactory.createFilterFor(query)) : null;
        return results;
      };

    });

  // create the room
  $scope.room = roomFactory.createRoom();
  $scope.user = UserFactory.getCurrentUser();
  $scope.user.display = $scope.user.displayName;

  console.log('user', $scope.user);
  $scope.chipsmembers = [$scope.user];

  $scope.saveRoom = function() {

    $scope.room.$save()
      //console.log('chips', $scope.chipsmembers);
      .then(function() {
        $mdToast.show($mdToast.simple().textContent('Room created!'));

        // create user-room associations
        $scope.chipsmembers.forEach(function(member) {
          console.log('members', member);
          AssocFactory.assocUserRoom(member, $scope.room);
        });
        // make this user the admin
        roomFactory.addRoomAdmin($scope.user, $scope.room);
        // add the team to the room
        AssocFactory.assocTeamRoom($scope.team, $scope.room)
          .then(function() {
            // go to home room
            $state.go('home.room', { roomId: $scope.room.$id });
          });

      })
      .catch(function(error) {
        $mdToast.show($mdToast.simple().textContent('Error!'));
      });
  };
};
