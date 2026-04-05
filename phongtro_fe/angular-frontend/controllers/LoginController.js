'use strict';

app.controller('LoginController', ['$scope', '$location', function($scope, $location) {
  $scope.email = '';
  $scope.password = '';
  
  $scope.login = function() {
    // TODO: Implement login logic with backend API
    console.log('Login attempt:', $scope.email);
    alert('Chức năng đăng nhập đang được phát triển!');
  };
  
  $scope.loginWithGoogle = function() {
    // TODO: Implement Google OAuth
    console.log('Google login attempt');
    alert('Đăng nhập Google đang được phát triển!');
  };
}]);
