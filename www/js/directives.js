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
  .directive('dairy', function() {
    return {

      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        element.on('click', function () {
          var item = angular.element(document.querySelectorAll('.dairy'));
     
          item.toggleClass('hide');


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