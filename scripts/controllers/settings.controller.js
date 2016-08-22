var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($scope, $mdToast, UserFactory) {

  //TODO: fetch buzzwords and VIPs from firebase:
  // $scope.buzzwords = ['immediately', 'angry', 'finance'];
  // $scope.vips = ['Maggie', 'Britney', 'Liz'];
  $scope.buzzwords = [];

  
  var user = UserFactory.getCurrentUser();
  var settingsRef = firebase.database().ref('users/' + user.uid).child('settings');


  //TODO: update buzzwords in FB:
  $scope.submitBuzzwords = function () {
    console.log($scope.buzzwords);
    var buzzInfo = {}  
    $scope.buzzwords.forEach(function (word) {
      buzzInfo[word] = true;
    })
    settingsRef.child('buzz-words').update(buzzInfo);

    $mdToast.show($mdToast.simple().textContent('Updated your buzzwords!'));
  };

  //TODO: update VIPs in FB:
  $scope.submitVIPs = function () {
    var vipInfo = {}  
    $scope.vips.forEach(function (word) {
      vipInfo[word] = true;
    })
    settingsRef.child('VIPs').update(vipInfo);

    $mdToast.show($mdToast.simple().textContent('Updated your VIPs!'));
  };

};
