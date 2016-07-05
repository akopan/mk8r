'use strict';
angular.module('main')
  .directive('mkSlot', ['$log', '$timeout', function ($log, $timeout) {
    return {
      templateUrl: 'main/directives/mk-slot.html',
      restrict: 'E',
      scope: {
        items: '=',
        api: '=?'
      },
      replace: true,
      link: function (scope, element) {
        var machine;
        // scope.internalControl = scope.control || {};
        scope.toggleSlots = function () {
          if (machine.running) {
            machine.stop();
          } else {
            machine.shuffle();
          }
        };
        var slots = function () {
          var e = angular.element(element);
          $log.log(e);
          machine = $(e).find('.mk-slotContainer').slotMachine({
            active: 0,
            delay: 500,
            auto: false,
            spins: 10
          });

          scope.api = {
            toggle: scope.toggleSlots
          };
          // scope.internalControl.shuffle = machine.shuffle;
          // scope.internalControl.stop = machine.stop;
          // scope.internalControl.toggle = scope.toggleSlots;
        };
        $timeout(slots, 0);
      }
    };
  }]);
