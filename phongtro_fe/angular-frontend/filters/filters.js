'use strict';

// Custom filter for property price range
app.filter('priceRange', function() {
  return function(items, range) {
    if (!range || range === 'Tất cả') return items;
    
    return items.filter(function(item) {
      switch(range) {
        case 'Dưới 1.000.000':
          return item.price < 1000000;
        case 'Từ 1.000.000 đến 3.000.000':
          return item.price >= 1000000 && item.price <= 3000000;
        case 'Từ 3.000.000 đến 5.000.000':
          return item.price >= 3000000 && item.price <= 5000000;
        case 'Từ 5.000.000 đến 10.000.000':
          return item.price >= 5000000 && item.price <= 10000000;
        case 'Trên 10.000.000':
          return item.price > 10000000;
        default:
          return true;
      }
    });
  };
});

// Custom filter for property search (title, ward, street)
app.filter('propertySearch', function() {
  return function(items, query) {
    if (!query || query.trim() === '') return items;
    
    var lowerQuery = query.toLowerCase();
    return items.filter(function(item) {
      return item.title.toLowerCase().indexOf(lowerQuery) !== -1 ||
             item.ward.toLowerCase().indexOf(lowerQuery) !== -1 ||
             item.street.toLowerCase().indexOf(lowerQuery) !== -1;
    });
  };
});

// Custom filter for ward
app.filter('wardFilter', function() {
  return function(items, ward) {
    if (!ward || ward === 'Tất cả') return items;
    return items.filter(function(item) {
      return item.ward === ward;
    });
  };
});

// Custom filter for street
app.filter('streetFilter', function() {
  return function(items, street) {
    if (!street || street === 'Tất cả') return items;
    return items.filter(function(item) {
      return item.street === street;
    });
  };
});

// Custom filter for bedrooms
app.filter('bedroomFilter', function() {
  return function(items, bedrooms) {
    if (!bedrooms || bedrooms === 'Tất cả') return items;
    return items.filter(function(item) {
      return item.bedrooms.toString() === bedrooms;
    });
  };
});

// Custom filter for property type
app.filter('typeFilter', function() {
  return function(items, type) {
    if (!type || type === 'Tất cả') return items;
    return items.filter(function(item) {
      return item.type === type;
    });
  };
});
