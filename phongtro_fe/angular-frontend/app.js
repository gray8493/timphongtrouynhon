'use strict';

// Main AngularJS Module
var app = angular.module('phongtroApp', ['ngRoute', 'ngAnimate']);

// Route Configuration
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// Currency format filter for VND
app.filter('vnd', function() {
  return function(input) {
    if (!input && input !== 0) return '';
    return input.toLocaleString('vi-VN');
  };
});
