var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('home.room', {
    url: '/rooms/:roomId',
    templateUrl: '/templates/room.html',
    controller: function($scope, $state, $firebaseArray, $stateParams, UserFactory) {

      $scope.roomId = $stateParams.roomId;

      function createMessages() {
        var newMessagesRef = firebase.database().ref('messages');
        return $firebaseArray(newMessagesRef);
      }

      var user = UserFactory.getCurrentUser();
      $scope.currentDate = new Date();

      $scope.messages = createMessages();
      $scope.saveMessage = function(message) {
        var newMessageRef = firebase.database().ref('messages');
        newMessageRef.push({
          sender: user.displayName,
          photo: user.photoURL,
          text: message,

        });
        $scope.message.text = '';
        // message.input.$setPristine(true);
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
