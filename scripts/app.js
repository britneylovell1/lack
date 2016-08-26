var angular = require('angular');
module.exports = angular.module('lack', [
  require('angular-ui-router'),
  require('angular-animate'),
  require('angular-aria'),
  require('angular-material'),
  require('angularfire'),
  require('angular-messages')
])

//states:
.config(require('./states/create_room.state.js'))
.config(require('./states/landing.state.js'))
.config(require('./states/login.state.js'))
.config(require('./states/join_team.state.js'))
.config(require('./states/close_room.state.js'))
.config(require('./states/home.state.js'))
.config(require('./states/create_your_team.state.js'))
.config(require('./states/admin.state.js'))
.config(require('./states/room.state.js'))
.config(require('./states/settings.state.js'))

//directives:
.directive('navbar', require('./directives/navbar.directive.js'))
.directive('sidebar', require('./directives/sidebar.directive.js'))


//factories:
.factory('EmailFactory', require('./factories/email.factory.js'))
.factory('roomFactory', require('./factories/create_room.factory.js'))
.factory('AdminUserFactory', require('./factories/admin_user.factory.js'))
.factory('UserFactory', require('./factories/user.factory.js'))
.factory('TeamFactory', require('./factories/create_team.factory.js'))
.factory('AssocFactory', require('./factories/association.factory.js'))
.factory('MessageFactory', require('./factories/message.factory.js'))

//controllers:
.controller('AdminController', require('./controllers/admin.controller.js'))
.controller('TeamController', require('./controllers/team.controller.js'))
.controller('CreateRoomController', require('./controllers/create_room.controller.js'))
.controller('RoomController', require('./controllers/room.controller.js'))
.controller('SettingsController', require('./controllers/settings.controller.js'))
.controller('LoginController', require('./controllers/login.controller.js'))
.controller('CloseRoomController', require('./controllers/close_room.controller.js'))

//prettify URLs:
.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
})

//set themes:
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('amber');
});
