class SpaceX{
  constructor(){
    this.arrayOfLaunches = [];
    this.displayMissionData = this.displayMissionData.bind(this);
    this.displayMissionList = this.displayMissionList.bind(this);
    this.getUpcomingLaunches();
  }

  addEventHandlers(){
    // $('.upcoming-launch').on('click', '.launch-list', this.displayMissionData)
  }

  getUpcomingLaunches() {
    var ajaxConfigObject = {
      dataType: 'json',
      url: 'https://api.spacexdata.com/v3/launches/upcoming',
      method: 'GET',
      success: this.displayMissionList,
      error: console.log
    }
    $.ajax(ajaxConfigObject);
  }

  displayMissionList(response){
    this.arrayOfLaunches = response;
    var $upcomingLaunch = $('.upcoming-launch');
    for(var indexOfarrayOfLaunches = 0; indexOfarrayOfLaunches < this.arrayOfLaunches.length; indexOfarrayOfLaunches++){
      var missionObject = this.arrayOfLaunches[indexOfarrayOfLaunches];
      var mission = new Mission(indexOfarrayOfLaunches, missionObject, this.displayMissionData);
      var $mission = mission.render();
      $upcomingLaunch.append($mission);
    }
    console.log(response);
  }

  displayMissionData(missionObj) {
    var $missionInfo = $('.mission-info');
    $missionInfo.empty()
    var result="";
    result += "Details: " + missionObj.details+"<br>";
    result += "Mission Name: " + missionObj.mission_name + "<br>";
    result += "Flight Number: " + missionObj.flight_number + "<br>";
    result += "Launch Year: " + missionObj.launch_year + "<br>";
    result += "Launch Date: " + missionObj.launch_date_local + "<br>";
    result += "Launch Date Source: " + missionObj.launch_date_source + "<br>";
    result += "Lanch Date Unix: " + missionObj.launch_date_unix + "<br>";
    result += "Launch Date UTC: " + missionObj.launch_date_utc + "<br>";
    result += "Rocket Name: " + missionObj.rocket.rocket_name;

    $missionInfo.html(result);
  }
}
