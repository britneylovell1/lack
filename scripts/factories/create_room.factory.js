var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

module.exports = function() {


  //helper function for members list
  function loadAll() {
    // when there are members on a team... the call for the array would be here
    var allMembers = ['Maggie', 'Elisabeth', 'Britney', 'Brianna', 'Matilda', 'Emily'];
    return allMembers.map(function(member) {
      return {
        value: member.toLowerCase(),
        display: member
      };
    });
  }

  var fac = {};

  fac.members = loadAll();

  fac.querySearch = function(query) {
    var results = query ? this.members.filter(this.createFilterFor(query)) : null;
    return results;
  };

  fac.createFilterFor = function(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(member) {
      return (member.value.indexOf(lowercaseQuery) === 0);
    };
  };

  return fac;
};
