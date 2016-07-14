'use strict';
angular.module('main')
  .directive('mkSlot', ['$log', '$timeout', function ($log, $timeout) {
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
          toggle: toggleSlots,
          shuffle: shuffle,
          prev: prev,
          next: next,
          stop: stop,
          // active: getActive,
          // futureActive: futureActive,
          // running: running,
          // stopping: stopping,
          visible: visible,
          setRandomize: setRandomize,
          direction: setDirection,
          destroy: destroy
        };

        // Implementation
        var me = {};

        var defaults = {
          active: 0,
          delay: 200,
          auto: false,
          spins: 5,
          randomize: null,
          complete: null,
          stopHidden: true,
          direction: 'up'
        };
        var FX_NO_TRANSITION = 'slotMachineNoTransition',
          FX_FAST = 'slotMachineBlurFast',
          FX_NORMAL = 'slotMachineBlurMedium',
          FX_SLOW = 'slotMachineBlurSlow',
          FX_TURTLE = 'slotMachineBlurTurtle',
          FX_GRADIENT = 'slotMachineGradient',
          FX_STOP = FX_GRADIENT;

        function toggleSlots() {
          if (me.running) {
            stop();
          } else {
            shuffle(5);
          }
        }

        $timeout(slots, 0);

        // Private functions below
        function slots() {
          var $e = $(element).find('.mk-slotContainer');
          me.element = $e;
          me.settings = $.extend({}, defaults, scope.options);
          me.defaults = defaults;
          me.name = 'SlotMachine'; //pluginName;
          me.$slot = $(me.element);
          me.$tiles = me.$slot.children();
          me.$container = null;
          me._minTop = null;
          me._maxTop = null;
          me._$fakeFirstTile = null;
          me._$fakeLastTile = null;
          me._timer = null;
          me._spinsLeft = null;
          me.futureActive = null;
          me.running = false;
          me.stopping = false;
          me.active = me.settings.active;
          me.$slot.css('overflow', 'hidden');
          me.$container = me.$tiles.wrapAll('<div class="slotMachineContainer" />').parent();
          me.$container.css('transition', '1s ease-in-out');
          me._maxTop = -me.$container.height();
          _initFakeTiles();
          me._minTop = -me._$fakeFirstTile.outerHeight();
          _initDirection();
          resetPosition();

          if (me.settings.auto !== false) {
            if (me.settings.auto === true) {
              shuffle();
            } else {
              auto();
            }
          }
        }

        function _initFakeTiles() {
          me._$fakeFirstTile = me.$tiles.last().clone();
          me._$fakeLastTile = me.$tiles.first().clone();

          me.$container.prepend(me._$fakeFirstTile);
          me.$container.append(me._$fakeLastTile);
        }

        function _initDirection() {
          me._direction = {
            selected: me.settings.direction === 'down' ? 'down' : 'up',
            up: {
              key: 'up',
              initial: getTileOffset(me.active),
              first: 0,
              last: getTileOffset(me.$tiles.length),
              to: me._maxTop,
              firstToLast: getTileOffset(me.$tiles.length),
              lastToFirst: 0
            },
            down: {
              key: 'down',
              initial: getTileOffset(me.active),
              first: getTileOffset(me.$tiles.length),
              last: 0,
              to: me._minTop,
              firstToLast: getTileOffset(me.$tiles.length),
              lastToFirst: 0
            }
          };
        }

        function getTileOffset(index) {
          var offset = 0;

          for (var i = 0; i < index; i++) {
            offset += me.$tiles.eq(i).outerHeight();
          }

          return me._minTop - offset;
        }

        function _changeTransition() {
          var delay = me._delay || me.settings.delay,
            transition = me._transition || me.settings.transition;
          me.$container.css('transition', delay + 's ' + transition);
        }

        function _animate(margin) {
          me.$container.css('transform', 'matrix(1, 0, 0, 1, 0, ' + margin + ')');
        }

        function _isGoingBackward() {
          return me.futureActive > me.active && me.active === 0 && me.futureActive === me.$tiles.length - 1;
        }

        function _isGoingForward() {
          return me.futureActive <= me.active && me.active === me.$tiles.length - 1 && me.futureActive === 0;
        }

        function raf(cb, timeout) {
          var _raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
            startTime = new Date().getTime(),
            _rafHandler = function _rafHandler() {
              var drawStart = new Date().getTime(),
                diff = drawStart - startTime;

              if (diff < timeout) {
                _raf(_rafHandler);
              } else if (typeof cb === 'function') {
                cb();
              }
            };

          _raf(_rafHandler);
        }

        function resetPosition(margin) {
          // Bind?
          me.$container.toggleClass(FX_NO_TRANSITION);
          _animate(margin === undefined ? me._direction.initial : margin);

          me.$container[0].offsetHeight;
          // Bind?
          me.$container.toggleClass(FX_NO_TRANSITION);
        }

        function setRandomize(rnd) {
          me.settings.randomize = rnd;

          if (typeof rnd === 'number') {
            me.settings.randomize = function () {
              return rnd;
            };
          }
        }

        function prev() {
          me.futureActive = prevIndex();
          me.running = true;
          stop();

          return me.futureActive;
        }

        function next() {
          me.futureActive = nextIndex();
          me.running = true;
          stop();

          return me.futureActive;
        }

        function getDelayFromSpins(spins) {
          var delay = me.settings.delay;
          me._transition = 'linear';

          switch (spins) {
            case 1:
              delay /= 0.5;
              me._transition = 'ease-out';
              me._animationFX = FX_TURTLE;
              break;
            case 2:
              delay /= 0.75;
              me._animationFX = FX_SLOW;
              break;
            case 3:
              delay /= 1;
              me._animationFX = FX_NORMAL;
              break;
            case 4:
              delay /= 1.25;
              me._animationFX = FX_NORMAL;
              break;
            default:
              delay /= 1.5;
              me._animationFX = FX_FAST;
          }

          return delay;
        }

        function shuffle(spins, onComplete) {
          if (typeof spins === 'function') {
            onComplete = spins;
          }
          me.running = true;

          if (!visible() && me.settings.stopHidden === true) {
            stop(onComplete);
          } else {
            var delay = getDelayFromSpins(spins);
            me.delay = delay;
            _animate(getDirection().to);
            raf(function () {
              if (!me.stopping && me.running) {
                var left = spins - 1;

                resetPosition(getDirection().first);
                if (left <= 1) {
                  stop(onComplete);
                } else {
                  shuffle(left, onComplete);
                }
              }
            }, delay);
          }

          return me.futureActive;
        }

        function stop(onStop) {
          if (!me.running || me.stopping) {
            return me.futureActive;
          }

          me.running = true;
          me.stopping = true;

          if (me.futureActive === null) {
            me.futureActive = custom();
          }

          if (_isGoingBackward()) {
            resetPosition(getDirection().firstToLast);
          } else if (_isGoingForward()) {
            resetPosition(getDirection().lastToFirst);
          }

          me.active = me.futureActive;

          var delay = getDelayFromSpins(1);
          me.delay = delay;
          me._animationFX = FX_STOP;
          _animate(getTileOffset(me.active));
          raf(function () {
            me.stopping = false;
            me.running = false;
            me.futureActive = null;

            if (typeof me.settings.complete === 'function') {
              me.settings.complete.apply(me, [me.active]);
            }

            if (typeof onStop === 'function') {
              onStop.apply(me, [me.active]);
            }
          }, delay);

          return me.active;
        }

        function auto() {
          // if (!me.running) {
          //   this._timer = new Timer(function () {
          //     if (typeof me.settings.randomize !== 'function') {
          //       me.settings.randomize = function () {
          //         return me._nextIndex;
          //       };
          //     }
          //     if (!visible() && me.settings.stopHidden === true) {
          //       raf(me._timer.reset.bind(me._timer), 500);
          //     } else {
          //       shuffle(me.settings.spins, me._timer.reset.bind(me._timer));
          //     }
          //   }, me.settings.auto);
          // }
        }

        function destroy() {
          // _$fakeFirstTile.remove();
          // _$fakeLastTile.remove();
          // $tiles.unwrap();`
          // $.data(this.element[0], 'plugin_' + me.pluginName, null);
        }

        function getIndex() {
          return me._active;
        }

        function setIndex(index) {
          me._active = index;
          if (index < 0 || index >= me.$tiles.length) {
            me._active = 0;
          }
        }

        function getVisibleTile() {
          var firstTileHeight = me.$tiles.first().height(),
            // Bind?
            rawContainerMargin = me.$container.css('transform'),
            matrixRegExp = /^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/,
            containerMargin = parseInt(rawContainerMargin.replace(matrixRegExp, '$1'), 10);

          return Math.abs(Math.round(containerMargin / firstTileHeight)) - 1;
        }

        function random() {
          return Math.floor(Math.random() * me.$tiles.length);
        }

        function custom() {
          var choosen = void 0;

          if (typeof me.settings.randomize === 'function') {
            var index = me.settings.randomize.call(me, me.active);
            if (index < 0 || index >= me.$tiles.length) {
              index = 0;
            }
            choosen = index;
          } else {
            choosen = random();
          }

          return choosen;
        }

        function getDirection() {
          return me._direction[me._direction.selected];
        }

        function setDirection(direction) {
          if (!me.running) {
            me.direction = direction === 'down' ? 'down' : 'up';
          }
        }

        function _prevIndex() {
          var prevIndex = me.active - 1;
          return prevIndex < 0 ? me.$tiles.length - 1 : prevIndex;
        }

        function prevIndex() {
          return me.direction === 'up' ? _nextIndex() : _prevIndex();
        }

        function _nextIndex() {
          var nextIndex = me.active + 1;
          return nextIndex < me.$tiles.length ? nextIndex : 0;
        }

        function nextIndex() {
          return me.direction === 'up' ? _prevIndex() : _nextIndex();
        }

        function visible() {
          var $window = $(window),
            above = me.$slot.offset().top > $window.scrollTop() + $window.height(),
            below = $window.scrollTop() > me.$slot.height() + me.$slot.offset().top;

          return !above && !below;
        }

        function setFxClass(FX_SPEED) {
          var classes = [FX_FAST, FX_NORMAL, FX_SLOW, FX_TURTLE].join(' ');
          me.$tiles.add(me._$fakeFirstTile).add(me._$fakeLastTile).removeClass(classes).addClass(FX_SPEED);
        }

        function setAnimationFx(FX_SPEED) {
          var delay = me.settings.delay / 4,
            $elements = me.$slot.add(me.$tiles).add(me._$fakeFirstTile).add(me._$fakeLastTile);

          raf((function cb() {
            me._fxClass = FX_SPEED;

            if (FX_SPEED === FX_STOP) {
              $elements.removeClass(FX_GRADIENT);
            } else {
              $elements.addClass(FX_GRADIENT);
            }
          }).bind(this), delay);
        }

        function setDelay(delay) {
          delay = delay / 1000;
          me._delay = delay;
          _changeTransition();
        }

        function setTransition(transition) {
          transition = transition || 'ease-in-out';
          me._transition = transition;
          _changeTransition();
        }
      }
    };
  }]);
