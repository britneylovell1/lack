var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function($firebaseArray, $firebaseObject) {

  var currentRoomRef = null; //does this persist? - not when I refresh the page! Spend some time figuring out persistence 

  // factory methods

  var fac = {};

  // fac.members = loadAll();
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

  fac.setCurrentRoom = function() {
    // FINISH THIS
  }

  fac.assocUserRoom = function(user, room) {

    // set up association variables
    var userInfo = {
      // userId: user.uid,      // This was for the first attempt
      // userName: user.displayName
    };
    userInfo[user.userId] = { userName: user.display };

    var roomId = room.id || room.$id
    var roomInfo = {
      // roomId: roomId,      // This was for the first attempt
      // roomName: room.name
    };
    roomInfo[roomId] = { roomName: room.name }

    // create user + room entries and set up references to them
    var userRef = firebase.database().ref().child('users/' + user.userId + '/rooms');
    var roomRef = firebase.database().ref().child('rooms/' + roomId + '/members');

    // create associations in firebase
    userRef.update(roomInfo);
    roomRef.update(userInfo);

    // This was for the first attempt
    // This is method created a new id for each $add()
    // $firebaseArray(userRef).$add(roomInfo);
    // $firebaseArray(roomRef).$add(userInfo);

    return user;

  }

  fac.addRoomAdmin = function(user, room) {
    // add a user as an admin on the teams model

    // set up association variables
    var userInfo = {
      // userId: user.uid,      // This was for the first attempt
      // userName: user.displayName
    };
    userInfo[user.uid] = { userName: user.displayName };
    var roomId = room.id || room.$id; 

    // create admin entry and set up reference to it
    var roomRef = firebase.database().ref().child('rooms/' + roomId + '/admin');

    // create the admin association in firebase
    roomRef.update(userInfo);

    // This was for the first attempt
    // This is method created a new id for each $add()
    // $firebaseArray(roomRef).$add(userInfo);

  }

  return fac;
};
