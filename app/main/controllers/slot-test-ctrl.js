'use strict';
angular.module('main')
  .controller('SlotTestCtrl', function ($log, MarioService) {

    $log.log('Hello from your Controller: SlotTestCtrl in module main:. This is your controller:', this);
    var vm = this;
    vm.characters = MarioService.allCharacters();
    vm.api = {};
    vm.toggle = toggle;

    function toggle() {
      if (vm.api.toggle) {
        vm.api.toggle();
      }
    }
  });
