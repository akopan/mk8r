'use strict';
angular.module('main')
  .directive('slot3d', function ($log, $timeout) {
    return {
      template: '<div>' +
      '  <div class="mk-slotContainer">' +
      '    <ul class="mk-spinner" ng-class="{\'mk-spinning\': running}" ng-style="{transform: transform}">' +
      '      <li ng-repeat="item in items" ng-class="{\'mk-marquee\': item.hasOverflow}" class="text-item-wrap text-center mk-slot-item" style="line-height:1em;">' +
      '        <img style="height:38px;" src="./main/assets/images/{{item.image}}"><br/>' +
      '        <span class="mk-label">{{item.name}}</span>' +
      '      </li>' +
      '    </ul>' +
      '  </div>' +
      '</div>',
      restrict: 'E',
      scope: {
        items: '=',
        api: '=?'
      },
      link: function (scope, element) {
        // Public API
        scope.api = {
          prev: prev,
          next: next,
          stop: stop,
          start: start,
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
            var el = wheel.tiles[i];
            el.style.transform = rotate + ' ' + translateZ;

            // if (el.scrollWidth > el.clientWidth) {
            //   scope.items[i].hasOverflow = true;
            // }
          }

          // We'll need these later
          wheel.translateZ = -tz;
          wheel.item = 0;
          wheel.itemAngle = -itemAngle;
          wheel.itemCount = itemCount;

          // Set the initial value to something random
          var r = Math.floor(Math.random() * (wheel.itemCount - 1));
          setItem(r);

          scope.isInitialized = true;
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
          return $timeout(function () {
            start();
            var r = Math.floor(Math.random() * (wheel.itemCount - 1));
            return $timeout(function () {
              stop();
              setItem(r);
            }, t);
          }, 250);
        }
      }
    };
  });
