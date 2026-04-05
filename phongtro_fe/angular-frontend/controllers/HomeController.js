'use strict';

app.controller('HomeController', ['$scope', 'PROPERTIES_DATA', function($scope, PROPERTIES_DATA) {
  
  // === Filter State ===
  $scope.searchQuery = '';
  $scope.ward = 'Tất cả';
  $scope.street = 'Tất cả';
  $scope.bedrooms = 'Tất cả';
  $scope.priceRange = 'Tất cả';
  $scope.propertyType = 'Tất cả';
  
  // === Modal State ===
  $scope.selectedProperty = null;
  $scope.activeImageIndex = 0;
  
  // === Properties Data ===
  $scope.properties = PROPERTIES_DATA;
  
  // === Filter Options ===
  $scope.wards = [
    'Tất cả',
    'Phường Quy Nhơn',
    'Phường Quy Nhơn Nam',
    'Phường Quy Nhơn Bắc',
    'Phường Quy Nhơn Đông',
    'Phường Quy Nhơn Tây',
    'Xã Nhơn Châu'
  ];
  
  $scope.streets = [
    'Tất cả',
    'Tây Sơn',
    'Nguyễn Huệ',
    'Lê Lợi',
    'Ngô Mây',
    'Nguyễn Thái Học',
    'Trần Hưng Đạo'
  ];
  
  $scope.bedroomOptions = ['Tất cả', '1', '2', '3', '4', '6'];
  
  $scope.priceRanges = [
    'Tất cả',
    'Dưới 1.000.000',
    'Từ 1.000.000 đến 3.000.000',
    'Từ 3.000.000 đến 5.000.000',
    'Từ 5.000.000 đến 10.000.000',
    'Trên 10.000.000'
  ];
  
  $scope.propertyTypes = ['Tất cả', 'Phòng trọ', 'Chung cư', 'Căn hộ', 'Nhà phố'];

  // === Computed: Filtered Properties ===
  $scope.getFilteredProperties = function() {
    return $scope.properties.filter(function(item) {
      // Search Query
      var query = $scope.searchQuery.toLowerCase();
      var matchesSearch = !query || 
        item.title.toLowerCase().indexOf(query) !== -1 ||
        item.ward.toLowerCase().indexOf(query) !== -1 ||
        item.street.toLowerCase().indexOf(query) !== -1;
      
      // Ward
      var matchesWard = $scope.ward === 'Tất cả' || item.ward === $scope.ward;
      
      // Street
      var matchesStreet = $scope.street === 'Tất cả' || item.street === $scope.street;
      
      // Bedrooms
      var matchesBedrooms = $scope.bedrooms === 'Tất cả' || item.bedrooms.toString() === $scope.bedrooms;
      
      // Property Type
      var matchesType = $scope.propertyType === 'Tất cả' || item.type === $scope.propertyType;
      
      // Price Range
      var matchesPrice = true;
      switch($scope.priceRange) {
        case 'Dưới 1.000.000':
          matchesPrice = item.price < 1000000; break;
        case 'Từ 1.000.000 đến 3.000.000':
          matchesPrice = item.price >= 1000000 && item.price <= 3000000; break;
        case 'Từ 3.000.000 đến 5.000.000':
          matchesPrice = item.price >= 3000000 && item.price <= 5000000; break;
        case 'Từ 5.000.000 đến 10.000.000':
          matchesPrice = item.price >= 5000000 && item.price <= 10000000; break;
        case 'Trên 10.000.000':
          matchesPrice = item.price > 10000000; break;
      }
      
      return matchesSearch && matchesWard && matchesStreet && matchesBedrooms && matchesType && matchesPrice;
    });
  };

  // === Actions ===
  $scope.openModal = function(property) {
    $scope.selectedProperty = property;
    $scope.activeImageIndex = 0;
    document.body.style.overflow = 'hidden';
  };
  
  $scope.closeModal = function() {
    $scope.selectedProperty = null;
    $scope.activeImageIndex = 0;
    document.body.style.overflow = '';
  };
  
  $scope.setActiveImage = function(index) {
    $scope.activeImageIndex = index;
  };
  
  $scope.getCurrentImage = function() {
    if (!$scope.selectedProperty) return '';
    var images = $scope.selectedProperty.images;
    if (images && images.length > 0 && $scope.activeImageIndex < images.length) {
      return images[$scope.activeImageIndex];
    }
    return $scope.selectedProperty.image_url;
  };
  
  $scope.clearFilters = function() {
    $scope.searchQuery = '';
    $scope.ward = 'Tất cả';
    $scope.street = 'Tất cả';
    $scope.bedrooms = 'Tất cả';
    $scope.priceRange = 'Tất cả';
    $scope.propertyType = 'Tất cả';
  };
  
  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && $scope.selectedProperty) {
      $scope.$apply(function() {
        $scope.closeModal();
      });
    }
  });
  
  // Close modal when clicking overlay
  $scope.onOverlayClick = function($event) {
    if ($event.target === $event.currentTarget) {
      $scope.closeModal();
    }
  };
}]);
