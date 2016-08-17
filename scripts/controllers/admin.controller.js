var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function ($scope, EmailFactory, AdminUserFactory) {

  //initialize add member form:
  $scope.newMemberEmails = [];
  $scope.addSuccess = false;

  //initialize edit member form:
  $scope.selectedMember = null;
  $scope.adminSuccess = false;
  $scope.deleteSuccess = false;

  //adding new members:
  $scope.teamObj = {name: 'ExampleName', $id: 'ExampleId'}; //TODO: get team info dynamically

  $scope.inviteNewMembers = function () {
    $scope.teamObj.emails = $scope.newMemberEmails;
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
  $scope.existingMembers = [{name: 'Maggie'}, {name: 'Britney'}, {name: 'Elisabeth'}];
  //TODO: fetch all team members from firebase

  $scope.makeAdmin = function () {
    console.log('Make admin.');
    //TODO: use Britney's 'make-admin' function to add user id to team's admin array

    //update view:
    $scope.addSuccess = false;
    $scope.adminSuccess = true;
    $scope.deleteSuccess = false;
    $scope.selectedMember = null;
  };

  $scope.removeFromTeam = function () {

    AdminUserFactory.fetchAllTeamMembers();

    console.log('Remove from team.');
    //TODO: remove user from team

    //update view:
    $scope.addSuccess = false;
    $scope.adminSuccess = false;
    $scope.deleteSuccess = true;
    $scope.selectedMember = null;
  };

};


