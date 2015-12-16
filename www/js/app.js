angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'ngCookies', 'checklist-model'])
.constant('SERVER', {
  URL:'http://intense-refuge-9476.herokuapp.com',
  CONFIG: {
    headers: {}
  }
})
.run(function($ionicPlatform, $rootScope, $cookies, $state, AuthService, $stateParams, $ionicNavBarDelegate, $location) {
  

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    var path = $location.path();
    
    if (path.indexOf('list') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else if (path.indexOf('home') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else if (path.indexOf('contact') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else if (path.indexOf('adduser') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else if (path.indexOf('signup') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else if (path.indexOf('login') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else if (path.indexOf('create') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else if (path.indexOf('recipe') != -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else {
      $ionicNavBarDelegate.showBackButton(true);
    }

    var x = AuthService.authenticate();
    
    if(toState.views.authenticate && x === true){
      return;
    }
    if (toState.views.authenticate && x === false ){
      
      $state.go("land.one");
      event.preventDefault();
      
    }  
   
  });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $ionicConfigProvider.views.maxCache(2);

  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.home', {
    url: '/home',
    views: {
      'tab': {
        templateUrl: 'templates/home.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.recipe', {
    url: '/recipe',
    views: {
      'tab': {
        templateUrl: 'templates/recipe.html',
        controller: 'RecipeController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.single', {
    url: '/recipe/:id',
    views: {
      'tab': {
        templateUrl: 'templates/single.html',
        controller: 'SingleController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.necessity', {
    url: '/necessity',
    views: {
      'tab': {
        templateUrl: 'templates/necessity.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.dairy', {
    url: '/dairy',
    views: {
      'tab': {
        templateUrl: 'templates/dairy.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.produce', {
    url: '/produce',
    views: {
      'tab': {
        templateUrl: 'templates/produce.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.deli', {
    url: '/deli',
    views: {
      'tab': {
        templateUrl: 'templates/deli.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.meats', {
    url: '/meats',
    views: {
      'tab': {
        templateUrl: 'templates/meats.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.spices', {
    url: '/spices',
    views: {
      'tab': {
        templateUrl: 'templates/spices.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.baking', {
    url: '/baking',
    views: {
      'tab': {
        templateUrl: 'templates/baking.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.breakfast', {
    url: '/breakfast',
    views: {
      'tab': {
        templateUrl: 'templates/breakfast.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.snacks', {
    url: '/snacks',
    views: {
      'tab': {
        templateUrl: 'templates/snacks.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.sweets', {
    url: '/sweets',
    views: {
      'tab': {
        templateUrl: 'templates/sweets.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.grains', {
    url: '/grains',
    views: {
      'tab': {
        templateUrl: 'templates/grains.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.frozen', {
    url: '/frozen',
    views: {
      'tab': {
        templateUrl: 'templates/frozen.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.beverages', {
    url: '/beverages',
    views: {
      'tab': {
        templateUrl: 'templates/beverages.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.hygiene', {
    url: '/hygiene',
    views: {
      'tab': {
        templateUrl: 'templates/hygiene.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.household', {
    url: '/household',
    views: {
      'tab': {
        templateUrl: 'templates/household.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.other', {
    url: '/other',
    views: {
      'tab': {
        templateUrl: 'templates/other.html',
        controller: 'PantryController as vm'
      },
    authenticate: true
    }
  })
  .state('tab.pantry', {
    url: '/pantry',
    views: {
      'tab': {
        templateUrl: 'templates/pantry.html',
        controller: 'PantryController as vm',
      },
    authenticate: true
    }
  })
  .state('land', {
    url: '/land',
    abstract: true,
    templateUrl: 'templates/land.html'
  })
  .state('land.one', {
    url: '/one',
    views: {
      'land': {
        templateUrl: 'templates/landing1.html',
        controller: 'LandingController'
      },
    authenticate: false
    }
  })
  .state('tab.login', {
    url: '/login',
    views: {
      'tab': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController as vm'
      },
    authenticate: false
    }
  })
  .state('tab.signup', {
    url: '/signup',
    views: {
      'tab': {
        templateUrl: 'templates/signup.html',
        controller: 'LoginController as vm'
      },
    authenticate: false
    }
  })
  .state('tab.list', {
    url: '/list',
    views: {
      'tab': {
        templateUrl: 'templates/list.html',
        controller: 'ListController as vm',
      },
    authenticate: true
    }
  })
  .state('tab.create', {
    url: '/create',
    views: {
      'tab': {
        templateUrl: 'templates/create.html',
        controller: 'LoginController as vm',
      },
    authenticate: true
    }
  })
  // .state('tab.add', {
  //   url: '/adduser',
  //   views: {
  //     'tab': {
  //       templateUrl: 'templates/adduser.html',
  //       controller: 'AddUserController as vm',
  //     },
  //   authenticate: true
  //   }
  // })
  .state('tab.account', {
    url: '/settings',
    views: {
      'tab': {
        templateUrl: 'templates/account.html'
      },
    authenticate: false
    }
  })
  .state('tab.contact', {
    url: '/contact',
    views: {
      'tab': {
        templateUrl: 'templates/contact.html'
      },
    authenticate: false
    }
  });

  $urlRouterProvider.otherwise('/land/one');

});
