var angular = require('angular');
var app = angular.module('lack');

module.exports = function($http) {

  return {

    sendInvitations: function (team) {

      return $http({
        url: 'http://localhost:3000/send-emails',
        method: 'POST',
        data: team,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(function (response) {
        // console.log('Success');
        return response.data;
      });
    }

  };

};
