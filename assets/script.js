let distance = document.getElementById('distance-dropdown')
let public = document.getElementById('public-dropdown')
let where = document.getElementById('location')
let gender = document.getElementById('gender-dropdown')
let submit = document.getElementById('submitbtn')
let lat;
let lng;
var myLatLng = {lat: 38.3460, lng: -0.4907}
var dest = "New York, NY, USA"
var start = "Las Vegas, NV, USA"

submit.addEventListener('click', function() { 
    console.log(distance.value);
    console.log(public.value);
    console.log(gender.value);
    console.log(where.value);
});

let map, infoWindow;

// INITIATE MAP FUNCTION
function initMap() {
  var mapOptions = {
      center: myLatLng,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //create map
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var currentLoc = getCurrLoc(map)
  //create a DirectionsService object to use the route method and get a result for our request
  var directionsService = new google.maps.DirectionsService();

  //create a DirectionsRenderer object which we will use to display the route
  var directionsDisplay = new google.maps.DirectionsRenderer();

  //bind the DirectionsRenderer to the map
  directionsDisplay.setMap(map);
  calcRoute(directionsService,directionsDisplay,currentLoc,map)
}

// CALCULATE ROUTE FUNCTION
function calcRoute(directionsService,directionsDisplay,currentLoc, map) {
  //create request
  var request = {
      origin: start,
      destination: dest,
      travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
      unitSystem: google.maps.UnitSystem.IMPERIAL
  }

  //pass the request to the route method
  directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {

          //Get distance and time and display on DOM
          // const output = document.querySelector('#output');
          // output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

          //display route
          directionsDisplay.setDirections(result);
      } else {
          //delete route from map
          directionsDisplay.setDirections({ routes: [] });
          //center map in London
          map.setCenter(myLatLng);

          //show error message
          // output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
      }
  });
}

function getCurrLoc(map){
  infoWindow = new google.maps.InfoWindow();
  
  // const locationButton = document.createElement("button");
  // locationButton.textContent = "Pan to Current Location";
  // locationButton.classList.add("custom-map-control-button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // locationButton.addEventListener("click", () => {

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          map.setCenter(pos);
          // return pos

          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: {                             
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
            animation: google.maps.Animation.DROP,
          });
          return pos
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } 
    else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  // });

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
}


initMap()
 

function query() {

  fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mcdonalds%20san%20diego&inputtype=textquery&fields=formatted_address&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json())
  .then(data => {
  console.log(data);
   
  })
}
//This one searches for items matching the keyword around the same area.
function query2() {
console.log(lat);
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat+ '%2' + lng +'&radius=50000&keyword=starbucks&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let results = data['results'][0].vicinity;
    
    console.log(data);
    console.log(results);

  })
}
//This link will search for nearby places
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.8976763%2C-77.0365298&radius=50000&keyword=mcdonalds&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM
//Places API takes text input. Our text input will always be the same. We just
//function to use the Places API
//add event listener to search. ask for location upon search.
//pass location search as the argument for API call
//Function to make divs populated with search results
//just update the count of restroom users.