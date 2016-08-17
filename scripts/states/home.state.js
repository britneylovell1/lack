var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/templates/home.html',
    controller: function($scope, $state, $firebaseArray) {
      $scope.currentRoom = { name: 'Current Room' };
      $scope.rooms = [{ name: 'Example1' }, { name: 'Example2' }, { name: 'Example3' }, { name: 'Example4' }];

      function createMessages() {
        var newMessagesRef = firebase.database().ref('messages');
        return $firebaseArray(newMessagesRef);
      }

      $scope.messages = createMessages();

      $scope.saveMessage = function(message) {
        var newMessageRef = firebase.database().ref('messages');
        newMessageRef.push({
          sender: 'Elisabeth',
          text: $scope.message.text
        });
      };

      $scope.saveMessages = function() {
        $scope.messages.$save().then(function() {
          console.log('Messages saved!');
        }).catch(function(error) {
          console.log(error);
        });
      };
    }
  });
};
