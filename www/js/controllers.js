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

.controller('PantryController', function($cookies, ListService, PantryService, $scope) {
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
  

  pantryList();

  function pantryList() {
    PantryService.getPantryList().then( (response) => {
      vm.pantryItems = response.data;
      var items = response.data;
      items.forEach(function(item) {
  
        if (item.neccessity === true) {
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

.controller('ListController', function($scope) {

});
