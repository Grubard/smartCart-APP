angular.module('starter.controllers', [])

.controller('UserHomeController', function($scope) {
  
})

.controller('AlertController', function($scope, $ionicModal) {
  var vm = this;
    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/alert.html', function($ionicModal) {
      $scope.modal = $ionicModal;
    }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
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
    console.log(user);
    $state.go('tab.home');
  };
})

.controller('PantryController', function($cookies, ListService, PantryService, $scope, $state, $ionicPopup, TransferService) {
  var vm = this;

  groceryList();
  function groceryList() {
    ListService.getGroceryList().then( (response) => {
      vm.items = response.data;
    });
  }

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
  

  // pantryList();
  pantryList();

  function pantryList() {
    PantryService.getPantryList().then( (response) => {

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
  }
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true
 
  $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.delete = function(item) {

    PantryService.removeFood(item.id).then(()=> {
      $state.reload();
    });
    
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
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
                  <ion-toggle ng-model="food.necessity" toggle-class="toggle-calm">Necessity?</ion-toggle>
                </form>`,
      title: 'Add a new Item',
      subTitle: 'Fill out each input and press save!',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
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
      PantryService.addItem(res).then((res2) => {
        console.log(res2);
        $state.reload();
      });
    });
  };

  $scope.editPopup = function(food) {
    console.log(food);
    $scope.food = {
      title: food.title,
      category: food.category,
      quantity: food.quantity,
      preferred: food.preferred,
      necessity: food.necessity

    };
    $scope.newFood = {
      title: food.title,
      category: food.category,
      necessity: food.necessity,
      quantity: food.quantity,
      preferred: food.preferred,
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
                    <ion-toggle value="newFood.necessity" ng-model="food.necessity" toggle-class="toggle-calm">Necessity?</ion-toggle>
                  </form>`,
        title: 'Edit Item',
        subTitle: 'Fill out each input and press save!',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              // $scope.newFood.quantity = $scope.quantity.value;
              // $scope.newFood.preferred = $scope.preferred.value; 
              // console.log($scope.newFood);
              if (!$scope.newFood.title || !$scope.newFood.category) {
                e.preventDefault();
              } else {
                // console.log($scope.newFood);
                return $scope.newFood;              
              }
              
            }
          }
        ]
      });
      myPopup.then(function(res) {
        PantryService.editFoodItem(res).then((res2) => {
          // console.log(res2);
          $state.reload();
        });
      });
    };

})

.controller('LoginController', function($scope, SERVER, $http, $cookies, $state, LoginService) {
  var url = SERVER.URL;

  var vm = this;

  vm.createSmartCart = createSmartCart;

  vm.signUp = function(newUser){
    $http.post(url+'/signup/', newUser).then((res)=>{

      $cookies.put('auth_token', res.data.user.access_token);
      $cookies.put('username', res.data.user.username);
      $state.go('tab.create');
    });
  };



  function createSmartCart (house) {

    LoginService.createNewSmartCart(house).then( (res)=> {

      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      var id = res.data.house.id;
      $cookies.put('house_id', id, {expires: expireDate}); 
      $state.go('tab.add');
    });
  }


  vm.login = function(user){

    
    $http.post(url+'/login', user).then((res)=>{
      console.log(res);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      $cookies.put('auth_token', res.data.user.access_token, {expires: expireDate});
      $cookies.put('username', res.data.user.username, {expires: expireDate});
      $state.go('tab.home');

    });
    
    
  };
})

.controller('ListController', function($scope, SERVER, $cookies, ListService, $state, $http, $ionicPopup) {
  var items= [];

  var vm = this;
  var url = SERVER.URL;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;
  vm.addItemsToPantry = addItemsToPantry;
  vm.clearThese = clearThese;

  vm.removeItem = removeItem;
  vm.addNewItem = addNewItem;
  vm.groceryList = groceryList;
  vm.purchased = [];

  $scope.data = {
    showDelete: false
  };

  function addNewItem (food) {
    ListService.addItem(food).then((response) => {
    });
  }

  groceryList();
  function groceryList() {    
    ListService.getGroceryList().then( (response) => {

      vm.groceryListYay = response.data;
    
    });
  }
  function removeItem (object) {
    ListService.removeFood(object.id);
    setTimeout( function() {
      $state.reload();
    },100);
  }

  function addItemsToPantry() {

    vm.purchased.map(function(x){
      $http.post(url + '/edible', x, SERVER.CONFIG).then((res)=>{
        ListService.removeFood(x.id);
        setTimeout( function() {
          $state.reload();
        },100);
      });
    });  
  }
  
  function clearThese() {
    vm.purchased.map(function(x){
      ListService.removeFood(x.id);
      setTimeout( function() {
        $state.reload();
      },100);
    });
  }

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
                  <ion-toggle ng-model="food.necessity" toggle-class="toggle-calm">Necessity?</ion-toggle>
                </form>`,
      title: 'Add a new Item',
      subTitle: 'Fill out each input and press save!',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
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
      ListService.addItem(res).then((res2) => {
        
        $state.reload();
      });
    });
  };

});
