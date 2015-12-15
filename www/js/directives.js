angular.module('starter.directives', [])
  .directive('pantry', function() {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {
          var other = angular.element(document.querySelector('.grocery'));
          var pantry = angular.element(document.querySelector('.list1'));
          var grocery = angular.element(document.querySelector('.list2'));
          
          element.css("border-bottom", "none");
          other.css("border", "1px solid black");          

          pantry.removeClass('hide');
          grocery.addClass('hide');


        });
      }
    };
  })
  .directive('grocery', function() {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {
          var other = angular.element(document.querySelector('.pantry'));
          var pantry = angular.element(document.querySelector('.list1'));
          var grocery = angular.element(document.querySelector('.list2'));
          
          element.css("border-bottom", "none");
          other.css("border", "1px solid black");

          pantry.addClass('hide');
          grocery.removeClass('hide');

        });
      }
    };
  })
  .directive('logout', function($cookies, $state) {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {
          $cookies.remove('auth_token');
          $cookies.remove('username');
          $cookies.remove('house_id');
  
          $state.go('tab.login');
        });
      }
    };
  })
  .directive('child', function() {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {

          var item = angular.element(element[0].nextElementSibling.children[0].children);
          
          angular.forEach(item, function(v, k) {
            
            var a = angular.element(v);
            a.toggleClass('hide');
          });
        });
      }
    };
  })
  .directive('delete', function() {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {
          console.log(element[0].parentNode.parentNode);
          var item = angular.element(element[0].parentNode.parentNode);
          
          item.addClass('hide');
     
        


        });
      }
    };
  })
  /// Will be deleted after for each funciton is in
  .directive('home', function() {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {
          var item = angular.element(document.querySelectorAll('.home'));
     
          item.toggleClass('hide');


        });
      }
    };
  })
    /// Will be deleted after for each funciton is in
  .directive('butch', function() {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {
          var item = angular.element(document.querySelectorAll('.butch'));
     
          item.toggleClass('hide');


        });
      }
    };
  });