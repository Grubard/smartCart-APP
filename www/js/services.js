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
    console.log(SERVER.CONFIG);
    var h = new House(house);
    console.log(SERVER.CONFIG);
    console.log('h:', h);
    return $http.post(url + '/house', h, SERVER.CONFIG);
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
