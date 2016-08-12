var angular = require('angular');

module.exports = angular.module('lack', [
  require('angular-ui-router'),
  require('angular-animate'),
  require('angular-aria'),
  require('angular-material')
])
.config(function ($stateProvider) {
  $stateProvider.state('createRoom', {
    url: '/create-room',
    template: '<h1>Hi</h1>',
    controller: function ($scope) {
     console.log('changing state');
    }
  });
});
