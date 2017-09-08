	$( document ).ready(function() {	
    console.log( "document loaded" );
});
 
	$( window ).on( "load", function() {
    console.log( "window loaded" );
});

/*var eventfulAPI = {
  apiKey: "LvNQGQZt7rxqzb3c",
};*/
/*var googleMapsAPI = {
	apiKey: "AIzaSyC0uRVfcTs52EtGkE_jP0DkQH_SNc-znVY"
}*/

// a spot to put what they are looking for
var evetyp = "";
var loc = "";

//	a variable that points at the empty div
var infoSpot = $('.eventfulReturnContainer');
// event listener for the submit
var subBtn = $('#submitButton');
// anamyous function responding the click
subBtn.on("click", function(event) {
	event.preventDefault();
// grabing the users input
	var eventName = $("#theEvent").val().trim();
	var locationName = $("#location").val().trim();
// temp spot to put my new info
    var eventRef = {
    	events: eventName,
    	locat: locationName
  	};
// pushing the objects to the string variables
	evetyp += eventRef.events;
	loc += eventRef.locat;
/*	evetyp.push(eventRef.events);
	loc.push(eventRef.locat);*/
// console loging, don't get rid of this yet
	console.log(eventRef.events);
	console.log(eventRef.locat);
// clear the text boxes after the submit
	$("#theEvent").val("");
	$("#destinationInput").val("");
// not using XML here. It just turns out that XML is so popular that JSON is called an XML response. 
	var theRequest = new XMLHttpRequest();
// the method and the URL arguements
	theRequest.open("GET", "http://eventful.com/json/events?q=" + evetyp + "&l=" + loc + "&app_key=LvNQGQZt7rxqzb3c");
// first argument is GET, second is URL
	theRequest.onload = function() {
// just a condition handling errors, we could take this out but their is no reason to. It just helped me when I was coding it. 
		if (theRequest.status >= 200 && theRequest.status < 400) {
// accessing the data, (to myself: don't forget to parse)
			var	eventsData = JSON.parse(theRequest.responseText);
// function call that passes the data collected
			renderHTML(ourData);
		} else {
// if we decide to keep the condition handling error we should put something else here that's useful the user
			console.log("connected to server but an error has returned");			
		}
	};
// more handling errors, embeded function
	theRequest.onerror = function() {
// this one is really unneccesary but if we decide to keep it put something more useful here
		console.log("Connection error");
	}
// actually sending the request
	theRequest.send();
});
// html paragraph function that will send our the data to the screen. The word -data- can be changed to anything if you guys need that word for something
function renderHTML(data) {
	var htmlString = "";
	var y = $('.returnInfo');
// looping through to grab all the stuff to do data
	for (x = 0; x < data.length; x++) {
// concatinating. creating a paragraph element for each data group we get back. (note to self: .title.discription is from api.eventful.com/tools/tutorials/search and might not be correct.)
		htmlString += y + " " + data[x].title.length + " " + data[x].discription.length;
	}
// this will return the var htmlString. The inserAdjacentHTML and beforeend is a method and arguement that is supposed to be universal. 
	infoSpot.inserAdjacentHTML('beforeend', htmlString);
}
