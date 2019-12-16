class SpaceX{
  constructor(){
    this.arrayOfLaunches = [];
    this.newYorkTimesResult = [];
    this.myMap = new MyGoogleMap();
    this.displayMissionData = this.displayMissionData.bind(this);
    this.displayMissionList = this.displayMissionList.bind(this);
    this.processGetUpcomingLaunches = this.processGetUpcomingLaunches.bind(this);
    this.processGetUpcomingLaunchesError = this.processGetUpcomingLaunchesError.bind(this);
    this.displayArticle = this.displayArticle.bind(this);
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
      var mission = new Mission(indexOfarrayOfLaunches, missionObject, this.displayMissionData, this.handleMap);
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
    var $detailsBox = $('<div>').addClass('details').text('Details: ' + missionObj.details);
    $missionInfo.append($leftDataBox);
    $($missionInfo.append($detailsBox));
    $leftDataBox.append($rocketName, $flightNumber, $launchDate, $launchDateUtc);
  }

  displayArticle() {
      $('.right-data').empty();
    for (var i = 0; i <  this.newYorkTimesResult.length; i++){
      var articleTitle = $('<div>').addClass('article-title').text(this.newYorkTimesResult[i].headline.main);
      var details = $('<div>').addClass('right-data-bottom-half').text(this.newYorkTimesResult[i].abstract);
      var hyperlink = $('<a>').attr('href', this.newYorkTimesResult[i].web_url).attr('target', '_blank').text("To Read More Click Here");
      $('.right-data').append(articleTitle, details, hyperlink);
    }

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
    this.displayArticle();
  }

  processGetNewYorkTimesArticleError2(responseFromNewYorkTimes) {
    console.log(responseFromNewYorkTimes);
  }

  handleMap(missionObj){
    this.myMap.searchTargetLocation(missionObj);
  }
}
