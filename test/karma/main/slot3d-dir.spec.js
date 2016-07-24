'use strict';

describe('module: main, directive: slot3d', function () {

  // load the directive's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  var element,
    $rootScope;

  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_.$new();
  }));

  it('should show text', inject(function ($compile) {
    element = angular.element('<slot3d></slot3d>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the slot3d directive');
  }));
});
