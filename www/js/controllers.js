angular.module('starter.controllers', [])

.controller('RecipeController', function($scope, SERVER, $cookies, $http, $ionicLoading, $ionicPopup) {
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  var vm = this;
  var url = SERVER.URL;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;

  vm.searchForRecipe = function (recipe) {
    $scope.show($ionicLoading);
    $http.post(url + '/recipe', recipe, SERVER.CONFIG).success(function (res) {
      $scope.hide($ionicLoading);
      vm.recipes = res.recipes;
    }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Getting recipes failed',
          template: 'Sorry for the inconvenience. Please try again.'
        });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
  };
})

.controller('SingleController', function($http, SERVER, $cookies, $stateParams, $ionicLoading, $scope, $ionicPopup) {
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  

  var id = $stateParams.id;
  var vm = this;
  var url = SERVER.URL;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;

  var toBuy = [];
  $scope.show($ionicLoading);
  $http.get(url+'/recipe/'+ id, SERVER.CONFIG).then(function (res) {
    $scope.hide($ionicLoading);

    vm.title = res.data.name;
    vm.image = res.data.source_image_url;
    vm.recipeSource = res.data.source_url;
    vm.id = res.data.id;
    vm.ingredients = res.data.ingredients;

    vm.ingredients.forEach(function(x) {
      
      var food = {
        title: x.name,
        quantity: x.amount,
        units: x.unit,
        category: 'other',
        preferred: x.amount,
        absolute: x.amount
      };
      toBuy.push(food);
      
    });
  });

  $scope.browser = function() {
    window.open(vm.recipeSource,'_system','location=yes'); 
  };

  var pantry = [];
  var grocery = [];

  $http.get(url + '/edible', SERVER.CONFIG).then(function (res) {
    res.data.forEach(function(x){
        pantry.push(x.title);
      });
  });

  $http.get(url + '/grocery', SERVER.CONFIG).then(function (res) {
    res.data.forEach(function(y){
        grocery.push(y.title);
      });
  });

  vm.addThisRecipe = function(){
    $scope.show($ionicLoading);
    
    var done = false;
    toBuy.forEach(function(x) {

      var yay = $.inArray(x.title, pantry);
      var otherYay = $.inArray(x.title, grocery);       

      if(yay === -1 && otherYay === -1){
        $http.post(url + '/grocery', x, SERVER.CONFIG).success(function (res) {
          $scope.hide($ionicLoading);
          if (!done) {
            var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Sent items to grocery list!'
            });      
            done = true;
          }

        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Sending ingredients failed',
            template: 'Sorry for the inconvenience. Please try again.'
          });
        }).finally(function($ionicLoading) { 
          $scope.hide($ionicLoading);  
        });
        
      }
    });  
      
    
      
  };

})

.controller('LandingController', function($scope, $ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
})

