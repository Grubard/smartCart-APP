angular.module('starter.services', [])

.service('LoginService', function($http, SERVER, $cookies) {
  var vm = this;
  vm.createNewSmartCart = createNewSmartCart;

  var House = function(house){
    this.name = house.name;
    this.address= house.address;
  };

  function createNewSmartCart(house) {
    var url = SERVER.URL;
    var token = $cookies.get('auth_token');
    SERVER.CONFIG.headers['Access-Token'] = token;

    var h = new House(house);

    return $http.post(url + '/house', h, SERVER.CONFIG);
  }


})
.service('TransferService', function($http, SERVER, $cookies) {
  var url = SERVER.URL ;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;
  this.transferItems = transferItems;
  
  function transferItems(pantry){
    $http.get(url + '/grocery' , SERVER.CONFIG).then((res)=>{

      var groceries = res.data;
      var grocNames = [];
      groceries.map(function(name){
        grocNames.push(name.title);
      });

      

      pantry.map(function(panItem){

        if(panItem.quantity < panItem.preferred && panItem.necessity === true){
          var yay = $.inArray(panItem.title, grocNames);
          
          if(yay === -1){
            $http.post(url + '/grocery', panItem, SERVER.CONFIG).then((res)=>{

            });
          }
        }

        
      });

    });
  }


})
.service('PantryService', function($http, SERVER, $cookies) {
  var url = SERVER.URL;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;


  this.addItem = addItem;
  this.getPantryList = getPantryList;
  this.removeFood = removeFood;
  this.editFoodItem = editFoodItem;

  function Item (foodItem) {
    this.title = foodItem.title;
    this.quantity = foodItem.quantity;
    this.category = foodItem.category;
    this.preferred = foodItem.preferred;
    this.necessity = foodItem.necessity;
  }

  function addItem (foodItem) {
    var i = new Item(foodItem);
    return $http.post(url + '/edible', i, SERVER.CONFIG);
  }

  function getPantryList () {
    return $http.get(url + '/edible' , SERVER.CONFIG);
  }

  function removeFood (objId) {
    return $http.delete(url + '/edible/' + objId, SERVER.CONFIG);
  }
   function editFoodItem (foodObj) {
    var x = foodObj.id;
    return $http.put(url + '/edible/' + x, foodObj, SERVER.CONFIG);
  }
})
.service('ListService', function($http, SERVER, $cookies) {
  var url = SERVER.URL;
  var token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;


  this.addItem = addItem;
  this.getGroceryList = getGroceryList;
  this.removeFood = removeFood;

  function Item (foodItem) {
    this.title = foodItem.title;
    this.quantity = foodItem.quantity;
    this.category = foodItem.category;
    this.preferred = foodItem.preferred;
    this.necessity = foodItem.necessity;
  }

  function addItem (foodItem) {
    var i = new Item(foodItem);
    return $http.post(url + '/grocery', i, SERVER.CONFIG);
  }

  function getGroceryList () {
    return $http.get(url + '/grocery' , SERVER.CONFIG);
  }

  function removeFood (objId) {
    return $http.delete(url + '/grocery/' + objId, SERVER.CONFIG);
  }
})
.service('AuthService', function($cookies) {
  this.authenticate = authenticate;
  function authenticate (){

    var token = $cookies.get('auth_token');
    if(token){
      return true;
    } else{
      return false;
    }
  }
});
