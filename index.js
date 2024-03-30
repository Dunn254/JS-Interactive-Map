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
  var map = L.map('map'); // Initialize map without setting the view
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Function to add markers for all businesses
  function addMarkers() {
    businesses.forEach(function(business) {
      var marker = L.marker([business.latitude, business.longitude]);
      marker.options.category = business.category; // Assign category to marker options
      marker.bindPopup("<b>" + business.name + "</b><br>Category: " + business.category);
      marker.addTo(map);
    });
  }
  
  // Function to center map based on user's current location
  function centerMapOnLocation(location) {
    map.setView(location, 15); // Set view to user's location with zoom level 15
  }
  
  // Request user's current location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLocation = [position.coords.latitude, position.coords.longitude];
      centerMapOnLocation(userLocation); // Center map on user's location
      addMarkers(); // Add markers after centering the map
  
      // Add marker for user's location
      var userMarker = L.marker(userLocation).addTo(map);
      userMarker.bindPopup("Your Location").openPopup();
    }, function(error) {
      console.error("Error getting user location:", error);
      // Fallback: Center the map on a default location (University Way, San Diego)
      var defaultLocation = [32.8788, -117.2359];
      map.setView(defaultLocation, 15);
      addMarkers(); // Add markers even if user location could not be determined
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
    // Fallback: Center the map on a default location (University Way, San Diego)
    var defaultLocation = [32.8788, -117.2359];
    map.setView(defaultLocation, 15);
    addMarkers(); // Add markers even if geolocation is not supported
  }
  
  // Add filter select control
  var select = document.getElementById("FilterCategories");
  select.addEventListener("change", function() {
    var selectedCategory = this.value;
    filterMarkers(selectedCategory);
  });
  
  // Initially, display all markers
  filterMarkers("All");
  