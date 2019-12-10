$(document).ready(initializeApp);

function initializeApp() {
  $('#test-btn').on('click', createMap);
}

var map;

function createMap() {
  var options = {
    center: {
      lat: 33.634984,
      lng: -117.740424
    },
    zoom: 18,
    disableDefaultUI: true,
  };
  map = new google.maps.Map(document.getElementById('map'), options);
}
$(document).ready(initializeApp);

function initializeApp() {
  $('#test-btn').on('click', createMap);
}

var map;

function createMap() {
  console.log("creating map");
  var options = {
    center: {
      lat: 33.634984,
      lng: -117.740424
    },
    zoom: 18,
    disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById('map'), options);
}

class Map{
  constructor(){
    this.map;
  }
  createMap(){
    console.log("creating map");
    var options = {
      center: {
        lat: 33.634984,
        lng: -117.740424
      },
      zoom: 18,
      disableDefaultUI: true;
    }
  }
}
