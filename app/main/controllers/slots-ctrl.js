'use strict';
angular.module('main')
  .controller('SlotsCtrl', function ($interval, $log, $q, $scope, $timeout, MarioService) {

    $log.log('Hello from your Controller: SlotsCtrl in module main:. This is your controller:', this);
    var vm = this;
    vm.sound = true;
    vm.characters = [];
    vm.karts = [];
    vm.tires = [];
    vm.wings = [];
    vm.charApi = [{}, {}, {}, {}];
    vm.kartApi = [{}, {}, {}, {}];
    vm.tireApi = [{}, {}, {}, {}];
    vm.wingApi = [{}, {}, {}, {}];

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
    vm.spin = spin;

    init();

    // Private functions
    function init() {
      vm.characters = MarioService.allCharacters();
      vm.karts = MarioService.allVehicals();
      vm.tires = MarioService.allTires();
      vm.wings = MarioService.allWings();

      mediaPolyFill();
    }

    function spin(player, duration) {
      var length = duration || 2000;
      return $q.all([
        vm.charApi[player].spin(length),
        vm.kartApi[player].spin(length),
        vm.tireApi[player].spin(length),
        vm.wingApi[player].spin(length),
      ]);
    }

    function randomize() {
      toggleAllSlots();

      var src = './main/assets/sounds/item-box.mp3';
      var media = new window.Media(src);
      if (vm.sound) {
        media.play();
      }

      function toggleAllSlots() {
        return $q.all([
          spin(0, 5000),
          spin(1, 5000),
          spin(2, 5000),
          spin(3, 5000)
        ]).then(function () {
          media.stop();
        });
      }
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
