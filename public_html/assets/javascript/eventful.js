var DN = {
  data: [],

  make_table: function() {
    var html = '';

    $.each(this.data, function(i, value) {
      html += '<tr>';

      $.each(value, function(j, category){
        html += '<td>' + category + '</td>';
      });

      html += '</tr>';

    });

    $('#eventResults').html(html);
    console.log(html);
  },

  //eventful API, returns 10 events near area searched
  get_events: function() {
    var where   = document.getElementById("where");
    var query   = document.getElementById("query");
    var oArgs = {
       app_key: "LvNQGQZt7rxqzb3c",
       q: query.value,
       where: where.value,
       "date": "future",
       "include": "tags,categories",
       page_size: 10,
       sort_order: "relevance",
    };

    //used to help EVDB API call reference DN scope
    var self = this;

    //eventful API function, loops over each event, gets the info, returns
    //the title from each event (map function)
    EVDB.API.call("/events/search", oArgs, function(oData) {

      self.data = [];

      $.each(oData.events.event, function(i, event){
        self.eventInfo(event);
      });

      var newData = self.data.map(function(event, index) {
        return event[0];
      });

      //calls youtube search function from youtube.js
      DN.search(newData);

    });

    //calls weatherInfo function from below
    DN.weatherInfo();
  },


  //retrieves desired event info from eventful API
  eventInfo: function(event) {

    if (event.stop_time == null) {
      event.stop_time = 'All Day!';
    }

    this.data.push([
      event.title,
      event.city_name,
      event.start_time,
      event.stop_time,
      event.venue_name,
      event.venue_address,
      '<a href="' + event.url + '" target="_blank"> Check it out! </a>'
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
        '<h2> The current weather for ' + where.value + " is: </h2> <h3> <b>" +
        response.main.temp + "°F, " +
        response.weather[0].description +
        ", Wind: " + response.wind.speed + " mph </h3> </b>"
      );
    })
  }

}
