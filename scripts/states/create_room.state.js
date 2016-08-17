var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/create-room',
    templateUrl: '/templates/create_room.html',
    controller: function($log, $rootScope, $scope, $firebaseObject, $state, roomFactory) {
      // TODO:
      // get team users from $rootscope.teamUsers
      // assoc. room with team
      // assoc. users with room
      console.log($rootScope.membersArr);

      // $scope.members = roomFactory.members($rootScope.membersArr);
      // console.log($scope.members);


      $scope.querySearch = function(query) {
        var results = query ? $scope.members.filter(roomFactory.createFilterFor(query)) : null;
        return results;
      };

      function createRoom() {
        var newRoomRef = firebase.database().ref('rooms').push();
        return $firebaseObject(newRoomRef);
      }

      $scope.room = createRoom();

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
