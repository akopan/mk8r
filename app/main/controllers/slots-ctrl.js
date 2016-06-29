'use strict';
angular.module('main')
  .controller('SlotsCtrl', function ($log) {

    $log.log('Hello from your Controller: SlotsCtrl in module main:. This is your controller:', this);
    var vm = this;
    vm.characters = [];
    vm.karts = [];
    vm.tires = [];
    vm.wings = [];
    vm.numPlayers = 1;
    vm.selections = [{
      id: 1,
      character: {},
      kart: {},
      tires: {},
      wing: {}
    }, {
        id: 2,
        character: {},
        kart: {},
        tires: {},
        wing: {}
      }, {
        id: 3,
        character: {},
        kart: {},
        tires: {},
        wing: {}
      }, {
        id: 4,
        character: {},
        kart: {},
        tires: {},
        wing: {}
      }];

    vm.randomize = randomize;

    init();

    function init() {
      vm.characters = allCharacters();
      vm.karts = allVehicals();
      vm.tires = allTires();
      vm.wings = allWings();
    }

    function randomize() {
      var i;
      var character = Math.floor(Math.random() * vm.characters.length);
      var kart = Math.floor(Math.random() * vm.karts.length);
      var tire = Math.floor(Math.random() * vm.tires.length);
      var wing = Math.floor(Math.random() * vm.wings.length);
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
    }

    // Static data below
    function allCharacters() {
      return [
        { name: 'Toad' },
        { name: 'Koopa' }, { name: 'ShyGuy' }, { name: 'Lakitu' }, { name: 'Toadette' }, { name: 'BabyMario' }, { name: 'BabyLuigi' }, { name: 'BabyPeach' }, { name: 'BabyDaisy' }, { name: 'Baby Rosalina' }, { name: 'Lemmy' }, { name: 'Larry' }, { name: 'Wendy' }, { name: 'Isabelle' },
        { name: 'Mario' }, { name: 'Luigi' }, { name: 'Peach' }, { name: 'Daisy' }, { name: 'Metal Mario' }, { name: 'Yoshi' }, { name: 'PGPeach' }, { name: 'Iggy' }, { name: 'Ludwig' }, { name: 'Tanooki Mario' }, { name: 'Cat Peach' }, { name: 'Villager' },
        { name: 'Rosalina' }, { name: 'Bowser' }, { name: 'DKong' }, { name: 'Wario' }, { name: 'Waluigi' }, { name: 'Roy' }, { name: 'Morton' }, { name: 'Link' }, { name: 'Dry Bowser' }, { name: 'Mii' }
      ];
    }

    function allVehicals() {
      return [
        { name: 'Standard Kart' },
        { name: 'Pipe Frame' },
        { name: 'Mach 8' },
        { name: 'Steel Driver' },
        { name: 'Cat Cruiser' },
        { name: 'Circuit Special' },
        { name: 'Tri-Speeder' },
        { name: 'Badwagon' },
        { name: 'Prancer' },
        { name: 'Biddybuggy' },
        { name: 'Landship' },
        { name: 'Sneeker' },
        { name: 'Sports Coupe' },
        { name: 'Gold Standard' },
        { name: 'Gold Kart' },
        { name: 'GLA ' },
        { name: 'W 25 Silver Arrow ' },
        { name: '300 SL Roadster' },
        { name: 'Blue Falcon' },
        { name: 'Tanooki Kart' },
        { name: 'B Dasher' },
        { name: 'Streetle' },
        { name: 'P-Wing' },
        { name: 'Standard Bike' },
        { name: 'Comet' },
        { name: 'Sport Bike' },
        { name: 'The Duke' },
        { name: 'Flame Rider' },
        { name: 'Varmint' },
        { name: 'Mr. Scooty' },
        { name: 'Jet Bike' },
        { name: 'Yoshi Bike' },
        { name: 'Master Cycle' },
        { name: 'City Tripper' },
        { name: 'Standard ATV' },
        { name: 'Wild Wiggler' },
        { name: 'Teddy Buggy' },
        { name: 'Bone Rattler' }
      ];
    }

    function allTires() {
      return [
        { name: 'Standard' },
        { name: 'Normal' },
        { name: 'Monster' },
        { name: 'Roller' },
        { name: 'Slim' },
        { name: 'Slick' },
        { name: 'Metal' },
        { name: 'Button' },
        { name: 'Off-Road' },
        { name: 'Sponge' },
        { name: 'Wooden' },
        { name: 'Cushion' },
        { name: 'Blue Standard' },
        { name: 'Hot Monster' },
        { name: 'Azure Roller' },
        { name: 'Crimson Slim' },
        { name: 'Cyber Slick' },
        { name: 'Retro Off-Road' },
        { name: 'Gold Standard' },
        { name: 'GLA Tires' },
        { name: 'Triforce Tires' },
        { name: 'Leaf Tires' }
      ];
    }

    function allWings() {
      return [];
    }
  });
