'use strict';

describe('module: main, controller: SlotTestCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var SlotTestCtrl;
  beforeEach(inject(function ($controller) {
    SlotTestCtrl = $controller('SlotTestCtrl');
  }));

  it('should do something', function () {
    expect(!!SlotTestCtrl).toBe(true);
  });

});
