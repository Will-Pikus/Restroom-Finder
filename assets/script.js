let distance = document.getElementById('distance-dropdown')
let public = document.getElementById('public-dropdown')
let where = document.getElementById('location')
let gender = document.getElementById('gender-dropdown')
let submit = document.getElementById('submitbtn')
let submit2 = document.getElementById('submitbtn2')
let resultsdiv = document.getElementById('result-container')
let lat;
let lng;


submit.addEventListener('click', function() { 
    console.log(distance.value);
    console.log(public.value);
    console.log(gender.value);
    console.log(where.value);
});

let map, infoWindow;

function initMap() {
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
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          console.log(lat)
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


function query() {

  fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mcdonalds%20san%20diego&inputtype=textquery&fields=formatted_address&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json())
  .then(data => {
  console.log(data);
   
  })
}

//This one searches for items matching the keyword around the same area.
function query2() {
  let distancev = distance.value
  console.log(distancev)
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+'%2C'+lng+'&radius='+distancev+'&keyword=mcdonalds&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let results = data['results'];
  
    console.log(results[0]);
    place1 = [results[0].name, results[0].vicinity]
    place2 = [results[1].name, results[1].vicinity]
    place3 = [results[2].name, results[2].vicinity]
    place4 = [results[3].name, results[3].vicinity]
    place5 = [results[4].name, results[4].vicinity]
    resultsdiv.innerHTML = 
    `<div class=""><h5>Result 1</h5>
    <p>`+place1[0]+ `</p>
    <p>`+place1[1]+ `</p>
   </div>
   <div class=""><h5>Result 2</h5>
    <p>`+place2[0]+ `</p>
    <p>`+place2[1]+ `</p>
   </div>
   <div class=""><h5>Result 3</h5>
    <p>`+place3[0]+ `</p>
    <p>`+place3[1]+ `</p>
   </div>
   <div class=""><h5>Result 4</h5>
    <p>`+place4[0]+ `</p>
    <p>`+place4[1]+ `</p>
   </div>
   <div class=""><h5>Result 5</h5>
    <p>`+place5[0]+ `</p>
    <p>`+place5[1]+ `</p>
   </div>`
  })
}

submit2.addEventListener('click', function() {
  query2();
})

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat+ '%2' + lng +'&radius=50000&keyword=mcdonalds&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM
//This link will search for nearby places
//
//Places API takes text input. Our text input will always be the same. We just
//function to use the Places API
//add event listener to search. ask for location upon search.
//pass location search as the argument for API call
//Function to make divs populated with search results
//just update the count of restroom users.