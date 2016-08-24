var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($scope, $mdToast, UserFactory) {

  //TODO: fetch buzzwords and VIPs from firebase:
  $scope.buzzwords = ['immediately', 'angry', 'finance'];
  $scope.vips = ['Maggie', 'Britney', 'Liz'];

  
  var settingsRef = (_ => firebase.database()
                     .ref('users').child(UserFactory.getCurrentUser().uid).child('settings'))


  $scope.submitBuzzwords = function () {

    var buzzInfo = {}  
    $scope.buzzwords.forEach(function (word) {
      buzzInfo[word] = true;
    })
    settingsRef().child('buzz-words').update(buzzInfo);

    $mdToast.show($mdToast.simple().textContent('Updated your buzzwords!'));
  };

  $scope.submitVIPs = function () {
    var vipInfo = {}  
    $scope.vips.forEach(function (word) {
      vipInfo[word] = true;
    })
    settingsRef().child('VIPs').update(vipInfo);

    $mdToast.show($mdToast.simple().textContent('Updated your VIPs!'));
  };

};
