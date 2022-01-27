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

function initMap() {
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