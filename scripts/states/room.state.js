var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($stateProvider) {
  $stateProvider.state('home.room', {
    url: '/rooms/:roomId',
    templateUrl: '/templates/room.html',
    controller: function($scope, $state, $firebaseArray, $stateParams, UserFactory, AdminUserFactory, $firebaseObject) {

      $scope.isRoomAdmin = false;

      AdminUserFactory.checkIfRoomAdmin($stateParams.roomId)
        .then(function(res) {
          $scope.isRoomAdmin = res;
        });

      $scope.roomId = $stateParams.roomId;

      var roomRef = firebase.database().ref('rooms/' + $stateParams.roomId);

      $scope.theRoom = $firebaseObject(roomRef);
      $scope.theRoom.date = new Date($scope.theRoom.date);

      $scope.isRoom = function() {
        return $scope.roomId;
      };

      function createMessages() {
        var newMessagesRef = firebase.database().ref('messages').child($scope.roomId);
        return $firebaseArray(newMessagesRef);
      }

      var user = UserFactory.getCurrentUser();

      var userPic = function() {
        return user.photoURL ? user.photoURL : 'https://3.bp.blogspot.com/-W__wiaHUjwI/Vt3Grd8df0I/AAAAAAAAA78/7xqUNj8ujtY/s1600/image02.png';
      };

      $scope.messages = createMessages();
      $scope.saveMessage = function(message) {
        var newMessageRef = firebase.database().ref('messages').child($scope.roomId);
        newMessageRef.push({
          sender: user.displayName,
          photo: userPic(),
          text: message,
          timeSent: new Date().toString()
        });
        $scope.message.text = '';
      };

      $scope.toJsDate = function(str) {
        if (!str) return null;
        return new Date(str);
      };

      // Scroll bar
      var out = document.getElementById('out');
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
