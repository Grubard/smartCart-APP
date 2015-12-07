angular.module('starter.controllers', [])

.controller('UserHomeController', function($scope) {

})

.controller('AddUserController', function($state, $http, $cookies) {
  var vm = this;
  vm.addUser= function(user){
    console.log(user);
  };
})

.controller('PantryController', function($scope) {
  
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
