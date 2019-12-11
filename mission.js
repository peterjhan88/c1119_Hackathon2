class Mission{
  constructor(missionIndex, missionObj, handleCallback, handleGiphyCallback, handleArticleCallback){
    this.missionIndex = missionIndex;
    this.missionObj = missionObj;
    this.handleCallback = handleCallback;
    this.handleGiphyCallback = handleGiphyCallback;
    this.handleArticleCallback = handleArticleCallback;
    this.handleClick = this.handleClick.bind(this);

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
    this.handleGiphyCallback(this.missionIndex);
    this.handleArticleCallback(this.missionIndex);
  }
}
