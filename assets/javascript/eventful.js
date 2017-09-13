var DN = {
  data: [],

  //eventful API, returns 10 events near area searched
  get_events: function() {
   var where   = document.getElementById("where");
   var query   = document.getElementById("query");
   var oArgs = {
      app_key: "LvNQGQZt7rxqzb3c",
      q: query.value,
      where: where.value,
      "date": "future",
      /*"include": "tags,categories",*/
      page_size: 10,
      sort_order: "relevance",
   };

   //used to help EVDB API call reference DN scope
   var self = this;

   //eventful API function, loops over each event, gets the info, returns
   //the title from each event (map function)
   EVDB.API.call("/events/search", oArgs, function(oData) {

      $.each(oData.events.event, function(i, event){
        self.eventInfo(event);
      });

      var newData = self.data.map(function(event, index) {
        return event[0];
      });

      //gets the eventful data so their not all listed as one element
      console.log(DN.data);

      for (var x in DN.data) {
        var newElement = document.createElement('div');
        newElement.id = DN.data[x]; newElement.className = "eventA";
        newElement.innerHTML = DN.data[x];
        $('#eventLocation').append(newElement);
      } 

      //calls youtube search function from youtube.js
      DN.search(newData);

    });

      //calls weatherInfo function from below
      DN.weatherInfo();
  },


  //retrieves desired event info from eventful API
  eventInfo: function(event) {
    this.data.push([
      event.title,
      event.city_name,
      event.start_time,
      event.stop_time,
      event.venue_name,
      event.venue_address,
      event.url
    ]);
  },

  //ajax call to get weather information of searched location
  weatherInfo: function(){

    city = where.value.split(' ').join('+');

    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=4a7863f14c5d844ad35eb60d9964368a&units=imperial'

    $.ajax({
      method: "GET",
      url: queryURL,
    }).done(function( response ) {
      $('#weatherInfo').html(
          '<h2> Weather For ' + where.value + ": </h2> <h3>" +
          response.main.temp + "°F, " +
          response.weather[0].description +
          ", Wind: " + response.wind.speed + " mph </h3>"
        );

    })
  }
}
  //simple google maps function
/*  function myMap() {
    var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
  };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }*/
var map; 
function initMap() { 
  map = new google.maps.Map(document.getElementById('map'), { 
    zoom: 2, 
    center: new google.maps.LatLng(37.8716,122.2727), 
    mapTypeId: 'terrain' 
  });
  var mapLoc = DN.data[5];
  $.each(DN.data, function(index, value) { 
    console.log(value[5]); 
    $("#map").append(value[5]);
  })
};

window.eqfeed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
};
