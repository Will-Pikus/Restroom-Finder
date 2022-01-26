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
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }