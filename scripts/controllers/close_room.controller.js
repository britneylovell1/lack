var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($scope, $state, $mdToast, EmailFactory, $stateParams, TeamFactory, roomData, $firebaseArray, AdminUserFactory, roomMembers) {

  //send back to home if not room admin:
  AdminUserFactory.checkIfRoomAdmin($stateParams.roomId)
    .then(function (res) {
      if (!res){
        $state.go('home');
      }
  });

  //fetch resolved room and members:
  $scope.currentRoom = roomData;
  $scope.allMembers = roomMembers;

  //fetch notes and array of member IDs from form
  $scope.data = {};

  $scope.closeRoom = function () {
    // 1) delete room for each room member:
    var membersRef = firebase.database().ref('rooms/' + $stateParams.roomId + '/members');
    var members = $firebaseArray(membersRef);
    members.$loaded().then(function () {
      members.forEach(function (member, index) {
        var refToRooms = firebase.database().ref('users/' + member.$id + '/rooms');
        var roomsArr = $firebaseArray(refToRooms);
        roomsArr.$loaded().then(function () {
          var indexToRemove = roomsArr.$indexFor($stateParams.roomId);
          roomsArr.$remove(indexToRemove).then(function () {
            if (index === members.length - 1) {
              // 2) email notes to each selected member:
              var emails = [];
              $scope.allMembers.forEach(function (member) {
                return firebase.database().ref('/users/' + member.$id + '/email')
                .once('value')
                .then(function (snapshot) {
                  emails.push(snapshot.val());
                  if (emails.length === $scope.data.members.length){
                    $scope.data.emails = emails;
                    $scope.data.roomName = $scope.currentRoom.name;
                    $scope.data.objective = $scope.currentRoom.objective;
                    EmailFactory.sendRoomNotes($scope.data);
                    // 3) delete room from firebase:
                    var allRoomsRef = firebase.database().ref('rooms');
                    var allRooms = $firebaseArray(allRoomsRef);
                    allRooms.$loaded().then(function () {
                      var roomIndex = allRooms.$indexFor($stateParams.roomId);
                      allRooms.$remove(roomIndex).then(function () {
                        $mdToast.show($mdToast.simple().textContent('Room closed!'));
                        $state.go('home', {teamId: $stateParams.teamId});
                      });
                    });
                  }
                });
              });
            }
          });
        });
      });
    });
  };
};


