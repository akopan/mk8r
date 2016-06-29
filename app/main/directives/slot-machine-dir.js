'use strict';
angular.module('main')
  .directive('slotMachine', function () {
    return {
      template: '<div><div ng-repeat="item in items">{{item.title}}</div></div>',
      restrict: 'E',
      scope: {
        items: '='
      },
      replace: true,
      link: function (scope, element, attrs) {
        var machine = angular(element).slotMachine();
        machine.shuffle();
      }
    };
  });
