'use strict';
angular.module('main')
  .controller('SlotsCtrl', function ($cordovaMedia, $interval, $log, $scope, $timeout, MarioService) {

    $log.log('Hello from your Controller: SlotsCtrl in module main:. This is your controller:', this);
    var vm = this;
    vm.characters = [];
    vm.karts = [];
    vm.tires = [];
    vm.wings = [];
    vm.charApi = [{}, {}, {}, {}];
    vm.vehicalApi = [{}, {}, {}, {}];
    vm.selections = [
      {
        id: 1,
        style: 'energized',
        character: {},
        kart: {},
        tires: {},
        wing: {}
      }, {
        id: 2,
        style: 'positive',
        character: {},
        kart: {},
        tires: {},
        wing: {}
      }, {
        id: 3,
        style: 'assertive',
        character: {},
        kart: {},
        tires: {},
        wing: {}
      }, {
        id: 4,
        style: 'balanced',
        character: {},
        kart: {},
        tires: {},
        wing: {}
      }
    ];

    vm.randomize = randomize;

    init();

    function init() {
      vm.characters = MarioService.allCharacters();
      vm.karts = MarioService.allVehicals();
      vm.tires = MarioService.allTires();
      vm.wings = MarioService.allWings();

      mediaPolyFill();
    }

    function randomize() {
      var i;
      var r = new Random();
      var character = r.integer(0, vm.characters.length - 1);
      var kart = r.integer(0, vm.karts.length - 1);
      var tire = r.integer(0, vm.tires.length - 1);
      var wing = r.integer(0, vm.wings.length - 1);

      toggleAllSlots();

      var src = './main/assets/sounds/item-box.mp3';
      var media = $cordovaMedia.newMedia(src);
      media.play();

      var promise;

      $timeout(function () { }, 5000)
        .then(function () {
          $interval.cancel(promise);
          toggleAllSlots();
          media.stop();
        });

      promise = $interval(function () {
        for (i = 0; i < 4; i++) {
          vm.selections[i] = {
            character: vm.characters[character],
            kart: vm.karts[kart],
            tires: vm.tires[tire],
            wing: vm.wings[wing]
          };
          character = Math.floor(Math.random() * vm.characters.length);
          kart = Math.floor(Math.random() * vm.karts.length);
          tire = Math.floor(Math.random() * vm.tires.length);
          wing = Math.floor(Math.random() * vm.wings.length);
        }
      }, 250, 20, true);
    }

    function toggleAllSlots() {
      vm.charApi[0].toggle();
      vm.charApi[1].toggle();
      vm.charApi[2].toggle();
      vm.charApi[3].toggle();
      vm.kartApi1.toggle();
      vm.kartApi2.toggle();
      vm.kartApi3.toggle();
      vm.kartApi4.toggle();
      vm.tireApi1.toggle();
      vm.tireApi2.toggle();
      vm.tireApi3.toggle();
      vm.tireApi4.toggle();
      vm.wingApi1.toggle();
      vm.wingApi2.toggle();
      vm.wingApi3.toggle();
      vm.wingApi4.toggle();
    }

    // Fake Media if it doesn't exist
    function mediaPolyFill() {
      if (window.Media) {
        return;
      }

      window.Media = function (src, mediaSuccess) {
        // src: A URI containing the audio content. (DOMString)
        // mediaSuccess: (Optional) The callback that executes after a Media object has completed the current play, record, or stop action. (Function)
        // mediaError: (Optional) The callback that executes if an error occurs. (Function)
        // mediaStatus: (Optional) The callback that executes to indicate status changes. (Function)

        if (typeof Audio !== 'function' && typeof Audio !== 'object') {
          $log.warn('HTML5 Audio is not supported in this browser');
        }
        var sound = new Audio();
        sound.src = src;
        sound.addEventListener('ended', mediaSuccess, false);
        sound.load();

        return {
          // Returns the current position within an audio file (in seconds).
          getCurrentPosition: function (mediaSuccess) { mediaSuccess(sound.currentTime); },
          // Returns the duration of an audio file (in seconds) or -1.
          getDuration: function () { return isNaN(sound.duration) ? -1 : sound.duration; },
          // Start or resume playing an audio file.
          play: function () { sound.play(); },
          // Pause playback of an audio file.
          pause: function () { sound.pause(); },
          // Releases the underlying operating system's audio resources. Should be called on a ressource when it's no longer needed !
          release: function () { },
          // Moves the position within the audio file.
          seekTo: function () { }, // TODO
          // Set the volume for audio playback (between 0.0 and 1.0).
          setVolume: function (volume) { sound.volume = volume; },
          // Start recording an audio file.
          startRecord: function () { },
          // Stop recording an audio file.
          stopRecord: function () { },
          // Stop playing an audio file.
          stop: function () { sound.pause(); if (mediaSuccess) { mediaSuccess(); } } // TODO
        };
      };
    }
  });
