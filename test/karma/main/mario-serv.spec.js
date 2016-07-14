'use strict';

describe('module: main, service: Mario', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Mario;
  beforeEach(inject(function (_Mario_) {
    Mario = _Mario_;
  }));

  it('should do something', function () {
    expect(!!Mario).toBe(true);
  });

});
