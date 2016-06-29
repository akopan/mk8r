'use strict';

describe('module: main, controller: SlotsCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var SlotsCtrl;
  beforeEach(inject(function ($controller) {
    SlotsCtrl = $controller('SlotsCtrl');
  }));

  it('should do something', function () {
    expect(!!SlotsCtrl).toBe(true);
  });

});
