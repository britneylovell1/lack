'use strict';

var chai = require('chai');
var expect = chai.expect;
var MockFirebase = require('mockfirebase').MockFirebase;

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

  describe('Initialize admin view', function () {

    it('All success messages are initially hidden', function () {

      expect($scope.addSuccess).to.equal(false);
      expect($scope.adminSuccess).to.equal(false);
      expect($scope.deleteSuccess).to.equal(false);

    });

    it('New members email array begins as empty', function () {

      expect($scope.newMemberEmails).to.have.length(0);

    });

    it('Selected user begins as null', function () {

      expect($scope.selectedMember).to.equal(null);

    });

  });

});
