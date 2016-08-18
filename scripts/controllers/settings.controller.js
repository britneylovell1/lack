var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($scope, $mdToast) {

  //TODO: fetch buzzwords and VIPs from firebase:
  $scope.buzzwords = ['immediately', 'angry', 'finance'];
  $scope.vips = ['Maggie', 'Britney', 'Liz'];

  //TODO: update buzzwords in FB:
  $scope.submitBuzzwords = function () {
    $mdToast.show($mdToast.simple().textContent('Updated your buzzwords!'));
  };

  //TODO: update VIPs in FB:
  $scope.submitVIPs = function () {
    $mdToast.show($mdToast.simple().textContent('Updated your VIPs!'));
  };

};
