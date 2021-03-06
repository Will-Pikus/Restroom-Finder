let distance = document.getElementById('distance-dropdown')
let public = document.getElementById('public-dropdown')
let where = document.getElementById('location')
let gender = document.getElementById('gender-dropdown')
let submit = document.getElementById('submitbtn')
let resultsdiv = document.getElementById('result-container')
let lat;
let lng;
let globalInfoWindow;
var myLatLng
var modalBg = document.querySelector('.modal-bg')
var modalclose = document.querySelector('.modal-close')
var lastsearch = document.querySelector('#last-search')

//This is our input query. Need to pass it an "And/Or" instead of just the OR it currently has. Havent figured out the exact syntax, worked once, but i forget how.
let keyword = "mcdonalds"

let map, infoWindow;

const locationButton = document.createElement("button");

//Populates last searched
lastsearch.innerHTML = localStorage.getItem('lastviewed') + "...";
//INIT MAP FUCNTION
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();


  // locationButton.textContent = "Pan to Current Location";
  // locationButton.classList.add("custom-map-control-button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  getGeoLocation(map)
}
//HANDLE LAST SEARCH CLICK FUNCTION
function handleLastSearchButton(event) {
  var btnClicked = $(event.target)
  var buttonText = btnClicked[0].innerHTML
  var lastaddress = buttonText

  calcRoute(map,lastaddress)


}

// HANDLE RESULT CLICK FUNCTION
function handleResultClick(event) {
  var btnClicked = $(event.target)
  var buttonText = btnClicked[0].innerHTML
  var trimmedtext = buttonText.substring(3);

  localStorage.setItem('lastviewed', trimmedtext)

  
  calcRoute(map,buttonText)

  lastsearch.innerHTML = localStorage.getItem('lastviewed');

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

        document.querySelector('#route-output').innerHTML = ""
          //Get distance and time and display on DOM
          const output = document.querySelector('#route-output');
          output.className = 'route-container'

          var routeInfo = document.createElement('h1')
          routeInfo.textContent="Route Info"
          routeInfo.classList.add('container-h1')
          output.append(routeInfo)

          var fromText = document.createElement('p')
          fromText.textContent="From: Your Location"
          fromText.classList.add('p-norm')
          output.append(fromText)

          var toText = document.createElement('p')
          toText.textContent="To: " + buttonText
          toText.classList.add('p-norm')
          output.append(toText)

          var distText = document.createElement('p')
          distText.textContent="Driving Distance: " + result.routes[0].legs[0].distance.text
          distText.classList.add('p-norm')
          output.append(distText)

          var durationText = document.createElement('p')
          durationText.textContent="Duration: " + result.routes[0].legs[0].duration.text
          durationText.classList.add('p-norm')
          output.append(durationText)

          // output.innerHTML = "<div class='container-h1'>Route Info<div class='p-bold'>From: <div class='p-norm'>Your Location.<br /><div class='p-bold'>To:<div class='p-norm'> " + buttonText + ".<br /> <div class='p-bold'>Driving distance: <div class='p-norm'>" + result.routes[0].legs[0].distance.text + ".<br /><div class='p-bold'>Duration :<div class='p-norm'> " + result.routes[0].legs[0].duration.text + ".</div>";

          //display route
          directionsDisplay.setDirections(result);
      } else {
          //delete route from map
          directionsDisplay.setDirections({ routes: [] });
          
          map.setCenter(myLatLng);
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
        map.setZoom(13);

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
// locationButton.addEventListener("click", () => {
// getGeoLocation();
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


//This one searches for items matching the keyword around the same area.
function query2(test, test2) {
  let distancev = distance.value
  Promise.all([
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+test+'%2C'+test2+'&radius='+distancev+'&keyword='+keyword+'&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json()),
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+test+'%2C'+test2+'&radius='+distancev+'&keyword=starbucks&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json()),
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+test+'%2C'+test2+'&radius='+distancev+'&keyword=wendys&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
  .then(response => response.json())

  ]).then(data => {
    let data0 = data[0].results;
    let data1 = data[1].results;
    let data2 = data[2].results;

    let results = data0.concat(data1,data2);
    console.log(results);
    results.sort
    resultsdiv.innerHTML=""
      
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
          // creates the locations Markers
            const markerPlaces = new google.maps.Marker({
                position: results[i].geometry.location,
                map: map,                            
                icon: './assets/images/toileticon56x.png',
                animation: google.maps.Animation.DROP,

            });
            // 
            markerPlaces.addListener("click", () => {
              console.log('clicked', markerPlaces)
              if (globalInfoWindow) {
                globalInfoWindow.close();
              }
              globalInfoWindow = new google.maps.InfoWindow({
                content: contentString,
              })
              globalInfoWindow.open({
                anchor: markerPlaces,
                map,
                shouldFocus: false,
                
              });
            });
            console.log('markerPlaces', markerPlaces)
            let contentString = 
               "<div class='marker-text-box'>" +
               "<h5>"+
                 results[i].name+
               "</h5>"+ 
               "<h6>"+
               results[i].vicinity+
               "</h6>"+

               "</div>";

        


            
        }
    }else{
      // window.alert("There are no locations in your area within this radius.");
      modalBg.classList.add('bg-active');
    }
  })
};

modalclose.addEventListener('click', function() {
  modalBg.classList.remove('bg-active')
});



submit.addEventListener('click', function() {
   getGeoLocation2();
   initMap();

});

locationButton.addEventListener("click", () => {
  getGeoLocation();
});

locationButton.addEventListener("click", getGeoLocation)

resultsdiv.addEventListener('click', handleResultClick)
lastsearch.addEventListener('click', handleLastSearchButton)

//Dont want to delete this function just in case we end up wanting to do a multi-query thing or something.
// function query() {

//   fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mcdonalds%20san%20diego&inputtype=textquery&fields=formatted_address&key=AIzaSyCItHTXTMZs3fcjRKsg7UcaNeWLUdTIdDM')
//   .then(response => response.json())
//   .then(data => {
//   console.log(data);
   
//   })
// }