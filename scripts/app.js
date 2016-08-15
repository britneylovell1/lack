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
.config(require('./states/google_signup.state.js'))
.config(require('./states/join_team.state.js'))
.config(require('./states/close_room.state.js'))
.config(require('./states/home.state.js'))
.config(require('./states/create_your_team.state.js'))
.config(require('./states/admin.state.js'))

//directives:
.directive('navbar', require('./directives/navbar.directive.js'))
.directive('sidebar', require('./directives/sidebar.directive.js'))

//factories:
.factory('EmailFactory', require('./factories/email.factory.js'))

//prettify URLs - comment back in for deployment:
// .config(function ($locationProvider) {
//   $locationProvider.html5Mode(true);
// })

.factory('userFactory', require('./factories/user.factory.js'))

//set themes:
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('amber');
});
