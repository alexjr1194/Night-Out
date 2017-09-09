$(function() {

    var q = "";

    DN.search = function(list) {

        $("#results").html("");


        $.each(list, function(index, title) {
            $.get(
            "https://www.googleapis.com/youtube/v3/search",{
                part:'snippet, id',
                q: title,
                type: 'video',
                maxResults: 2,
                key: 'AIzaSyCj4YymhzXyuUv5yC88T2EQ_apysoUeUmg'
            }, function(data){

                $.each(data.items, function(i, item) {
                    var output = getOutput(item);
                    $("#results").append(output);

                })
            }
        );
        });
    };

    function getOutput(item) {
        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var description = item.snippet.discription;
        var thumb = item.snippet.thumbnails.high.url;
        var channelTitle = item.snippet.channelTitle;
        var videoDate = item.snippet.publishedAt;



        var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '">' +
        '</div>' +
        '<div class="list-right">'+
        '<h3>' + title+ '</h3>'+
        '<small>By <span class="cTitle">' +channelTitle+ '</span> on '+videoDate+'</small>'+
        '<p>'+description+'</p>'+
        '</div>'+
        '</li>'+
        '<div class="clearFix"></div>'+ ''
        ;
        return output
    }
})
