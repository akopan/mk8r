'use strict';
angular.module('main')
  .controller('SlotsCtrl', function ($cordovaMedia, $interval, $log, $timeout) {

    $log.log('Hello from your Controller: SlotsCtrl in module main:. This is your controller:', this);
    var vm = this;
    vm.characters = [];
    vm.karts = [];
    vm.tires = [];
    vm.wings = [];
    vm.numPlayers = 1;
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
      vm.characters = allCharacters();
      vm.karts = allVehicals();
      vm.tires = allTires();
      vm.wings = allWings();

      mediaPolyFill();
    }

    function randomize() {
      var i;
      // var character = Math.floor(Math.random() * vm.characters.length);
      // var kart = Math.floor(Math.random() * vm.karts.length);
      // var tire = Math.floor(Math.random() * vm.tires.length);
      // var wing = Math.floor(Math.random() * vm.wings.length);
      var r = new Random();
      var character = r.integer(0, vm.characters.length - 1);
      var kart = r.integer(0, vm.karts.length - 1);
      var tire = r.integer(0, vm.tires.length - 1);
      var wing = r.integer(0, vm.wings.length - 1);

      var src = './main/assets/sounds/item-box.mp3';
      var media = $cordovaMedia.newMedia(src);
      media.play();

      var promise;

      $timeout(function () { }, 5000)
        .then(function () {
          $interval.cancel(promise);
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

    // Static data below
    function allCharacters() {
      return [
        { name: 'Toad', image: '32px-MK8_Toad_Icon.png' },
        { name: 'Koopa', image: '32px-MK8_Koopa_Icon.png' },
        { name: 'ShyGuy', image: '32px-MK8_ShyGuy_Icon.png' },
        { name: 'Lakitu', image: '32px-MK8_Lakitu_Icon.png' },
        { name: 'Toadette', image: '32px-MK8_Toadette_Icon.png' },
        { name: 'BabyMario', image: '32px-MK8_BabyMario_Icon.png' },
        { name: 'BabyLuigi', image: '32px-MK8_BabyLuigi_Icon.png' },
        { name: 'BabyPeach', image: '32px-MK8_BabyPeach_Icon.png' },
        { name: 'BabyDaisy', image: '32px-MK8_BabyDaisy_Icon.png' },
        { name: 'Baby Rosalina', image: '32px-MK8_BabyRosalina_Icon.png' },
        { name: 'Lemmy', image: '32px-MK8_Lemmy_Icon.png' },
        { name: 'Larry', image: '32px-MK8_Larry_Icon.png' },
        { name: 'Wendy', image: '32px-MK8_Wendy_Icon.png' },
        { name: 'Isabelle', image: '32px-MK8_Isabelle_Icon.png' },
        { name: 'Mario', image: '32px-MK8_Mario_Icon.png' },
        { name: 'Luigi', image: '32px-MK8_Luigi_Icon.png' },
        { name: 'Peach', image: '32px-MK8_Peach_Icon.png' },
        { name: 'Daisy', image: '32px-MK8_Daisy_Icon.png' },
        { name: 'Metal Mario', image: '32px-MK8_MMario_Icon.png' },
        { name: 'Yoshi', image: '32px-MK8_Yoshi_Icon.png' },
        { name: 'Pink Gold Peach', image: '32px-MK8_PGPeach_Icon.png' },
        { name: 'Iggy', image: '32px-MK8_Iggy_Icon.png' },
        { name: 'Ludwig', image: '32px-MK8_Ludwig_Icon.png' },
        { name: 'Tanooki Mario', image: '32px-MK8_Tanooki_Mario_Icon.png' },
        { name: 'Cat Peach', image: '32px-MK8_Cat_Peach_Icon.png' },
        { name: 'Villager', image: '50px-MK8_Villager_Icon.png' },
        { name: 'Rosalina', image: '32px-MK8_Rosalina_Icon.png' },
        { name: 'Bowser', image: '32px-MK8_Bowser_Icon.png' },
        { name: 'Donkey Kong', image: '32px-MK8_DKong_Icon.png' },
        { name: 'Wario', image: '32px-MK8_Wario_Icon.png' },
        { name: 'Waluigi', image: '32px-MK8_Waluigi_Icon.png' },
        { name: 'Roy', image: '32px-MK8_Roy_Icon.png' },
        { name: 'Morton', image: '32px-MK8_Morton_Icon.png' },
        { name: 'Link', image: '32px-MK8_Link_Icon.png' },
        { name: 'Dry Bowser', image: '32px-MK8_Dry_Bowser_Icon.png' },
        { name: 'Mii', image: '32px-Mii_MK8.png' }
      ];
    }

    function allVehicals() {
      return [
        { name: 'Standard Kart', image: '100px-StandardKartBodyMK8.png' },
        { name: 'Pipe Frame', image: '100px-PipeFrameBodyMK8.png' },
        { name: 'Mach 8', image: '100px-Mach8BodyMK8.png' },
        { name: 'Steel Driver', image: '100px-Steel_Driver.png' },
        { name: 'Cat Cruiser', image: '100px-CatCruiserBodyMK8.png' },
        { name: 'Circuit Special', image: '100px-CircuitSpecialBodyMK8.png' },
        { name: 'Tri-Speeder', image: '100px-TrispeederBodyMK8.png' },
        { name: 'Badwagon', image: '100px-BadwagonBodyMK8.png' },
        { name: 'Prancer', image: '100px-PrancerBodyMK8.png' },
        { name: 'Biddybuggy', image: '100px-BiddybuggyBodyMK8.png' },
        { name: 'Landship', image: '100px-LandshipBodyMK8.png' },
        { name: 'Sneeker', image: '100px-SneakerBodyMK8.png' },
        { name: 'Sports Coupe', image: '100px-SportsCoupeMK8.png' },
        { name: 'Gold Standard', image: '100px-Gold_Standard.png' },
        { name: 'GLA ', image: '100px-GLA-MK8.png' },
        { name: 'Silver Arrow ', image: '100px-W25SilverArrow-MK8.png' },
        { name: '300 SL Roadster', image: '100px-300SLRoadster-MK8.png' },
        { name: 'Blue Falcon', image: '100px-MK8BlueFalcon.png' },
        { name: 'Tanooki Kart', image: '100px-Tanooki-Buggy.png' },
        { name: 'B Dasher', image: '100px-ZeldaMK8Bdasher.png' },
        { name: 'Streetle', image: '100px-MK8Streetle.png' },
        { name: 'P-Wing', image: '100px-MK8PWing.png' },
        { name: 'Standard Bike', image: '100px-StandardBikeBodyMK8.png' },
        { name: 'Comet', image: '100px-CometBodyMK8.png' },
        { name: 'Sport Bike', image: '100px-SportBikeBodyMK8.png' },
        { name: 'The Duke', image: '100px-TheDukeBodyMK8.png' },
        { name: 'Flame Rider', image: '100px-FlameRiderBodyMK8.png' },
        { name: 'Varmint', image: '100px-VarmintBodyMK8.png' },
        { name: 'Mr. Scooty', image: '100px-MrScootyBodyMK8.png' },
        { name: 'Jet Bike', image: '100px-JetBikeBodyMK8.png' },
        { name: 'Yoshi Bike', image: '100px-YoshiBikeBodyMK8.png' },
        { name: 'Master Cycle', image: '100px-MK8MasterCycle.png' },
        { name: 'City Tripper', image: '100px-MK8CityTripper.png' },
        { name: 'Standard ATV', image: '100px-StandardATVBodyMK8.png' },
        { name: 'Wild Wiggler', image: '100px-WildWigglerBodyMK8.png' },
        { name: 'Teddy Buggy', image: '100px-TeddyBuggyBodyMK8.png' },
        { name: 'Bone Rattler', image: '100px-MK8BoneRattler.png' }
      ];
    }

    function allTires() {
      return [
        { name: 'Standard', image: '100px-StandardTiresMK8.png' },
        { name: 'Monster', image: '100px-MonsterTiresMK8.png' },
        { name: 'Roller', image: '100px-RollerTiresMK8.png' },
        { name: 'Slim', image: '100px-SlimTiresMK8.png' },
        { name: 'Slick', image: '100px-SlickTiresMK8.png' },
        { name: 'Metal', image: '100px-MetalTiresMK8.png' },
        { name: 'Button', image: '100px-ButtonTiresMK8.png' },
        { name: 'Off-Road', image: '100px-Off-Road.png' },
        { name: 'Sponge', image: '100px-SpongeTiresMK8.png' },
        { name: 'Wooden', image: '100px-WoodTiresMK8.png' },
        { name: 'Cushion', image: '100px-CushionTiresMK8.png' },
        { name: 'Blue Standard', image: '100px-Blue_Standard.png' },
        { name: 'Hot Monster', image: '100px-HotMonsterTiresMK8.png' },
        { name: 'Azure Roller', image: '100px-AzureRollerTiresMK8.png' },
        { name: 'Crimson Slim', image: '100px-CrimsonSlimTiresMK8.png' },
        { name: 'Cyber Slick', image: '100px-CyberSlickTiresMK8.png' },
        { name: 'Retro Off-Road', image: '100px-Retro_Off-Road.png' },
        { name: 'Gold Standard', image: '100px-Gold_Tires_MK8.png' },
        { name: 'GLA Tires', image: '100px-GLATires-MK8.png' },
        { name: 'Triforce Tires', image: 'MK8-TriforceTires.png' },
        { name: 'Leaf Tires', image: '100px-Leaf_Tires_MK8.png' }
      ];
    }

    function allWings() {
      return [
        {
          image: 'SuperGliderMK8.png',
          name: 'Super Glider'
        },
        {
          image: 'Cloud_Glider.png',
          name: 'Cloud Glider'
        },
        {
          image: 'WarioWingMK8.png',
          name: 'Wario Wing'
        },
        {
          image: 'WaddleWingMK8.png',
          name: 'Waddle Wing'
        },
        {
          image: 'PeachParasolGliderMK8.png',
          name: 'Peach Parasol'
        },
        {
          image: 'ParachuteGliderMK8.png',
          name: 'Parachute'
        },
        {
          image: 'ParafoilGliderMK8.png',
          name: 'Parafoil'
        },
        {
          image: 'FlowerGliderMK8.png',
          name: 'Flower Glider'
        },
        {
          image: 'BowserKiteMK8.png',
          name: 'Bowser Kite'
        },
        {
          image: 'PlaneGliderMK8.png',
          name: 'Plane Glider'
        },
        {
          image: 'MKTVParafoilGliderMK8.png',
          name: 'MKTV Parafoil'
        },
        {
          image: 'GoldGliderMK8.png',
          name: 'Gold Glider'
        },
        {
          image: 'MK8-HylianKite.png',
          name: 'Hylian Kite'
        },
        {
          image: 'PaperGliderIconMK8.png',
          name: 'Paper Glider'
        }
      ];
    }
  });
