// Sample businesses data
var businesses = [
    {
      "name": "Coffee Haven",
      "latitude": 32.8793,
      "longitude": -117.2357,
      "category": "Coffee"
    },
    {
      "name": "University Inn",
      "latitude": 32.8745,
      "longitude": -117.2402,
      "category": "Hotels"
    },
    {
      "name": "Campus Dining",
      "latitude": 32.8798,
      "longitude": -117.2381,
      "category": "Restaurants"
    },
    {
      "name": "Fresh Mart",
      "latitude": 32.8805,
      "longitude": -117.2327,
      "category": "Markets"
    },
    {
      "name": "Espresso Junction",
      "latitude": 32.8757,
      "longitude": -117.2336,
      "category": "Coffee"
    },
    {
      "name": "Park View Hotel",
      "latitude": 32.8769,
      "longitude": -117.2415,
      "category": "Hotels"
    },
    {
      "name": "The Pizzeria",
      "latitude": 32.8796,
      "longitude": -117.2368,
      "category": "Restaurants"
    },
    {
      "name": "Fresh Farms",
      "latitude": 32.8812,
      "longitude": -117.2344,
      "category": "Markets"
    },
    {
      "name": "Mocha Delight",
      "latitude": 32.8751,
      "longitude": -117.2362,
      "category": "Coffee"
    },
    {
      "name": "Sunset Lodge",
      "latitude": 32.8763,
      "longitude": -117.2431,
      "category": "Hotels"
    },
    {
      "name": "Sushi Avenue",
      "latitude": 32.8782,
      "longitude": -117.2379,
      "category": "Restaurants"
    },
    {
      "name": "Organic Mart",
      "latitude": 32.8794,
      "longitude": -117.2319,
      "category": "Markets"
    }
  ];
  
  // Initialize Leaflet map
  var map = L.map('map').setView([32.8788, -117.2359], 15); // Centered around University Way, San Diego
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Add markers for all businesses
  var markers = [];
  businesses.forEach(function(business) {
    var marker = L.marker([business.latitude, business.longitude]);
    marker.options.category = business.category; // Assign category to marker options
    marker.bindPopup("<b>" + business.name + "</b><br>Category: " + business.category);
    markers.push(marker);
  });
  
  // Function to filter markers based on category
  function filterMarkers(category) {
    markers.forEach(function(marker) {
      if (category === "All" || marker.options.category === category) {
        map.addLayer(marker); // Add marker to the map
      } else {
        map.removeLayer(marker); // Remove marker from the map
      }
    });
  }
  
  // Add filter select control
  var select = document.getElementById("FilterCategories");
  select.addEventListener("change", function() {
    var selectedCategory = this.value;
    filterMarkers(selectedCategory);
  });
  
  // Initially, display all markers
  filterMarkers("All");
  