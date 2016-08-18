var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/templates/home.html',
    controller: function($scope, $state, $firebaseArray, $rootScope) {
      $scope.currentRoom = { name: 'Current Room' };

      //ref for new messages
      var newMessagesRef = firebase.database().ref('messages');

      function createMessages() {
        return $firebaseArray(newMessagesRef);
      }

      $scope.messages = createMessages();
      $scope.saveMessage = function(message) {
        newMessagesRef.push({
          sender: 'Elisabeth',
          text: message
        });
        roomRef.push({
          sender: 'Ashi',
          text: message
        });
        $scope.message.text = '';
      };
      var out = document.getElementById("out");
      var isScrolledToBottom = true;
      out.addEventListener('scroll', function() { isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1; });
      $scope.scroller = function() {
        // allow 1px inaccuracy by adding 1
        // console.log(isScrolledToBottom);
        // scroll to bottom if isScrolledToBotto
        if (isScrolledToBottom) {
          out.scrollTop = out.scrollHeight - out.clientHeight;
        }
      };

      $scope.messages.$watch(function() {
        $scope.$$postDigest($scope.scroller);
      });
    }
  });
};
