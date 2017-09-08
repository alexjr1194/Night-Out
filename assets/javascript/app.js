var userSearch = '';


function getLocation() {
  $.ajax({
    url: 'http://www.mapquestapi.com/geocoding/v1/address?key=ySnFWLf3jumt1VVFoT9kSA6H2qlYX11m&location=San+Francisco,CA',
    method: 'GET',
    dataType: 'json',
    success: function(response){
      console.log(response.data);
  }
})};

getLocation();


$('#citySearch').on('click', function() {
  console.log(google.maps.places);

  // userSearch = $('#textInput').val();
  // userSearch = userSearch.split(' ').join('+');
  // var url = ' '

  // getLocation(url)
});


// GOOGLE PLACES API
var map;
var infowindow;

function initMap() {
  var sanFrancisco = {lat: 37.775, lng: -122.419};

  map = new google.maps.Map(document.getElementById('map'), {
    center: sanFrancisco,
    zoom: 12
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: sanFrancisco,
    radius: 500,
    type: ['store']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


// YOUTUBE API
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
