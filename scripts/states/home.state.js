var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/templates/home.html',
    controller: function($scope, $state, $firebaseArray) {
      
      // maybe we put the current team/room on the rootScope here? (rather than upon sign in?)
      $scope.currentTeam;
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
          text: message
        });
        $scope.message.text = '';
        message.input.$setPristine(true);
      };




      // Scroll bar
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
