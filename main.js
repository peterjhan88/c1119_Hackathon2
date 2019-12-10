// function initializeApp(){
//   getMap();
// }

var map;

function createMap(){
  var options = {
    center: {
      lat: 33.634984,
      lng: - 117.740424},
      zoom: 10
  };
  map = new google.maps.Map($('.map-contianer'), options);
}
