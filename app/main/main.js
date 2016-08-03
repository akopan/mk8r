'use strict';
angular.module('main', [
  'ionic',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      templateUrl: 'main/templates/main.html',
      controller: 'MainCtrl as ctrl'
    })
    .state('slots', {
      url: '/slots',
      templateUrl: 'main/templates/slots.html',
      controller: 'SlotsCtrl as vm',
      controllerAs: 'vm'
    })
    .state('test', {
      url: '/test',
      templateUrl: 'main/templates/slot-test.html',
      controller: 'SlotTestCtrl as vm',
      controllerAs: 'vm'
    });
});
