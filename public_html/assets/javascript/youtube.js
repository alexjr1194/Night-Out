$(function() {

    var q = "";

    //creates search function for youtube using eventful event names
    DN.search = function(list) {

        $("#results").html("");

        var promises = [];

        $.each(list, function(index, title) {
            promises.push($.get(
            "https://www.googleapis.com/youtube/v3/search",{
                part:'snippet, id',
                q: title,
                type: 'video',
                maxResults: '1',
                key: 'AIzaSyCj4YymhzXyuUv5yC88T2EQ_apysoUeUmg'
            }, function(data){

                $.each(data.items, function(i, item) {
                    var thumb = '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" target="_blank"><img src="' + item.snippet.thumbnails.high.url + '"></a>';
                    DN.data[index].push(thumb);
                });
            }
        ).promise());
        });

        Promise.all(promises).then(function() {
            DN.make_table();
        })
    };
})
