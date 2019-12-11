var globalGiphyResult;

class Giphy{

  constructor(){

  }
}

function spaceXGiphy(mission_name){
  var ajaxConfigObject = {
    dataType: 'json',
    url: 'https://api.giphy.com/v1/gifs/search?api_key=GMpvvHWrDqks3qUBWnICzjIx4NAxOHvi&q=spacex&limit=25&offset=0&rating=G&lang=en',
    method: 'GET',
    data: {
      name: mission_name
    },
    success: this.listOfGifs,
    error: console.log('gif error')
  }
  $.ajax(ajaxConfigObject);
}

function listOfGifs(response){
  globalGiphyResult = response;
  for(var indexOfListOfGifs = 0; indexOfListOfGifs < globalGiphyResult.data.length; indexOfListOfGifs++){
    var allImages = (globalGiphyResult.data[indexOfListOfGifs].images.original.url);
  }
  var images = (globalGiphyResult.data[1].images.original.url);
  var appendImages = $('<img>').addClass('image-gif').attr('src', images);
  $('.giphy-container').append(appendImages);
  console.log(response);
}

spaceXGiphy();
