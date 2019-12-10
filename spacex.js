
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
  $('.mission-info').append(missionObj);
  console.log("hello: ", missionObj);
}

}
