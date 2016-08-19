var angular = require('angular');
var app = angular.module('lack');

module.exports = function($http) {

  return {

    sendInvitations: function (team) {

      return $http({
        url: 'https://pacific-lowlands-51363.herokuapp.com/send-emails',
        method: 'POST',
        data: team,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(function (response) {
        return response.data;
      });
    },

    sendRoomNotes: function (data) {

      // return $http({
      //   url: 'http://localhost:3000/close-room',
      //   method: 'POST',
      //   data: data,
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'application/json; charset=utf-8'
      //   }
      // })
      // .then(function (response) {
      //   return response.data;
      // });
    }

  };

};

