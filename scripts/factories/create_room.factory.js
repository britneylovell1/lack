var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($firebaseArray, $firebaseObject) {


  //helper function for members list
  var currentRoomRef = null;

  function loadAll() {
    // when there are members on a team... the call for the array would be here

    var allMembers = $rootscope.membersArr;
    // ['Maggie', 'Elisabeth', 'Britney', 'Brianna', 'Matilda', 'Emily'];
    return allMembers.map(function(member) {
      return {
        value: member.userName.toLowerCase(),
        display: member.userName,
        userId: member.userId 
      };
    });
  }



  // factory methods

  var fac = {};

  // fac.members = loadAll();
  fac.members = function(teamMembers) {
    // when there are members on a team... the call for the array would be here

    // var allMembers = $rootscope.membersArr;
    // ['Maggie', 'Elisabeth', 'Britney', 'Brianna', 'Matilda', 'Emily'];
    return teamMembers.map(function(member) {
      return {
        value: member.userName.toLowerCase(),
        display: member.userName,
        userId: member.userId 
      };
    });
  }

  fac.createFilterFor = function(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(member) {
      return (member.value.indexOf(lowercaseQuery) === 0);
    };
  };

  fac.createRoom = function() {
    var newRoomRef = firebase.database().ref('rooms').push();
    currentRoomRef = newRoomRef;
    return $firebaseObject(newRoomRef);
  };

  fac.assocUserRoom = function(user, room) {

    // associate the users with the teams
    var userInfo = {
      userId: user.uid,
      userName: user.displayName
    };

    var roomId = room.id || room.$id
    var roomInfo = {
      roomId: roomId,
      roomName: room.name
    };

    // set up references
    var userRef = firebase.database().ref().child('users/' + user.uid + '/rooms');
    var roomRef = firebase.database().ref().child('rooms/' + roomId + '/members');

    // wait for the user to be created in the database
    // firebase.database().ref().child('users/' + user.uid).once('child_added')
    // .then(function() {

      // add team to 'users' model
      $firebaseArray(userRef).$add(roomInfo);

      // add user to 'rooms' model
      $firebaseArray(roomRef).$add(userInfo);
    // })

    return user;

  }

  fac.addRoomAdmin = function(user, room) {
    // add a user as an admin on the teams model
    var userInfo = {
      userId: user.uid,
      userName: user.displayName
    };
    var roomId = room.id || room.$id; 

    var roomRef = firebase.database().ref().child('rooms/' + roomId + '/admin');

    $firebaseArray(roomRef).$add(userInfo);

  }

  return fac;
};
