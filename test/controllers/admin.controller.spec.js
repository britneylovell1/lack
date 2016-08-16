'use strict';

// var angular = require('angular');
var chai = require('chai');
var expect = chai.expect;
// var ngMocks = require('angular-mocks');
var MockFirebase = require('mockfirebase').MockFirebase;
// var app = require('../../scripts/app.js');

var mockMembers = [
  {name: 'Maggie'},
  {name: 'Britney'},
  {name: 'Elisabeth'}
];

describe('AdminController', function () {

  var $controller, myController, $scope, AdminUserFactory;

  beforeEach(window.angular.mock.module('lack'));

  beforeEach(inject(function (_$controller_) {

    $controller = _$controller_;
    $scope = {};

    myController = $controller('AdminController', { $scope: $scope });

  }));

  describe('Initial admin view', function () {

    it('All success messages are initially hidden', function () {

      expect($scope.addSuccess).to.equal(false);
      expect($scope.adminSuccess).to.equal(false);
      expect($scope.deleteSuccess).to.equal(false);

    })

    it('Inviting new members changes $scope.addSuccess correctly', function () {

      $scope.inviteNewMembers('mneterval@gmail.com');

      expect($scope.addSuccess).to.equal(true);

    })

  })

})
