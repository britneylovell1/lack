var angular = require('angular');
var app = angular.module('lack');

module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: '../templates/sidebar.html',
    scope: {
      highPriRooms: '=',
      lowPriRooms: '='
    }
  };
};
