var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($scope, $rootScope, EmailFactory, AdminUserFactory, $firebaseObject, $firebaseArray, TeamFactory, $state) {

  //if user is not admin, redirect to home state so they can't access admin panel:
  if (!$rootScope.loggedIn || !$rootScope.isAdmin){
    $state.go('landing');
  } else {

     //fetch all members and team info:
    var currentUserId = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('users').child(currentUserId);
    var obj = $firebaseObject(ref);

    obj.$loaded().then(function () {

      var teams = obj.teams;
      var firstTeamIndex = Object.keys(teams)[0];
      var teamId = teams[firstTeamIndex].teamId;

      var teamUsersRef = firebase.database().ref('teams').child(teamId + '/users');
      var membersArr = $firebaseArray(teamUsersRef);
      var teamRef = firebase.database().ref('teams').child(teamId);
      var teamObj = $firebaseObject(teamRef);

      teamObj.$loaded().then(function () {
        teamObj.$bindTo($rootScope, 'teamObj').then(function () {



        });
      });

      membersArr.$loaded().then(function () {
        $rootScope.membersArr = membersArr;
      });

    });

    //initialize add member form:
    $scope.newMemberEmails = [];
    $scope.addSuccess = false;

    //initialize edit member form:
    $scope.selectedMember = null;
    $scope.adminSuccess = false;
    $scope.deleteSuccess = false;

    //adding new members:
    $scope.inviteNewMembers = function () {

      $rootScope.teamObj.emails = $scope.newMemberEmails;
      return EmailFactory.sendInvitations($scope.teamObj)
      .then(function (res) {

        //update view:
        $scope.addSuccess = true;
        $scope.deleteSuccess = false;
        $scope.adminSuccess = false;
        $scope.newMemberEmails = [];

        return res.data;
      });
    };

    //editing existing member privileges:
    $scope.makeAdmin = function () {

      //makes selected user admin:
      TeamFactory.addTeamAdmin($scope.selectedMember, $rootScope.teamObj);

      //update view:
      $scope.addSuccess = false;
      $scope.adminSuccess = true;
      $scope.deleteSuccess = false;
      $scope.selectedMember = null;
    };

    $scope.removeFromTeam = function () {
      //TODO: remove user from team

      //removes user from team's users:
      $rootScope.membersArr.$remove($scope.selectedMember).then(function () {
        console.log('User removed, new membersArr is: ', $rootScope.membersArr);
      });

      //TODO: remove team from user's list of teams

      //TODO: removes user from team's admin (if user was admin):
      // var refAdmin = firebase.database().ref().child('teams/' + $rootScope.teamObj.$id + '/admin');
      // var indToRemove;
      // $firebaseArray(refAdmin).forEach(function (admin, index) {
      //   if (admin.userId === $scope.selectedMember.$id){
      //     indToRemove = index;
      //   }
      // });

      // if (indToRemove){
      //    $firebaseArray(refAdmin).$remove($firebaseArray(refAdmin)[indToRemove])
      //   .then(function () {
      //     console.log('admin removed');
      //   });
      // }

      //update view:
      $scope.addSuccess = false;
      $scope.adminSuccess = false;
      $scope.deleteSuccess = true;
      $scope.selectedMember = null;
    };

  }

};


