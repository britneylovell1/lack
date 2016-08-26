var angular = require('angular');
var app = angular.module('lack');

module.exports = function($scope, $mdToast, UserFactory, roomFactory, TeamFactory) {

  TeamFactory.getCurrentTeam()
    .then(function(team) {
      $scope.team = team;
      return TeamFactory.getTeamMembers(team.$id).$loaded();
    })
    .then(function(teamMembers) {
      var members = roomFactory.members(teamMembers);
      $scope.querySearch = function(query) {
        var results = query ? members.filter(roomFactory.createFilterFor(query)) : null;
        return results;
      };
    });

  //TODO: fetch buzzwords and VIPs from firebase:
  $scope.buzzwords = ['immediately', 'angry', 'finance'];
  $scope.vips = [];


  var user = UserFactory.getCurrentUser();
  var settingsRef = firebase.database().ref('users/' + user.uid).child('settings');


  $scope.submitBuzzwords = function() {

    var buzzInfo = {}
    $scope.buzzwords.forEach(function(word) {
      buzzInfo[word] = true;
    })
    settingsRef.child('buzz-words').update(buzzInfo);

    $mdToast.show($mdToast.simple().textContent('Updated your buzzwords!'));
  };

  $scope.submitVIPs = function() {
    var vipInfo = {}
    $scope.vips.forEach(function(word) {
      vipInfo[word.display] = true;
    });
    // console.log(vipInfo);
    settingsRef.child('VIPs').update(vipInfo);

    $mdToast.show($mdToast.simple().textContent('Updated your VIPs!'));
  };

};
