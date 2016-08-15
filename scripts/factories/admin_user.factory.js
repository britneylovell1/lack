var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function () {
  return {
    makeAdmin: function (teamId, userId) {
      console.log('hello');
    }
  }
};
