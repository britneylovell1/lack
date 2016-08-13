var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('friendlyChat', {
    url: '/friendly-chat',
    template: '<h1>Friendly Chat</h1>'
  })
}
