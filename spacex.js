var arrayOfLaunches;

function upcomingLaunches() {
  var ajaxConfigObject = {
    dataType: 'json',
    url: 'https://api.spacexdata.com/v3/launches/upcoming',
    method: 'GET',
    success: this.listOfLaunches,
    error: console.log('error')
  }
  $.ajax(ajaxConfigObject);
}

function listOfLaunches(response){
  arrayOfLaunches = response;
  for(var indexOfarrayOfLaunches = 0; indexOfarrayOfLaunches < arrayOfLaunches.length; indexOfarrayOfLaunches++){
    var rowItem = $('<div>').addClass('launch-list').text(arrayOfLaunches[indexOfarrayOfLaunches].mission_name);
    var splicePictures = arrayOfLaunches.splice
    $('.upcoming-launch').append(rowItem);
  }
  console.log(response);
}

upcomingLaunches();
