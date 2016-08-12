var app = require('../app.js');

app.config(function ($stateProvider) {

  $stateProvider.state('createRoom', {
    url: '/create-room',
    templateUrl: './test.html',
    controller: function ($scope) {
      $scope.test = "Testing";
    }
  });
});
