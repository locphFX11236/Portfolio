$(document).ready(function(){
    
    //to do: hàm chạy API và in kết quả
    function inner(url){
        $('.loading').css('display','block');
        $('#main').css('display','none')
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let news = data.articles;
                let output = "";
                for(let i = 0; i < news.length; i++) {
                    output += 
                    '<div class="cont">' +
                    '<img class="imag col-md-3 col-sm-4" src="' + news[i].image + 'alt="' + 
                        news[i].source.name + '" height="100%">' +
                    '<div class=" col-md-9 col-sm-8">' +
                        '<a class="link" href="' + news[i].url + '" target="_blank"><h4>' +
                            news[i].title + '</h4></a>' +
                        '<p class="time">' + news[i].publishedAt + '</p>' +
                        '<p class="desc">' + news[i].description + '</p>' +
                    '</div>' +
                    '</div><br>';
                };
                $("#main").html(output);
            })
            .catch(function () {
                alert('Vui lòng tải lại');
            })
            .finally(function () {
                $('#main').css('display','block')
                $('.loading').css('display','none');
            });
    };
    
    //to do: hàm seach tin top healine
    function newload(){
        let url = "https://gnews.io/api/v4/top-headlines?&token=" + api;
        inner (url);
    };

    //to do: hàm đóng seachbox
    function close() {
        $('#backdrop, #seachbox').css('display','none');
    };

    //to do: lấy tin hàng đầu bằng api-token 
    const api = "d3f8eda0d1f032ad0c26e4ec0a666d03";

    newload ();
    
    //to do: tạo bảng tim kiếm
    $('#openbox').click(function(){
        $('#backdrop, #seachbox').css('display','block');
    });
    
    //to do: đóng bảng tìm kiếm
    $('#closebox').click(function(){
        close();
    });
    
    $('#backdrop').click(function(){
        close();
    });
    
    //to do: lấy tin theo tìm kiếm
    $('#bnt_seach').click(function(){

        //to do: Lấy thông tin từ seachbox
        let keyw = $("#id1").val();
        if (keyw == "") {
            alert("Vui lòng nhập keyword");
        } else {
            let lang = $("#id2").val();
            let coun = $("#id3").val();
            let from = $("#id4").val().toString() + 'T07:00:00Z';
            let to = $("#id5").val().toString() + 'T07:00:00Z';
            let sort = $("#id6").val();
    
            //to do: tao url seach
            let url = 'https://gnews.io/api/v4/search?' +
                'q=' + keyw +
                '&lang='+ lang +
                '&country='+ coun +
                '&from='+ from +
                '&to='+ to +
                '&sortby='+ sort +
                '&token='+ api;
            inner (url);
        };
        close();
        $("#id1").val("");
    });
    
});