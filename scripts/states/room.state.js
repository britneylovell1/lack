var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('home.room', {
    url: '/home/teams/:teamId/rooms/:roomId',
    templateUrl: '/templates/room.html',
    controller: function($scope, $state, $firebaseArray, $stateParams) {

      $scope.room = $stateParams.roomId;

      function createMessages () {
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
