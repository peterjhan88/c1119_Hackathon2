class MyGoogleMap{
  constructor(){
    this.startPosition = {
      lat: 28.571364,
      lng: -80.656498
    };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center : this.startPosition,
      disableDefaultUI: true,
      zoom : 12
    });
    this.service = new google.maps.places.PlacesService(this.map);

    this.searchTargetLocation = this.searchTargetLocation.bind(this);
  }

  searchTargetLocation(mission){
    var placeName = mission.launch_site.site_name_long;
    var request = {
      query : placeName,
      fields: ['name','geometry']
    };
    var missionMap = this.map;
    this.service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var marker = new google.maps.Marker({
            map: missionMap,
            position: results[i].geometry.location
          });
        }
        missionMap.setCenter(results[0].geometry.location);
      }
    });
  }

}
