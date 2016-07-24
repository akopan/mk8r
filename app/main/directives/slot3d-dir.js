'use strict';
angular.module('main')
  .directive('slot3d', function ($log, $timeout, $interval) {
    return {
      templateUrl: './main/templates/mk-slot.html',
      restrict: 'E',
      scope: {
        items: '=',
        api: '=?',
        options: '='
      },
      // replace: true,
      link: function (scope, element) {
        // Public API
        scope.api = {
          // toggle: toggleSlots,
          // shuffle: shuffle,
          prev: prev,
          next: next,
          stop: stop,
          start: start,
          // active: getActive,
          // setActive: setActive,
          // setDelay: setDelay,
          // futureActive: futureActive,
          // running: running,
          // stopping: stopping,
          // visible: visible,
          // setRandomize: setRandomize,
          // direction: setDirection,
          // destroy: destroy
          setItem: setItem,
          item: item,
          spin: spin,
          toggle: spin
        };

        var wheel = {
          scope: scope,
          element: element,
          item: 0
        };

        $timeout(slots, 0);

        // Private functions below
        function slots() {
          $log.log('Initializing Slot3d');
          wheel.spinner = $(wheel.element).find('ul.mk-spinner')[0];
          wheel.tiles = wheel.spinner.children;

          var panelSize = wheel.tiles[0].clientHeight;
          var itemCount = wheel.tiles.length;
          var itemAngle = 360 / itemCount;
          var tz = Math.round((panelSize / 2) / Math.tan(Math.PI / itemCount));
          var translateZ = 'translateZ(' + tz + 'px)';

          $log.debug('Item list contains ' + itemCount +
            ' items, meaning each will require ' + itemAngle + 'deg and ' + tz + 'px each.');

          var i;
          for (i = 0; i < itemCount; i++) {
            // Set 3D rotation
            var rotate = 'rotateX(' + i * itemAngle + 'deg)';
            wheel.tiles[i].style.transform = rotate + ' ' + translateZ;
          }

          // We'll need these later
          wheel.translateZ = -tz;
          wheel.item = 0;
          wheel.itemAngle = -itemAngle;
          wheel.itemCount = itemCount;
        }

        function setItem(item) {
          if (item < 0 || item > wheel.itemCount) { item = 0; }

          wheel.item = item;

          // Transform the container opposite the item's transform.
          var rotate = 'rotateX(' + item * wheel.itemAngle + 'deg)';
          wheel.scope.transform = rotate;
        }

        function next() {
          setItem(wheel.item + 1);
        }

        function prev() {
          setItem(wheel.item - 1);
        }

        function item() {
          return wheel.item;
        }

        function start() {
          wheel.scope.running = true;
        }

        function stop() {
          wheel.scope.running = false;
        }

        function spin(duration) {
          var t = duration || 5000;
          var r = Math.floor(Math.random() * (wheel.itemCount - 1));
          setItem(r);
          $timeout(function () {
            start();
            r = Math.floor(Math.random() * (wheel.itemCount - 1));
            $timeout(function () {
              stop();
              setItem(r);
            }, t);
          }, 250);
        }
      }
    };
  });
