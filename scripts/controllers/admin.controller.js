var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($scope, EmailFactory, AdminUserFactory, $firebaseObject, $firebaseArray, TeamFactory, $state, $mdToast, $rootScope) {

    if (!$rootScope.isAdmin){
      $state.go('home');
    }

    //fetch current userId:
    $scope.currentUserId = firebase.auth().currentUser.uid;

    //fetch team and all members
    TeamFactory.getCurrentTeam()
    .then(function (team) {
      $scope.currentTeam = team;
      return TeamFactory.getTeamMembers(team.$id).$loaded();
    })
    .then(function (teamMembers) {
      $scope.teamMembers = teamMembers;
    });

    //initialize forms:
    $scope.newMemberEmails = [];
    $scope.selectedMember = null;

    $scope.inviteNewMembers = function () {
      var data = {$id: $scope.currentTeam.$id, name: $scope.currentTeam.teamName, emails: $scope.newMemberEmails};
      EmailFactory.inviteNewMembers(data);
      $scope.newMemberEmails = [];
      $mdToast.show($mdToast.simple().textContent('Your invitations are on their way!'));
    };

    $scope.makeAdmin = function () {
      $scope.selectedMember.uid = $scope.selectedMember.$id;
      $scope.selectedMember.displayName = $scope.selectedMember.userName;
      TeamFactory.addTeamAdmin($scope.selectedMember, $scope.currentTeam);
      $scope.selectedMember = null;
      $mdToast.show($mdToast.simple().textContent('Successfully upgraded to admin!'));
    };

    $scope.removeFromTeam = function () {
      AdminUserFactory.removeFromTeam($scope.currentTeam.$id, $scope.teamMembers, $scope.selectedMember);
      $scope.selectedMember = null;
      $mdToast.show($mdToast.simple().textContent('Successfully removed user.'));
    };

};


