// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'ngCookies'])
.constant('SERVER', {
  URL:'http://intense-refuge-9476.herokuapp.com',
  CONFIG: {
    headers: {}
  }
})
.run(function($ionicPlatform, $rootScope, $cookies, $state, AuthService, $stateParams) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){

    var x = AuthService.authenticate();
    
    if(toState.views.authenticate && x === true){
      return;
    }
    if (toState.views.authenticate && x === false ){
      
      $state.go("tab.login");
      event.preventDefault();
      
    }  
   
  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'UserHomeController as vm'
      },
    authenticate: true
    }
  })

  .state('tab.pantry', {
    url: '/pantry',
    views: {
      'pantry': {
        templateUrl: 'templates/pantry.html',
        controller: 'PantryController as vm',
      },
    authenticate: true
    }
  })
  .state('tab.login', {
    url: '/login',
    views: {
      'login': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController as vm'
      },
    authenticate: false
    }
  })

  .state('tab.list', {
    url: '/list',
    views: {
      'list': {
        templateUrl: 'templates/list.html',
        controller: 'ListController as vm',
      },
    authenticate: true
    }
  })
  .state('tab.create', {
    url: '/create',
    views: {
      'create': {
        templateUrl: 'templates/create.html',
        controller: 'LoginController as vm',
      },
    authenticate: true
    }
  })
  .state('tab.add', {
    url: '/adduser',
    views: {
      'add': {
        templateUrl: 'templates/adduser.html',
        controller: 'AddUserController as vm',
      },
    authenticate: true
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
