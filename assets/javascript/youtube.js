$(function() {
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&"
    var key = "AIzaSyCj4YymhzXyuUv5yC88T2EQ_apysoUeUmg"
    var q = "";

    $("#search-button").on("click", function(event) {
        event.preventDefault();
        search();
    })

    function search() {
        q = $("#query").val();
        console.log(q)

        $.get(
            "https://www.googleapis.com/youtube/v3/search",{
                part:'snippet',
                q: q,
                type: 'video',
                key: 'AIzaSyCj4YymhzXyuUv5yC88T2EQ_apysoUeUmg'
            }, function(data){
                console.log(data)
                
            }
        );
    };
})