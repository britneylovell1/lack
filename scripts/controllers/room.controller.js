var angular = require('angular');
var app = angular.module('lack');

// TODO:
// get current team from url
// get current team members
// which home do we go to?

module.exports = function($log, $rootScope, $scope, $state, $firebaseObject, roomFactory, UserFactory, teamMembers, AssocFactory, $mdToast) {

  // Reformat teamMembers array for the query
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
      // go to which home? is it the room?
      $state.go('home', {teamId: $scope.team.id});
    })
    .catch(function(error) {
      $mdToast.show($mdToast.simple().textContent('Error!'));
    });
  };
};
