angular.module('starter.controllers', [])

.controller('LandingController', function($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
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

.controller('AddUserController', function($state, $http, $cookies) {
  var vm = this;
  vm.addUser= function(user){
    
    $state.go('tab.home');
  };
})

.controller('PantryController', function($cookies, ListService, PantryService, $scope, $state, $ionicPopup, TransferService, $timeout, $rootScope) {
  var vm = this;
  vm.addNewItem = addNewItem;

  pantryList();
  function pantryList() {
    angular.forEach(['$stateChangeSuccess', 'addPantryItem', 'deletePantryItem', 'editPantryItem'] , function(value) {
      $scope.$on(value, function (e, a) {
        PantryService.getPantryList().then(function (response) {

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

          vm.pantryItems = response.data;
          TransferService.transferItems(vm.pantryItems);
          var items = response.data;
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
    ListService.addItem(food).success(() => {
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
    });
    

  }

  $scope.delete = function(item) {
    
    PantryService.removeFood(item.id).success(() => {
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
    });
    
  };

  $scope.showPopup = function() {
    $scope.food = {};
    $scope.quantity= {
        min:'0',
        max:'20000',
        value:'0'
    }
    $scope.preferred= {
        min:'0',
        max:'20000',
        value:'0'
    }


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
                  <div class="item range range-positive">
                    <span>On Hand: </span>
                    <input type="range" name="volume" min="{{quantity.min}}" max="10" value="{{quantity.value}}" ng-model="quantity.value">                    
                    <label>{{quantity.value}}</label>
                  </div>
                  <div class="item range range-positive">
                    <span>Needed: </span>
                    <input type="range" name="volume" min="{{preferred.min}}" max="10" value="{{preferred.value}}" ng-model="preferred.value">                    
                    <label>{{preferred.value}}</label>
                  </div>
                  <label class="item item-input">
                    <input type="text" placeholder="Unit of Measurement" ng-model="food.units">
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
            $scope.food.quantity = $scope.quantity.value;
            $scope.food.preferred = $scope.preferred.value;            
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
      if (res === undefined) {
        return;
      } else {
      PantryService.addItem(res).success((res2) => {      
        
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
        });
      }
    });
  };

  $scope.editPopup = function(food) {
    
    $scope.food = {
      title: food.title,
      category: food.category,
      quantity: food.quantity,
      preferred: food.preferred,
      necessity: food.necessity,
      units: food.units,

    };
   
    $scope.newFood = {
      title: food.title,
      category: food.category,
      quantity: food.quantity,
      preferred: food.preferred,
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
                    <div class="item range range-positive">
                      <span>On Hand: </span>
                      <input type="range" name="volume" min="{{quantity.min}}" max="10" value="{{food.quantity}}" ng-model="newFood.quantity">                    
                      <label>{{newFood.quantity}}</label>
                    </div>
                    <div class="item range range-positive">
                      <span>Needed: </span>
                      <input type="range" name="volume" min="{{preferred.min}}" max="10" value="{{food.preferred}}" ng-model="newFood.preferred">                    
                      <label>{{newFood.preferred}}</label>
                    </div>
                    <label class="item item-input">
                      <input type="text" placeholder="Unit of Measurement" ng-model="newFood.units">
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
      
      if (res === undefined) {
        return;
      } else {
        PantryService.editFoodItem(res).success((res2) => {

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
    $http.post(url+'/signup/', newUser).success((res)=>{
      $cookies.put('auth_token', res.user.access_token);
      $cookies.put('username', res.user.username);
      $state.go('tab.create');
    }).error( (res) => {
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
      $state.go('tab.add');
    }).error( (res) => {
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
    
    $http.post(url+'/login', user).success((res)=>{
      $scope.hide($ionicLoading);

      
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      $cookies.put('auth_token', res.user.access_token, {expires: expireDate});
      $cookies.put('username', res.user.username, {expires: expireDate});
      $state.go('tab.home');

    }).error( (res) => {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Your username or password was incorrect. Please try again.'
      });
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading);  
    });
    
    
  };
})

.controller('ListController', function($scope, SERVER, $cookies, ListService, $state, $http, $ionicPopup, $timeout, $rootScope) {
  var items= [];

  var vm = this;
  var url = SERVER.URL;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;
  vm.addItemsToPantry = addItemsToPantry;
  // vm.clearThese = clearThese;

  vm.removeItem = removeItem;
  // vm.addNewItem = addNewItem;
  vm.groceryList = groceryList;
  vm.purchased = [];

  $scope.data = {
    showDelete: false
  };

  // function addNewItem (food) {
  //   $scope.show($ionicLoading);
  //   ListService.addItem(food).success(() => {
  //     $rootScope.$broadcast('addToList');
      
  //   }).error(function(data) {
  //     // Do something on error
  //       var alertPopup = $ionicPopup.alert({
  //           title: 'Adding item Failed!',
  //           template: 'Sorry for the inconvenience. Please try again.'
  //       });
  //   }).finally(function($ionicLoading) { 
  //     // On both cases hide the loading
  //     $scope.hide($ionicLoading);  
  //   });
  // }

  groceryList();
  function groceryList() {   
    vm.groceryListYay = [];

    angular.forEach(['$stateChangeSuccess', 'deleteListItem', 'addToPantry', 'addListItem', 'clearListItem'], function(value) {
    
      $scope.$on(value, function (e, a) {
        ListService.getGroceryList().then( (response) => {
          

          vm.groceryListYay = response.data;
        
        });
      });
    })
  }
  function removeItem (object) {
     
    ListService.removeFood(object.id).success(() => {
      $rootScope.$broadcast('deleteListItem');
      
    }).error(function(data) {
      
        var alertPopup = $ionicPopup.alert({
            title: 'Deleting item(s) from grocery list failed!',
            template: 'Sorry for the inconvenience. Please try again.'
        });
    });
  }

  function addItemsToPantry() {
    
    vm.purchased.map(function(x){
      
      $http.post(url + '/edible', x, SERVER.CONFIG).success((res)=>{
        ListService.removeFood(x.id).success(() => {
          var a;
          console.log(a);
          if (a === undefined) {
            console.log(a);
            $rootScope.$broadcast('addToPantry');
            var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Item(s) successfully added to SMARTCART!'
            });      
            console.log(a);      
            return !a;
          }
            console.log(a);
        }).error(function(data) {

          var alertPopup = $ionicPopup.alert({
            title: 'Adding item(s) to pantry failed.',
            template: 'Sorry for the inconvenience. Please try again.'
          });
        });   
      });
    });  
    vm.purchased = [];     
  }
  
  // function clearThese() {
 
  //   vm.purchased.map(function(x){
  //     ListService.removeFood(x.id).success(() => {
  //       $rootScope.$broadcast('clearListItem');
        
  //     }).error(function(data) {
  //         var alertPopup = $ionicPopup.alert({
  //             title: 'Login failed!',
  //             template: 'Please check your credentials!'
  //         });
  //     });
  //   });
  // }

  $scope.showPopup = function() {
    $scope.food = {};
    $scope.quantity = {
      min:'0',
      max:'20000',
      value:'0'
    }
    $scope.preferred = {
      min:'0',
      max:'20000',
      value:'0'
    }


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
                  <div class="item range range-positive">
                    <span>On Hand: </span>
                    <input type="range" name="volume" min="{{quantity.min}}" max="10" value="{{quantity.value}}" ng-model="quantity.value">                    
                    <label>{{quantity.value}}</label>
                  </div>
                  <div class="item range range-positive">
                    <span>Needed: </span>
                    <input type="range" name="volume" min="{{preferred.min}}" max="10" value="{{preferred.value}}" ng-model="preferred.value">                    
                    <label>{{preferred.value}}</label>
                  </div> 
                  <label class="item item-input">
                    <input type="text" placeholder="Unit of Measurement" ng-model="food.units">
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
            $scope.food.quantity = $scope.quantity.value;
            $scope.food.preferred = $scope.preferred.value;            
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
      if (res === undefined) {
        return;
      } else {
      ListService.addItem(res).success((res2) => {        
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
        });
      }
    });
  };

});
