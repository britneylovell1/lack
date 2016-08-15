var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: '/templates/admin.html',
    controller: function ($scope, EmailFactory) {

      $scope.newMemberEmails = [];
      $scope.teamObj = {name: 'ExampleName', $id: 'ExampleId'}
      $scope.showSuccess = false;

      $scope.inviteNewMembers = function () {
        $scope.teamObj.emails = $scope.newMemberEmails;
        return EmailFactory.sendInvitations($scope.teamObj)
        .then(function (res) {
          $scope.showSuccess = true;
          return res.data;
        })
      }

    }
  });
};
