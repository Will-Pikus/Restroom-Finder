let distance = document.getElementById('distance-dropdown')
let public = document.getElementById('public-dropdown')
let where = document.getElementById('location')
let gender = document.getElementById('gender-dropdown')
let submit = document.getElementById('submitbtn')



submit.addEventListener('click', function() { 
    console.log(distance.value);
    console.log(public.value);
    console.log(gender.value);
    console.log(where.value);
});

let map, infoWindow;

function initMap() {
<<<<<<< HEAD
    map = new google.maps.Map(document.getElementById('map'),{
        center: {lat: 66, lng: 66},
        zoom: 8,
        mapId: 'e5c1493f9a045ddd'
    })
}
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    console.log( "Latitude: " + position.coords.latitude +
    "Longitude: " + position.coords.longitude);
  }
//This function returns ONE result.
  function query() {

    fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mcdonalds%20san%20diego&inputtype=textquery&fields=formatted_address&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
    .then(response => response.json())
    .then(data => {
    console.log(data);
     
    })
  }
  //This one searches for items matching the keyword around the same area.
  function query2() {

    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.7547401,-117.1414917&radius=50000&keyword=starbucks&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
    .then(response => response.json())
    .then(data => {
      let results = data['results'][0].vicinity;
      
      console.log(data);
      console.log(results);

    })
  }
  //This link will search for nearby places
  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=[38.8976763%2C-77.0365298]&radius=50000&keyword=mcdonalds&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM
  //Places API takes text input. Our text input will always be the same. We just
//function to use the Places API
//add event listener to search. ask for location upon search.
//pass location search as the argument for API call
//Function to make divs populated with search results
//just update the count of restroom users.
=======
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
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

          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: {                             
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
            animation: google.maps.Animation.DROP,
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
 
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
>>>>>>> 15532ab5d903a16025fb5876270aeeb29bd5471d
