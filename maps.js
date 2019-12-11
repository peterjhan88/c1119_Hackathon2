$(document).ready(initializeApp);

function initializeApp() {
  $('#test-btn').on('click', createMap);
}

var map, infoWindow;

function createMap() {
  console.log("creating map");
  var options = {
    center: {
      lat: 33.634984,
      lng: -117.740424
    },
    zoom: 15,
    disableDefaultUI: true,
  };
  map = new google.maps.Map(document.getElementById('map'), options);
  infoWindow = new google.maps.InfoWindow;
  var position = {
    lat: 33.634984,
    lng: -117.740424
  }
  infoWindow.setPosition(position);
  infoWindow.setContent('Learning FUZE!!!<br>Your location!');
  infoWindow.open(map);
}
