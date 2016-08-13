var angular = require('angular');
module.exports = angular.module('lack', [
  require('angular-ui-router'),
  require('angular-animate'),
  require('angular-aria'),
  require('angular-material'),
  require('angularfire')
])

//states:
.config(require('./states/create_room.state.js'))
.config(require('./states/landing.state.js'))
.config(require('./states/login.state.js'))
.config(require('./states/create_your_team.state.js'))

//directives:
.directive('navbar', require('./directives/navbar.directive.js'))

//prettify URLs:
.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
})

//set themes:
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('indigo');
});
