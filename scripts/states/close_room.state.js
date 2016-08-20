var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($stateProvider) {
  $stateProvider.state('closeRoom', {
    url: '/home/teams/:teamId/rooms/:roomId/close-room',
    templateUrl: '/templates/close_room.html',
    resolve: {
      roomMembers: function ($stateParams, $firebaseArray) {
        var membersRef = firebase.database().ref('rooms/' + $stateParams.roomId + '/members');
        return $firebaseArray(membersRef);
      },
      roomData: function ($stateParams, $firebaseObject) {
        var teamRef = firebase.database().ref('rooms/' + $stateParams.roomId);
        return $firebaseObject(teamRef);
      }
    },
    controller: function ($scope, $state, $mdToast, EmailFactory, $stateParams, TeamFactory, roomMembers, roomData, $firebaseArray) {

      //fetch resolved room object:
      $scope.currentRoom = roomData;

      //fetch all team members in room:
      $scope.allMembers = roomMembers;
      //have .userName and .$id properties

      //fetch notes and array of member IDs from form
      $scope.data = {};
      //has .members Array of member IDs as strings and notes as string

      $scope.closeRoom = function () {

        //fetch email address of each selected member and add to data obj.
        var emails = [];
        $scope.data.members.forEach(function (memberId) {
          return firebase.database().ref('/users/' + memberId + '/email')
          .once('value')
          .then(function (snapshot) {
            emails.push(snapshot.val());
            if (emails.length === $scope.data.members.length){
              $scope.data.emails = emails;
              $scope.data.roomName = $scope.currentRoom.name;
              $scope.data.objective = $scope.currentRoom.objective;

              //email notes:
              EmailFactory.sendRoomNotes($scope.data)
              .then(function () {

                //delete room from firebase
                var allRoomsRef = firebase.database().ref('rooms');
                var allRooms = $firebaseArray(allRoomsRef);

                allRooms.$loaded()
                .then(function () {

                  var indexToRemove = allRooms.$indexFor($stateParams.roomId);

                  allRooms.$remove(indexToRemove)
                  .then(function () {

                    //delete room from each user's list of rooms:
                    $scope.data.members.forEach(function (memberId) {

                      var refToRooms = firebase.database().ref('users/' + memberId + '/rooms');
                      var roomsArr = $firebaseArray(refToRooms);

                      roomsArr.$loaded()
                      .then(function () {

                        var indexToRemove2 = roomsArr.$indexFor($stateParams.roomId);

                        roomsArr.$remove(indexToRemove2)
                        .then(function () {
                          $mdToast.show($mdToast.simple().textContent('Room closed!'));
                          $state.go('home');
                        });
                      });
                    });
                  });
                });
              });
            }
          });
        });
      };
    }
  });
};



