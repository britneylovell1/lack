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
    controller: function ($scope, $state, $mdToast, EmailFactory, $stateParams, TeamFactory, roomMembers, roomData) {

      //fetch resolved room object:
      $scope.currentRoom = roomData;

      //fetch all team members in room:
      $scope.allMembers = roomMembers;
      //have .userName and .$id properties

      //fetch notes and array of member IDs from form
      $scope.data = {};
      //has .members Array of member IDs as strings and notes as string

      $scope.closeRoom = function () {

        console.log('$SCOPE.DATA: ', $scope.data);

        //TODO: fetch email address of each selected member and add to data obj.
        var emails = [];
        $scope.data.members.forEach(function (memberId) {
          return firebase.database().ref('/users/' + memberId + '/email')
          .once('value')
          .then(function (snapshot) {
            emails.push(snapshot.val());
            if (emails.length === $scope.data.members.length){

              console.log('EMAILS: ', emails);


            }
          });
        });

        //TODO: finish this factory function
        // EmailFactory.sendRoomNotes($scope.data)
        // .then(function () {

        //   //TODO: delete room from everywhere it is stored in firebase

        //   $mdToast.show($mdToast.simple().textContent('Room closed!'));
        //   $state.go('home');

        // });

      };

    }
  });
};