.controller('AlertController', function($scope, $ionicModal) {
  var vm = this;
    $ionicModal.fromTemplateUrl('templates/alert.html', function($ionicModal) {
      $scope.modal = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
})


.controller('NavController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('PantryController', function($cookies, ListService, PantryService, $scope, $state, $ionicPopup, TransferService, $timeout, $rootScope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  var vm = this;
  vm.addNewItem = addNewItem;

  pantryList();
  function pantryList() {
    $scope.show($ionicLoading);
    angular.forEach(['$stateChangeSuccess', 'addPantryItem', 'deletePantryItem', 'editPantryItem'] , function(value) {
      $scope.$on(value, function (e, a) {
        PantryService.getPantryList().then(function (response) {
          $scope.hide($ionicLoading);

          vm.pantryItems = response.data;
          TransferService.transferItems(vm.pantryItems);
          var items = response.data;
          
          vm.necessity = [];
          vm.produce = [];
          vm.deli = [];
          vm.meats = [];
          vm.spices = [];
          vm.baking = [];
          vm.breakfast = [];
          vm.snacks = [];
          vm.sweets = [];
          vm.grains = [];
          vm.frozen = [];
          vm.bevs = [];
          vm.hygiene = [];
          vm.household = [];
          vm.dairy = [];
          vm.other = [];
          vm.necessityAmt = undefined;
          vm.produceAmt = undefined;
          vm.deliAmt = undefined;
          vm.meatsAmt = undefined;
          vm.spicesAmt = undefined;
          vm.bakingAmt = undefined;
          vm.breakfastAmt = undefined;
          vm.snacksAmt = undefined;
          vm.sweetsAmt = undefined;
          vm.grainsAmt = undefined;
          vm.frozenAmt = undefined;
          vm.bevsAmt = undefined;
          vm.hygieneAmt = undefined;
          vm.householdAmt = undefined;
          vm.dairyAmt = undefined;
          vm.otherAmt = undefined;

          items.forEach(function(item) {            

    
            if (item.necessity === true) {
              vm.necessity.push(item);
              vm.necessityAmt = vm.necessity.length;
            } else if (item.category === "Produce") {
              vm.produce.push(item);
              vm.produceAmt = vm.produce.length;
            } else if(item.category === "Deli") {
              vm.deli.push(item);
              vm.deliAmt = vm.deli.length;
            } else if(item.category === "Meats") {
              vm.meats.push(item);
              vm.meatsAmt = vm.meats.length;
            } else if(item.category === "Spices") {
              vm.spices.push(item);
              vm.spicesAmt = vm.spices.length;
            } else if(item.category === "Baking") {
              vm.baking.push(item);
              vm.bakingAmt = vm.baking.length;
            } else if(item.category === "Breakfast") {
              vm.breakfast.push(item);
              vm.breakfastAmt = vm.breakfast.length;
            } else if(item.category === "Snacks") {
              vm.snacks.push(item);
              vm.snacksAmt = vm.snacks.length;
            } else if(item.category === "Sweets") {
              vm.sweets.push(item);
              vm.sweetsAmt = vm.sweets.length;
            } else if(item.category === "Grains") {
              vm.grains.push(item);
              vm.grainsAmt = vm.grains.length;
            } else if(item.category === "Frozen") {
              vm.frozen.push(item);
              vm.frozenAmt = vm.frozen.length;
            } else if(item.category === "Beverages") {
              vm.bevs.push(item);
              vm.bevsAmt = vm.bevs.length;
            } else if(item.category === "Hygiene") {
              vm.hygiene.push(item);
              vm.hygieneAmt = vm.hygiene.length;
            } else if(item.category === "Household") {
              vm.household.push(item);
              vm.householdAmt = vm.household.length;
            } else if(item.category === "Dairy") {
              vm.dairy.push(item);
              vm.dairyAmt = vm.dairy.length;
            } else {
              vm.other.push(item);
              vm.otherAmt = vm.other.length;
            }

          });     
        });
      });
    })    
  }
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true
 
  $scope.data = {
    showDelete: false
  };

  function addNewItem (food) {
    $scope.show($ionicLoading); 
    ListService.addItem(food).success(function () {
      $scope.hide($ionicLoading); 
      $rootScope.$broadcast('addToList');
      var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Item was added to your grocery list!'
      });
    }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Adding new item failed',
          template: 'Sorry for the inconvenience. Please try again.'
        });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
    

  }

  $scope.delete = function(item) {
    $scope.show($ionicLoading);  
    PantryService.removeFood(item.id).success(function () {
      $scope.hide($ionicLoading);  
      $rootScope.$broadcast('deletePantryItem');
      var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Item was deleted from your SMARTCART!'
      });

    }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Adding new item failed',
            template: 'Sorry for the inconvenience. Please try again.'
        });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
    
  };

  $scope.showPopup = function() {
    $scope.food = {};

    var myPopup = $ionicPopup.show({
      template: `<form class="list">
                  <label class="item item-input">
                    <input type="text" placeholder="Item Name" ng-model="food.title">
                  </label>
                  <label class="item item-input item-select">
                    <div class="input-label">
                      Category
                    </div>
                    <select ng-model="food.category">
                      <option selected>Produce</option>
                      <option>Dairy</option>
                      <option>Deli</option>
                      <option>Meats</option>
                      <option>Spices</option>
                      <option>Baking</option>
                      <option>Breakfast</option>
                      <option>Snacks</option>
                      <option>Sweets</option>
                      <option>Grains</option>
                      <option>Beverages</option>
                      <option>Hygiene</option>
                      <option>House Supplies</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label class="item item-input">
                    <input type="text" placeholder="Unit of Measurement" ng-model="food.units">
                  </label>  
                  <label class="item item-input">
                    <input type="text" placeholder="On Hand" ng-model="food.quantity">
                  </label>
                  <label class="item item-input">
                    <input type="text" placeholder="Needed" ng-model="food.preferred">
                  </label>                            
                  <ion-toggle ng-model="food.necessity" toggle-class="toggle-calm">Necessity?</ion-toggle>
                </form>`,
      title: 'Add a new Item',
      subTitle: 'Fill out each input and press save!',
      scope: $scope,
      buttons: [
        { text: 'Cancel'},
        {
          text: '<b>Save</b>',
          type: 'button-calm',
          onTap: function(e) {
            // $scope.food.quantity = $scope.quantity.value;
            // $scope.food.preferred = $scope.preferred.value;            
            if (!$scope.food.title || !$scope.food.category) {
              e.preventDefault();
            } else {
              return $scope.food;              
            }
            
          }
        }
      ]
    });
    myPopup.then(function(res) {
      $scope.show($ionicLoading);
      if (res === undefined) {
        $scope.hide($ionicLoading);
        return;
      } else {
      PantryService.addItem(res).success(function (res2)  {      
        $scope.hide($ionicLoading);
        $rootScope.$broadcast('addPantryItem');
        var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Item was added to your SMARTCART!'
        })
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Adding item failed',
              template: 'Sorry for the inconvenience. Please try again.'
          });
        }).finally(function($ionicLoading) { 
          $scope.hide($ionicLoading);  
        });
      }
    });
  };

  $scope.editPopup = function(food) {
    $scope.food = {
      title: food.title,
      category: food.category,
      quantity: String(food.quantity),
      preferred: String(food.preferred),
      necessity: food.necessity,
      units: food.units
    };

   
    $scope.newFood = {
      title: food.title,
      category: food.category,
      quantity: String(food.quantity),
      preferred: String(food.preferred),
      necessity: food.necessity,
      units: food.units,
      id: food.id
    };

    var myPopup = $ionicPopup.show({
        template: `<form class="list">
                    <label class="item item-input">
                      <input type="text" placeholder="Item Name" value="{{food.title}}" ng-model="newFood.title">
                    </label>                    
                    <label class="item item-input item-select">
                      <div class="input-label">
                        Category
                      </div>
                      <select ng-model="newFood.category" selected="{{food.category}}">
                        <option>Produce</option>
                        <option>Dairy</option>
                        <option>Deli</option>
                        <option>Meats</option>
                        <option>Spices</option>
                        <option>Baking</option>
                        <option>Breakfast</option>
                        <option>Snacks</option>
                        <option>Sweets</option>
                        <option>Grains</option>
                        <option>Beverages</option>
                        <option>Hygiene</option>
                        <option>House Supplies</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label class="item item-input">
                      <input type="text" placeholder="Unit of Measurement" ng-model="newFood.units">
                    </label> 
                    <label class="item item-input">
                      <input type="text" placeholder="On Hand" ng-model="newFood.quantity" value="{{food.quantity}}">
                    </label>
                    <label class="item item-input">
                      <input type="text" placeholder="Needed" ng-model="newFood.preferred" value="{{food.preferred}}">
                    </label>                               
                    <ion-toggle value="newFood.necessity" ng-model="newFood.necessity" toggle-class="toggle-calm">Necessity?</ion-toggle>
                  </form>`,
        title: 'Edit Item',
        subTitle: 'Fill out each input and press save!',
        scope: $scope,
        buttons: [
          { text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-calm',
            onTap: function(e) {
              // $scope.newFood.quantity = $scope.quantity.value;
              // $scope.newFood.preferred = $scope.preferred.value; 
              // console.log($scope.newFood);
              if (!$scope.newFood.title || !$scope.newFood.category) {
                e.preventDefault();
              } else {
                
                return $scope.newFood;              
              }
              
            }
          }
        ]
    }); 

    myPopup.then(function(res) {
      $scope.show($ionicLoading);
      if (res === undefined) {
        $scope.hide($ionicLoading);
        return;
      } else {
        PantryService.editFoodItem(res).success(function (res2) {
          $scope.hide($ionicLoading);
          $rootScope.$broadcast('editPantryItem');
          var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Item was successfully edited!'
          });
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Editing item failed',
              template: 'Sorry for the inconvenience. Please try again.'
          });
        }).finally(function($ionicLoading) { 
          $scope.hide($ionicLoading);  
        });
        
      }
    });
  };

})

