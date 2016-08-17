var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function() {


  //helper function for members list
  function loadAll() {
    // when there are members on a team... the call for the array would be here
    var allMembers = ['Maggie', 'Elisabeth', 'Britney', 'Brianna', 'Matilda', 'Emily'];
    return allMembers.map(function(member) {
      return {
        value: member.toLowerCase(),
        display: member
      };
    });
  }

  var fac = {};

  fac.members = loadAll();

  fac.querySearch = function(query) {
    var results = query ? this.members.filter(this.createFilterFor(query)) : null;
    return results;
  };

  fac.createFilterFor = function(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(member) {
      return (member.value.indexOf(lowercaseQuery) === 0);
    };
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
