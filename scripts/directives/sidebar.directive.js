var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($state) {
  return {
    restrict: 'E',
    templateUrl: '../templates/sidebar.html',
    scope: {
     rooms: '=',
     currentTeamId: '='
    },
    link: function (scope, element, attrs) {

    }
  };
};
