class Mission{
  constructor(missionIndex, missionObj){
    this.missionIndex = missionIndex;
    this.missionObj = missionObj;
  }

// missionData(missionObj){
//   $('.timer-countdown').text("COUNTER HERE");
// }

render(){
  var $rowItem = $('<div>').addClass('launch-list').text(this.missionObj.mission_name);
  // $('.upcoming-launch').append(rowItem);
  return $rowItem;
}
}
