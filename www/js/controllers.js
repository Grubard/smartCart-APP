angular.module('starter.controllers', [])

.controller('UserHomeController', function($scope) {

})

.controller('PantryController', function($scope) {
  
})

.controller('LoginController', function($scope, SERVER, $http, $cookies, $state) {
  var url = SERVER.URL;


  var vm = this;

  vm.showCreateNew = showCreateNew;
  vm.createSmartCart = createSmartCart;

  function showCreateNew () {
    $('.logIn').addClass('hidden');
    $('.createAcct').addClass('shown');
    $('.newButton').addClass('hidden');
  }



  vm.signUp = function(newUser){
    $http.post(url+'/signup/', newUser).then((res)=>{
      console.log(res.data);
      $cookies.put('auth_token', res.data.user.access_token);
      $cookies.put('username', res.data.user.username);
    });
    $('.createAcct').addClass('hidden');
    $('.newSmartCart').addClass('shown');
  };



  function createSmartCart (house) {
    console.log(house);
    LoginService.createNewSmartCart(house).then( (res)=> {
      console.log(res);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      var id = res.data.house.id;
      $cookies.put('house_id', id, {expires: expireDate}); 
    });

    $('.addOthers').addClass('shown');
    $('.finishButton').addClass('shown');
    $('.newSmartCart').addClass('hidden');
  }


  vm.login = function(user){
    console.log(user);
    
    $http.post(url+'/login', user).then((res)=>{
      console.log(res);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      $cookies.put('auth_token', res.data.user.access_token, {expires: expireDate});
      $cookies.put('username', res.data.user.username, {expires: expireDate});
      $state.transitionTo('tab.home');

    });
    
    
  };
})

.controller('ListController', function($scope) {

});
