class SpaceX{
  constructor(){
    this.arrayOfLaunches = [];
    this.globalGiphyResult = [];
    this.newYorkTimesResult = [];
    this.myMap = new MyGoogleMap();
    this.displayMissionData = this.displayMissionData.bind(this);
    this.displayMissionList = this.displayMissionList.bind(this);
    this.processGetUpcomingLaunches = this.processGetUpcomingLaunches.bind(this);
    this.processGetUpcomingLaunchesError = this.processGetUpcomingLaunchesError.bind(this);
    this.spaceXGiphy = this.spaceXGiphy.bind(this);
    this.displayGiphy = this.displayGiphy.bind(this);
    this.displayArticle = this.displayArticle.bind(this);
    this.processSpaceXGiphy = this.processSpaceXGiphy.bind(this);
    this.processSpaceXGiphyError = this.processSpaceXGiphyError.bind(this);
    this.processGetNewYorkTimesArticleError = this.processGetNewYorkTimesArticleError.bind(this);
    this.processGetNewYorkTimesArticle = this.processGetNewYorkTimesArticle.bind(this);
    this.processGetNewYorkTimesArticle2 = this.processGetNewYorkTimesArticle2.bind(this);
    this.processGetNewYorkTimesArticleError2 = this.processGetNewYorkTimesArticleError2.bind(this);
    this.handleMap = this.handleMap.bind(this);

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
    this.spaceXGiphy();
    this.getNewYorkTimesArticle();
    this.getNewYorkTimesArticlePage2();
  }

  processGetUpcomingLaunchesError(response){
    console.log(response);
  }

  displayMissionList(response){
    this.arrayOfLaunches = response;
    var $upcomingLaunch = $('.upcoming-launch');
    for(var indexOfarrayOfLaunches = 0; indexOfarrayOfLaunches < this.arrayOfLaunches.length; indexOfarrayOfLaunches++){
      var missionObject = this.arrayOfLaunches[indexOfarrayOfLaunches];
      var mission = new Mission(indexOfarrayOfLaunches, missionObject, this.displayMissionData, this.displayGiphy, this.handleMap, this.displayArticle);
      var $mission = mission.render();
      $upcomingLaunch.append($mission);
    }
  }

  displayMissionData(missionObj) {
    var $missionInfo = $('.mission-info');
    $missionInfo.empty()
    var $rocketName = $('<div>').addClass('left-data-quarter-1').text('Rocket Name: ' + missionObj.rocket.rocket_name);
    var $flightNumber = $('<div>').addClass('left-data-quarter-2').text('Flight Number: ' + missionObj.flight_number);
    var $launchDate = $('<div>').addClass('left-data-quarter-3').text('Local Launch Date: ' + missionObj.launch_date_local);
    var $launchDateUtc = $('<div>').addClass('left-data-quarter-4').text('UTC Launch Date: ' + missionObj.launch_date_utc);
    var $leftDataBox = $('<div>').addClass('left-data');
    $missionInfo.append($leftDataBox);
    $leftDataBox.append($rocketName, $flightNumber, $launchDate, $launchDateUtc);
  }

  displayGiphy(missionIndex) {
    $('.giphy-container').empty();
    var gifImage = $('<img>').addClass('image-gif').attr('src',this.globalGiphyResult[missionIndex]);
    $('.giphy-container').append(gifImage);
  }

  displayArticle(missionIndex) {
    $('.right-data').empty();
    var articleTitle = $('<div>').addClass('article-title').text(this.newYorkTimesResult[missionIndex].headline.main);
    var details = $('<div>').addClass('right-data-bottom-half').text(this.newYorkTimesResult[missionIndex].abstract);
    var hyperlink = $('<a>').attr('href', this.newYorkTimesResult[missionIndex].web_url).attr('target', '_blank').text("To Read More Click Here");
    $('.right-data').append(articleTitle, details, hyperlink);
  }

  spaceXGiphy() {
    var ajaxConfigObject = {
      dataType: 'json',
      url: 'https://api.giphy.com/v1/gifs/search?api_key=GMpvvHWrDqks3qUBWnICzjIx4NAxOHvi&q=spacex&limit=40&offset=0&rating=G&lang=en',
      method: 'GET',
      success: this.processSpaceXGiphy,
      error: this.processSpaceXGiphyError
    }
    $.ajax(ajaxConfigObject);
  }

  processSpaceXGiphy(responseFromGiphy) {
    console.log(responseFromGiphy)
    for (var indexOfListOfGifs = 0; indexOfListOfGifs < responseFromGiphy.data.length; indexOfListOfGifs++) {
      this.globalGiphyResult.push(responseFromGiphy.data[indexOfListOfGifs].images.original.url);

    }
    this.globalGiphyResult.splice(10,1).shift();
    this.globalGiphyResult.splice(14, 1).shift();
    this.globalGiphyResult.splice(4, 1).shift();
    this.globalGiphyResult.splice(7, 1).shift();
    this.globalGiphyResult.splice(12, 1).shift();
    this.globalGiphyResult.splice(4, 1).shift();
    this.globalGiphyResult.splice(9, 1).shift();
    this.globalGiphyResult.splice(4, 1).shift();
    this.globalGiphyResult.splice(8, 1).shift();
    this.globalGiphyResult.splice(4, 1).shift();
  }

  processSpaceXGiphyError(responseFromGiphy) {
    console.log(responseFromGiphy);
  }

  getNewYorkTimesArticle(){
    var ajaxConfigObject = {
      dataType: 'json',
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=spacex&api-key=ARMCshLZUBtpwHbzJg0w4bD27vSNHnBj',
      method: 'GET',
      success: this.processGetNewYorkTimesArticle,
      error: this.processGetNewYorkTimesArticleError
    }
    $.ajax(ajaxConfigObject);
  }

  processGetNewYorkTimesArticle(responseFromNewYorkTimes) {
    for (var indexOfNewYorkTimesURL = 0; indexOfNewYorkTimesURL < responseFromNewYorkTimes.response.docs.length; indexOfNewYorkTimesURL++) {
      this.newYorkTimesResult.push(responseFromNewYorkTimes.response.docs[indexOfNewYorkTimesURL]);
    }
  }

  processGetNewYorkTimesArticleError(responseFromNewYorkTimes) {
    console.log(responseFromNewYorkTimes);
  }

  getNewYorkTimesArticlePage2() {
    var ajaxConfigObject = {
      dataType: 'json',
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=spacex&page=1&api-key=ARMCshLZUBtpwHbzJg0w4bD27vSNHnBj',
      method: 'GET',
      success: this.processGetNewYorkTimesArticle2,
      error: this.processGetNewYorkTimesArticleError2
    }
    $.ajax(ajaxConfigObject);
  }

  processGetNewYorkTimesArticle2(responseFromNewYorkTimes) {
    for (var indexOfNewYorkTimesURL = 0; indexOfNewYorkTimesURL < responseFromNewYorkTimes.response.docs.length; indexOfNewYorkTimesURL++) {
      this.newYorkTimesResult.push(responseFromNewYorkTimes.response.docs[indexOfNewYorkTimesURL]);
    }
  }

  processGetNewYorkTimesArticleError2(responseFromNewYorkTimes) {
    console.log(responseFromNewYorkTimes);
  }

  handleMap(missionObj){
    this.myMap.searchTargetLocation(missionObj);
  }
}
