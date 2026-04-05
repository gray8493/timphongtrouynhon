'use strict';

app.controller('RegisterController', ['$scope', '$location', function($scope, $location) {
  $scope.fullName = '';
  $scope.username = '';
  $scope.phone = '';
  $scope.password = '';
  $scope.confirmPassword = '';
  
  $scope.register = function() {
    if ($scope.password !== $scope.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    // TODO: Implement register logic with backend API
    console.log('Register attempt:', {
      fullName: $scope.fullName,
      username: $scope.username,
      phone: $scope.phone
    });
    alert('Chức năng đăng ký đang được phát triển!');
  };
  
  $scope.registerWithGoogle = function() {
    // TODO: Implement Google OAuth
    console.log('Google register attempt');
    alert('Đăng ký Google đang được phát triển!');
  };
}]);
