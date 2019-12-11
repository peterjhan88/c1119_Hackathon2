class SpaceX{
  constructor(){
    this.arrayOfLaunches = [];
    this.globalGiphyResult = [];
    this.displayMissionData = this.displayMissionData.bind(this);
    this.displayMissionList = this.displayMissionList.bind(this);
    this.processGetUpcomingLaunches = this.processGetUpcomingLaunches.bind(this);
    this.processGetUpcomingLaunchesError = this.processGetUpcomingLaunchesError.bind(this);
    this.spaceXGiphy = this.spaceXGiphy.bind(this);
    this.displayGiphy = this.displayGiphy.bind(this);
    this.processSpaceXGiphy = this.processSpaceXGiphy.bind(this);
    this.processSpaceXGiphyError = this.processSpaceXGiphyError.bind(this);
    this.getUpcomingLaunches();
  }


  getUpcomingLaunches() {
    var ajaxConfigObject = {
      dataType: 'json',
      url: 'https://api.spacexdata.com/v3/launches/upcoming',
      method: 'GET',
      success: this.processGetUpcomingLaunches,
      error: this.processGetUpcomingLaunchesError
    }
    $.ajax(ajaxConfigObject);
  }

  processGetUpcomingLaunches(response){
    this.displayMissionList(response);
    var numberOfScheduledLaunches = response.length
    console.log("numberofscheduledlaunches", numberOfScheduledLaunches);
    this.spaceXGiphy();
  }

  processGetUpcomingLaunchesError(response){
    console.log(response);
  }

  displayMissionList(response){
    this.arrayOfLaunches = response;
    var $upcomingLaunch = $('.upcoming-launch');
    for(var indexOfarrayOfLaunches = 0; indexOfarrayOfLaunches < this.arrayOfLaunches.length; indexOfarrayOfLaunches++){
      var missionObject = this.arrayOfLaunches[indexOfarrayOfLaunches];
      var mission = new Mission(indexOfarrayOfLaunches, missionObject, this.displayMissionData, this.displayGiphy);
      var $mission = mission.render();
      $upcomingLaunch.append($mission);
    }
    console.log(response);
  }

  displayMissionData(missionObj) {
    var $missionInfo = $('.mission-info');
    $missionInfo.empty()
    var result="";
    result += missionObj.details+"<br>";
    result += missionObj.mission_name + "<br>";
    result += missionObj.flight_number + "<br>";
    result += missionObj.launch_year + "<br>";
    result += missionObj.launch_date_local + "<br>";
    result += missionObj.launch_date_source + "<br>";
    result += missionObj.launch_date_unix + "<br>";
    result += missionObj.launch_date_utc + "<br>";
    result += missionObj.rocket.rocket_name;
    $missionInfo.html(result);
  }

  displayGiphy(missionIndex) {
    // console.log(missionObj)
    $('.giphy-container').empty();
    // var imageIndex = missionObj.missionIndex;
    // console.log(imageIndex);
    // var randomGif = Math.floor(Math.random() * this.globalGiphyResult.length);
    var gifImage = $('<img>').addClass('image-gif').attr('src',this.globalGiphyResult[missionIndex]);
    $('.giphy-container').append(gifImage);

  }

  spaceXGiphy() {
    var ajaxConfigObject = {
      dataType: 'json',
      url: 'https://api.giphy.com/v1/gifs/search?api_key=GMpvvHWrDqks3qUBWnICzjIx4NAxOHvi&q=spacex&limit=19&offset=0&rating=G&lang=en',
      method: 'GET',
      success: this.processSpaceXGiphy,
      error: console.log('gif error')
    }
    $.ajax(ajaxConfigObject);
  }

  processSpaceXGiphy(responseFromGiphy) {
    for (var indexOfListOfGifs = 0; indexOfListOfGifs < responseFromGiphy.data.length; indexOfListOfGifs++) {
      this.globalGiphyResult.push(responseFromGiphy.data[indexOfListOfGifs].images.original.url);
    }
  }

  processSpaceXGiphyError(responseFromGiphy) {
    console.log(responseFromGiphy);
  }
}
