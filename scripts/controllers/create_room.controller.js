var angular = require('angular');
var app = angular.module('lack');

// TODO:
// put teamMembers in the resolve

module.exports = function ($log, $rootScope, $scope, $state, $stateParams, $firebaseObject, roomFactory, UserFactory, AssocFactory, $mdToast, $location, TeamFactory) {

  // get the team members
  TeamFactory.getCurrentTeam()
  .then(function (team) {
    // put the current team on the scope for room association
    $scope.team = team;
    return TeamFactory.getTeamMembers(team.$id).$loaded();

  })
  .then(function (teamMembers) {
    // Reformat teamMembers array for the query
    var members = roomFactory.members(teamMembers);

    $scope.querySearch = function (query) {
      var results = query ? members.filter(roomFactory.createFilterFor(query)) : null;
      return results;
    };

  });

  // create the room
  $scope.room = roomFactory.createRoom();
  $scope.user = UserFactory.getCurrentUser();

  // we'd want to lookup the members in the database and then send those with the room to the database
  $scope.chipsmembers = [];

  $scope.saveRoom = function () {

    $scope.room.$save()
    .then(function () {
      $mdToast.show($mdToast.simple().textContent('Room created!'));

      // create user-room associations
      $scope.chipsmembers.forEach(function (member) {
        AssocFactory.assocUserRoom(member, $scope.room);
      });
      // make this user the admin
      roomFactory.addRoomAdmin($scope.user, $scope.room);
      // add the team to the room
      AssocFactory.assocTeamRoom($scope.team, $scope.room)
      .then(function () {
        // go to home room
        $state.go('home.room', { teamId: $stateParams.teamId, roomId: $scope.room.$id});
      });

    })
    .catch(function (error) {
      $mdToast.show($mdToast.simple().textContent('Error!'));
    });
  };
};
