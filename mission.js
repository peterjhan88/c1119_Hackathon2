class Mission{
  constructor(missionIndex, missionObj, handleCallback, handleMapCallback){
    this.missionIndex = missionIndex;
    this.missionObj = missionObj;
    this.handleCallback = handleCallback;
    this.handleClick = this.handleClick.bind(this);
    this.handleMapCallback = handleMapCallback;
  }

  missionData(missionObj){
    $('.timer-countdown').text("COUNTER HERE");
  }

  render(){
    var $rowItem = $('<div>').addClass('launch-list')
                              .text(this.missionObj.mission_name)
                              .on('click',this.handleClick);
    return $rowItem;
  }
  handleClick(){
    this.handleCallback(this.missionObj);
    this.handleMapCallback(this.missionObj);
  }
}
