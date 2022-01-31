let distance = document.getElementById('distance-dropdown')
let public = document.getElementById('public-dropdown')
let where = document.getElementById('location')
let gender = document.getElementById('gender-dropdown')
let submit = document.getElementById('submitbtn')
let resultsdiv = document.getElementById('result-container')
let lat;
let lng;
var myLatLng

//This is our input query. Need to pass it an "And/Or" instead of just the OR it currently has. Havent figured out the exact syntax, worked once, but i forget how.
let keyword = "(mcdonalds) | (starbucks) | (wal-mart)"

let map, infoWindow;

const locationButton = document.createElement("button");

//INIT MAP FUCNTION
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();


  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  getGeoLocation(map)
}

// HANDLE RESULT CLICK FUNCTION
function handleResultClick(event) {
  var btnClicked = $(event.target)
  var buttonText = btnClicked[0].innerHTML

  
  calcRoute(map,buttonText)

  console.log(buttonText)
}


// CALCULATE ROUTE FUNCTION
function calcRoute(map,buttonText) {
  //create a DirectionsService object to use the route method and get a result for our request
  var directionsService = new google.maps.DirectionsService();

  //create a DirectionsRenderer object which we will use to display the route
  var directionsDisplay = new google.maps.DirectionsRenderer();

  //bind the DirectionsRenderer to the map
  directionsDisplay.setMap(map);
  //create request
  var request = {
      origin: myLatLng,
      destination: buttonText,
      travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
      unitSystem: google.maps.UnitSystem.IMPERIAL
  }

  //pass the request to the route method
  directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        //delete route from map

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

function getGeoLocation(map){


  // Try HTML5 geolocation.

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        
         lat = position.coords.latitude;
         lng = position.coords.longitude;

         myLatLng = {
          lat: lat,
          lng: lng
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




}
//Same function as previous BUT it calls the query2function, so it populates the DOM with results.
function getGeoLocation2(){


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

        // const marker = new google.maps.Marker({
        //   position: pos,
        //   map: map,
        //   icon: {                             
        //     url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
        //   animation: google.maps.Animation.DROP,
        // });
   
        
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
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




//This one searches for items matching the keyword around the same area.
function query2(test, test2) {
  let distancev = distance.value
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+test+'%2C'+test2+'&radius='+distancev+'&keyword='+keyword+'&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let results = data.results

    if(results.length > 0){
      resultsdiv.innerHTML=""

      let topResultsText = document.createElement('h1')
      topResultsText.classList.add('container-h1', 'padding-top')
      topResultsText.textContent = "Top Results: "
      resultsdiv.append(topResultsText)


      for(var i = 0; i < 5 ; i++){
      
        let resultButton = document.createElement('button');
        resultButton.classList.add('results-button')

        let placename = i+1 +". "+ results[i].name + " "
        let placeaddress = results[i].vicinity;

        resultButton.textContent = placename + placeaddress;
        // resultButton.append(placeaddress);

        resultsdiv.append(resultButton)

        const marker = new google.maps.Marker({
          position: results[i].geometry.location,
          map: map,
          icon: {                             
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"},
          animation: google.maps.Animation.DROP,
        });

      }
    }else{
      window.alert("There are no locations in your area within this radius.");
    }
  })
};

submit.addEventListener('click', function() {

   getGeoLocation2();

});

locationButton.addEventListener("click", () => {
  getGeoLocation();
});

locationButton.addEventListener("click", getGeoLocation)

resultsdiv.addEventListener('click', handleResultClick)

//Dont want to delete this function just in case we end up wanting to do a multi-query thing or something.
// function query() {

//   fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mcdonalds%20san%20diego&inputtype=textquery&fields=formatted_address&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
//   .then(response => response.json())
//   .then(data => {
//   console.log(data);
   
//   })
// }