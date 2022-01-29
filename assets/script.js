let distance = document.getElementById('distance-dropdown')
let public = document.getElementById('public-dropdown')
let where = document.getElementById('location')
let gender = document.getElementById('gender-dropdown')
let submit = document.getElementById('submitbtn')
let submit2 = document.getElementById('submitbtn2')
let resultsdiv = document.getElementById('result-container')
let keyword = "(mcdonalds) | (starbucks) | (wal-mart)"
let lat;
let lng;


submit.addEventListener('click', function() { 

});

let map, infoWindow;

const locationButton = document.createElement("button");

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();


  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
 
}
function getGeoLocation(){


  // Try HTML5 geolocation.

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        
         lat = position.coords.latitude;
         lng = position.coords.longitude;

         query2(lat,lng)
    
   
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




}

locationButton.addEventListener("click", () => {
getGeoLocation();
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


// function query() {

//   fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mcdonalds%20san%20diego&inputtype=textquery&fields=formatted_address&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
//   .then(response => response.json())
//   .then(data => {
//   console.log(data);
   
//   })
// }

//This one searches for items matching the keyword around the same area.
function query2(test, test2) {
  let distancev = distance.value
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+test+'%2C'+test2+'&radius='+distancev+'&keyword='+keyword+'&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let results = data.results

    for(var i = 0; i < 5 ; i++){
     
      let placename = results[i].name
      let div = document.createElement('div');
      let p = document.createElement('p');
      let placeaddress = results[i].vicinity;
      p.append(placename);
      div.append(p);
      resultsdiv.append(div);
      p.append(placeaddress);
      div.append(p)
    }
  })
};

submit2.addEventListener('click', async function() {

   getGeoLocation();
  // console.log(lat, lng)
  // query2(lat, lng);
});

