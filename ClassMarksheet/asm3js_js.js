$(document).ready(function(){
    
    let stt = 3;
    let tb = "?";

    //to do: nút nhập
    $("#btnnhap").click(function(){
        //to do: Lấy giá trị từ input
        let name = $("#name").val();
        let math = $("#math").val();
        let phys = $("#phys").val();
        let chem = $("#chemi").val();
        stt ++;

        //to do: chèn dòng
        $("#myTable").append(
            "<tr><td>" + stt + "</td>"
            + "<td>" + name + "</td>"
            + "<td>" + math + "</td>"
            + "<td>" + phys + "</td>"
            + "<td>" + chem + "</td>"
            + "<td>" + tb + "</td></tr>"
        );
        
        //to do: xóa ô input
        $("#name").val("");
        $("#math").val("");
        $("#phys").val("");
        $("#chemi").val("");
    });

    //to do: nút xóa
    $("#btnxoa").click(function(){
        $("#myTable tr:last").remove();
        stt --;
    });

    //to do: nút tính điểm trung bình
    $("#btntinh").click(function(){
        $("#myTable tr").each(function(){
            let math = parseFloat($(this).children("td:eq(2)").html());
            let phys = parseFloat($(this).children("td:eq(3)").html());
            let chem = parseFloat($(this).children("td:eq(4)").html());
            let tb = (math + phys + chem) / 3;
            $(this).children("td:eq(5)").text(tb.toFixed(1));
        });
    });

    // var x = $("#myTable tr:eq(3)").children("td:eq(5)").text();
    // alert(x);

    //to do: nút tìm học sinh giỏi
    $("#btntim").click(function(){
        $("#myTable tr").each(function(){
            let tb = parseFloat($(this).children("td:eq(5)").html());
            if (tb >= 8) {
                $(this).addClass("gioi");
            }
        });
    });

});