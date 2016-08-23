var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($firebaseArray, $firebaseObject) {

  var currentRoomRef = null; //does this persist? - not when I refresh the page! Spend some time figuring out persistence

  // factory methods

  var fac = {};

  fac.members = function(teamMembers) {

    // reformat teamMembers array
    return teamMembers.map(function(member) {
      return {
        value: member.userName.toLowerCase(),
        display: member.userName,
        userId: member.$id
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

    // set the current room to the new room
    currentRoomRef = newRoomRef;

    return $firebaseObject(newRoomRef);
  };

  fac.addRoomAdmin = function(user, room) {
    // add a user as an admin on the teams model
    // console.log('in room admin')

    // set up association variables
    var userInfo = {
      [user.uid]: { userName: user.displayName }
    };
    var roomId = room.id || room.$id;

    // create admin entry and set up reference to it
    var roomRef = firebase.database().ref().child('rooms/' + roomId + '/admin');

    // create the admin association in firebase
    roomRef.update(userInfo);

  }

  return fac;
};