.controller('LoginController', function($scope, SERVER, $http, $cookies, $state, LoginService, $ionicLoading, $ionicPopup) {
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  var url = SERVER.URL;

  var vm = this;

  vm.createSmartCart = createSmartCart;

  vm.signUp = function(newUser){

    $scope.show($ionicLoading);
      $http.post(url+'/signup/', newUser).success(function (res){
      $cookies.put('auth_token', res.user.access_token);
      $cookies.put('username', res.user.username);
      $state.go('tab.create');
    }).error( function (res) {
      var alertPopup = $ionicPopup.alert({
        title: 'Account creation failed!',
        template: 'Sorry for the inconvenience. Please try again.'
      });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
  };



  function createSmartCart (house) {
    $scope.show($ionicLoading);

    LoginService.createNewSmartCart(house).success(function (res) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      var id = res.house.id;
      $cookies.put('house_id', id, {expires: expireDate}); 
      $state.go('tab.home');
    }).error( function (res) {
      var alertPopup = $ionicPopup.alert({
        title: 'SmartCart creation failed!',
        template: 'Sorry for the inconvenience. Please try again.'
      });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
  }


  vm.login = function(user){
    $scope.show($ionicLoading);
    
    $http.post(url+'/login', user).success(function (res){
      $scope.hide($ionicLoading);

      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      $cookies.put('auth_token', res.user.access_token, {expires: expireDate});
      $cookies.put('username', res.user.username, {expires: expireDate});
      SERVER.CONFIG.headers['Access-Token'] = res.user.access_token;

      $state.go('tab.home');

    }).error( function (res) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Your username or password was incorrect. Please try again.'
      });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
    
    
  };
})

.controller('ListController', function($scope, SERVER, $cookies, ListService, $state, $http, $ionicPopup, $timeout, $rootScope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  var items= [];

  var vm = this;
  var url = SERVER.URL;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;
  vm.addItemsToPantry = addItemsToPantry;

  vm.removeItem = removeItem;
  vm.groceryList = groceryList;
  vm.purchased = [];

  $scope.data = {
    showDelete: false
  };

  groceryList();
  function groceryList() {  
    $scope.show($ionicLoading); 
    vm.groceryListYay = [];

    angular.forEach(['$stateChangeSuccess', 'deleteListItem', 'addToPantry', 'addListItem', 'clearListItem', 'editListItem'], function(value) {
    
      $scope.$on(value, function (e, a) {
        ListService.getGroceryList().then( function (response) {
          $scope.hide($ionicLoading);         

          vm.groceryListYay = response.data;
        
        });
      });
    })
  }
  function removeItem (object) {
    $scope.show($ionicLoading);
     
    ListService.removeFood(object.id).success(function () {
      $scope.hide($ionicLoading);
      $rootScope.$broadcast('deleteListItem');
      
    }).error(function(data) {
      
        var alertPopup = $ionicPopup.alert({
            title: 'Deleting item(s) from grocery list failed!',
            template: 'Sorry for the inconvenience. Please try again.'
        });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
  }

  function addItemsToPantry() {
    $scope.show($ionicLoading);
    if (vm.purchased.length === 0) {
        $scope.hide($ionicLoading);
        return;
      } else {
        var done = false;
        vm.purchased.map(function(x){
          x.quantity = x.absolute; 
          
          $http.post(url + '/edible', x, SERVER.CONFIG).success(function (res) {
            ListService.removeFood(x.id).success(function () {
              $scope.hide($ionicLoading);

              if (!done) {
      
                var alertPopup = $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Item(s) successfully added to SMARTCART!'
                });      
                done = true;
                $rootScope.$broadcast('addToPantry');
              }
      
            }).error(function(data) {
              if (!done) {

                var alertPopup = $ionicPopup.alert({
                  title: 'Removing item(s) to grocery failed.',
                  template: 'Sorry for the inconvenience. Please try again.'
                });
                done = true;
                $rootScope.$broadcast('addToPantry');
              }
            }).finally(function($ionicLoading) { 
                $scope.hide($ionicLoading); 
                $rootScope.$broadcast('addToPantry'); 
              });   
          }).error(function(data) {
              if (!done) {
                var alertPopup = $ionicPopup.alert({
                  title: 'Adding item(s) to pantry failed.',
                  template: 'Sorry for the inconvenience. Please try again.'
                });
                done = true;
                $rootScope.$broadcast('addToPantry');
              }

          }).finally(function($ionicLoading) { 
              $scope.hide($ionicLoading);  
              $rootScope.$broadcast('addToPantry');
            });
        });  
        vm.purchased = [];  
      }   
  }

  $scope.showPopup = function() {
    $scope.food = {};
    // $scope.quantity = {
    //   min:'0',
    //   max:'20000',
    //   value:'0'
    // }
    // $scope.preferred = {
    //   min:'0',
    //   max:'20000',
    //   value:'0'
    // }


    var myPopup = $ionicPopup.show({
      template: `<form class="list">
                 <label class="item item-input">
                    <input type="text" placeholder="Item Name" ng-model="food.title">
                  </label>
                  <label class="item item-input item-select">
                    <div class="input-label">
                      Category
                    </div>
                    <select ng-model="food.category">
                      <option selected>Produce</option>
                      <option>Dairy</option>
                      <option>Deli</option>
                      <option>Meats</option>
                      <option>Spices</option>
                      <option>Baking</option>
                      <option>Breakfast</option>
                      <option>Snacks</option>
                      <option>Sweets</option>
                      <option>Grains</option>
                      <option>Beverages</option>
                      <option>Hygiene</option>
                      <option>House Supplies</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label class="item item-input">
                    <input type="text" placeholder="Unit of Measurement" ng-model="food.units">
                  </label>     
                  <label class="item item-input">
                    <input type="text" placeholder="On Hand" ng-model="food.quantity">
                  </label>
                  <label class="item item-input">
                    <input type="text" placeholder="Needed" ng-model="food.preferred">
                  </label>                 
                  <ion-toggle ng-model="food.necessity" toggle-class="toggle-calm">Necessity?</ion-toggle>
                </form>`,
      title: 'Add a new Item',
      subTitle: 'Fill out each input and press save!',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-calm',
          onTap: function(e) {
            // $scope.food.quantity = $scope.quantity.value;
            // $scope.food.preferred = $scope.preferred.value;            
            if (!$scope.food.title || !$scope.food.category) {
              e.preventDefault();
            } else {
              console.log($scope.food);
              return $scope.food;              
            }
            
          }
        }
      ]
    });
    myPopup.then(function(res) {
      $scope.show($ionicLoading);
      if (res === undefined) {
        $scope.hide($ionicLoading);
        return;
      } else {
      ListService.addItem(res).success(function (res2) {  
        $scope.hide($ionicLoading);      
        $rootScope.$broadcast('addListItem');
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Item was successfully added to your grocery list!'
        });
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Adding item failed',
            template: 'Sorry for the inconvenience. Please try again.'
          });
      }).finally(function($ionicLoading) { 
          $scope.hide($ionicLoading);  
        });
      }
    });
  };
  $scope.editPopup = function(food) {
    
    $scope.food = {
      title: food.title,
      category: food.category,
      quantity: String(food.quantity),
      preferred: String(food.preferred),
      necessity: food.necessity,
      units: food.units,

    };
   
    $scope.newFood = {
      title: food.title,
      category: food.category,
      quantity: String(food.quantity),
      preferred: String(food.preferred),
      necessity: food.necessity,
      units: food.units,
      id: food.id
    };

    $scope.quantity= {
        min:'0',
        max:'20000',
        value: food.quantity
    };
    $scope.preferred= {
        min:'0',
        max:'20000',
        value: food.preferred
    };

    var myPopup = $ionicPopup.show({
        template: `<form class="list">
                   <label class="item item-input">
                      <input type="text" placeholder="Item Name" value="{{food.title}}" ng-model="newFood.title">
                    </label>
                    <label class="item item-input item-select">
                      <div class="input-label">
                        Category
                      </div>
                      <select ng-model="newFood.category" selected="{{food.category}}">
                        <option selected>Produce</option>
                        <option>Dairy</option>
                        <option>Deli</option>
                        <option>Meats</option>
                        <option>Spices</option>
                        <option>Baking</option>
                        <option>Breakfast</option>
                        <option>Snacks</option>
                        <option>Sweets</option>
                        <option>Grains</option>
                        <option>Beverages</option>
                        <option>Hygiene</option>
                        <option>House Supplies</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label class="item item-input">
                    <input type="text" placeholder="Unit of Measurement" ng-model="food.units">
                  </label>     
                  <label class="item item-input">
                    <input type="text" placeholder="On Hand" ng-model="newFood.quantity" value="{{food.quantity}}">
                  </label>
                  <label class="item item-input">
                    <input type="text" placeholder="Needed" ng-model="newFood.preferred" value="{{food.preferred}}">
                  </label>                
                    <ion-toggle value="newFood.necessity" ng-model="newFood.necessity" toggle-class="toggle-calm">Necessity?</ion-toggle>
                  </form>`,
        title: 'Edit Item',
        subTitle: 'Fill out each input and press save!',
        scope: $scope,
        buttons: [
          { text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-calm',
            onTap: function(e) {
              // $scope.newFood.quantity = $scope.quantity.value;
              // $scope.newFood.preferred = $scope.preferred.value; 
              // console.log($scope.newFood);
              if (!$scope.newFood.title || !$scope.newFood.category) {
                e.preventDefault();
              } else {
                console.log($scope.newFood);
                return $scope.newFood;              
              }
              
            }
          }
        ]
    }); 

    myPopup.then(function(res) {
      $scope.show($ionicLoading);
      if (res === undefined) {
        $scope.hide($ionicLoading);
        return;
      } else {
        ListService.editFoodItem(res).success(function (res2) {
          $scope.hide($ionicLoading);

          $rootScope.$broadcast('editListItem');
          var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Item was successfully edited!'
          });
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Editing item failed',
              template: 'Sorry for the inconvenience. Please try again.'
          });
        }).finally(function($ionicLoading) { 
            $scope.hide($ionicLoading);  
          });
        
      }
    });
  };

});
