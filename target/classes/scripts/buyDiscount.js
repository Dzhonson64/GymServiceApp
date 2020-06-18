/*==================================================================
    [ Show & Hidden a recording form ]*/


$(".greeting .buy").click(function (e) {
    console.log("t");
    e.preventDefault();
    let checkedPrice = $(this).siblings(".card__price").children('.inputGroup').children('input[name="radio"]:checked');
    let idDiscount =  $(this).siblings(".idDiscount");
    console.log(checkedPrice.siblings(".idPrice").val(), idDiscount.val());
    console.log($("#idUser").val());
    if (parseInt($("#idUser").val()) !== -1){
        console.log("F");
        requestBookDiscount(checkedPrice.siblings(".idPrice").val(), idDiscount.val())
    }else {
        console.log("F2");
        window.location.href = "http://localhost:8080/login/"
    }

    // $("#recording").removeClass("closeRecording");
    // $("#recording").addClass("activeRecording");

})
//
// $("buy").click(function () {
//     $("#recording").removeClass("activeRecording");
//     $("#recording").addClass("closeRecording");
//
// })
/*==================================================================*/


function requestBookDiscount(idPrice, idDiscount) {
    var data = new FormData();
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("idPrice", idPrice);
    data.append("idDiscount", idDiscount);
    data.append("_csrf", csrfToken);
    $.ajax({
        type: "POST",
        url: "user/bookDiscount",
        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        data: data,
        // complete: function(xmlHttp) {
        //     // xmlHttp is a XMLHttpRquest object
        //     alert(xmlHttp.status);
        // },
        success: function(data, textStatus, jqXHR) {
            if (textStatus === "success"){
                showPopUpSuccessful();
                $("#resultResponsePopUp").text("Абонемент успешно куплен!");
            }
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            showPopUpError("<h5>УПС!!!</h5>" +
                "<p>Произошла неожиданная ошибка." +
                "<br>Мы уже ведём работу по её устанению! Извнините за неудобства.</p>"

            );
            console.log("ERROR : ", jqXHR.responseText);

        }
    });
}