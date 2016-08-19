var angular = require('angular');
var app = angular.module('lack');

// TODO:
// put teamMembers in the resolve

module.exports = function($log, $rootScope, $scope, $state, $stateParams, $firebaseObject, roomFactory, UserFactory, AssocFactory, $mdToast, $location, TeamFactory) {
  
  // get the team members
  TeamFactory.getCurrentTeamId()
  .then(function(teamId) {
    return TeamFactory.getTeamMembers(teamId).$loaded();

  })
  .then(function(teamMembers) {
    // Reformat teamMembers array for the query
    var members = roomFactory.members(teamMembers);

    $scope.querySearch = function(query) {
      var results = query ? members.filter(roomFactory.createFilterFor(query)) : null;
      return results;
    };

  })


  // create the room
  $scope.room = roomFactory.createRoom();
  $scope.user = UserFactory.getCurrentUser();

  // we'd want to lookup the members in the database and then send those with the room to the database
  $scope.chipsmembers = [];

  $scope.saveRoom = function() {
    
    $scope.room.$save()
    .then(function() {
      $mdToast.show($mdToast.simple().textContent('Room created!'));

      // create user-room associations
      $scope.chipsmembers.forEach(function(member) {
        AssocFactory.assocUserRoom(member, $scope.room)
      })     
      // make this user the admin
      return roomFactory.addRoomAdmin($scope.user, $scope.room)

    })
    .then(function() {
      // go to home room
      $state.go('home.room', { roomId: $scope.room.$id});
    })
    .catch(function(error) {
      $mdToast.show($mdToast.simple().textContent('Error!'));
    });
  };
};
