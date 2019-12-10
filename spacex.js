
class SpaceX{
  constructor(){
    this.arrayOfLaunches = [];
    this.getUpcomingLaunches();
  }

addEventHandlers(){
  $('.launch-list').on('click', this.displayMissionData)
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
    var mission = new Mission(indexOfarrayOfLaunches, missionObject);
    var $mission = mission.render();
    $upcomingLaunch.append($mission);
  }
  console.log(response);
}

//   displayMissionData() {
//     var missionObj = this.listOfLaunches[this.listOfLaunches.attr('id')];
//     console.log("hello: ", missionObj);
//   }

}
