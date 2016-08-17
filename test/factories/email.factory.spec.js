'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('EmailFactory', function () {

  beforeEach(window.angular.mock.module('lack'));

  var EmailFactory, $httpBackend;

  beforeEach(inject(function(_EmailFactory_, _$httpBackend_) {

    EmailFactory = _EmailFactory_;
    $httpBackend = _$httpBackend_;

  }));

  afterEach(function () {

    try {
      $httpBackend.verifyNoOutstandingExpectations();
      $httpBackend.verifyNoOutstandingRequests();
    } catch (err) {
      this.test.error(err);
    }

  });

  it('The sendInvitations function makes an HTTP request to the email server', function () {

    $httpBackend.expectPOST('http://localhost:3000/send-emails')
    .respond(200, 'Success');

    var response;
    EmailFactory.sendInvitations({$id: 'exampleId', name: 'exampleName', emails: ['mneterval@gmail.com']})
    .then(function (res) {
      response = res;
    })
    .catch(console.error);

    $httpBackend.flush();

    expect(response).to.equal('Success');

  });

});
