var angular = require('angular');

module.exports = angular.module('lack', [
  require('angular-ui-router'),
  require('angular-animate'),
  require('angular-aria'),
  require('angular-material')
])

//states:
.config(require('./states/create_room.state.js'))
.config(require('./states/landing.state.js'))
.config(require('./states/login.state.js'))
.config(require('./states/create_team.state.js'))
.config(require('./states/google_signup.state.js'))
.config(require('./states/join_team.state.js'))
.config(require('./states/close_room.state.js'))
.config(require('./states/home.state.js'))

//directives:
.directive('navbar', require('./directives/navbar.directive.js'))
.directive('sidebar', require('./directives/sidebar.directive.js'))

//prettify URLs - comment back in for deployment:
// .config(function ($locationProvider) {
//   $locationProvider.html5Mode(true);
// })

//set themes:
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('indigo');
});

