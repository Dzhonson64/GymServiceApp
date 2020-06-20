$(".userList .come").on("click", function (event) {
    let idUser = $(this).closest("tr").find(".userId").text();
    let parent = $(this).closest("td");
    noteCome(parseInt(idUser), $(this),  parent);
})


$(".userList .left").on("click", function (event) {
    let idUser = $(this).closest("tr").find(".userId").text();
    let comeBlock = $(this).closest("tr").find(".come");
    console.log(comeBlock);
    noteLeft(parseInt(idUser),  comeBlock);
})


function requestComeToGym(){
    let idUser = $(this).closest("tr").find(".userId").text();
    let parent = $(this).closest("td");
    noteCome(parseInt(idUser), $(this),  parent);
}

function requestLeftFromGym(){
    let idUser = $(this).closest("tr").find(".userId").text();
    let parent = $(this).closest("td");
    noteLeft(parseInt(idUser), $(this), parent);
}

function noteCome(id, comeBlock, parent) {
    let data = new FormData();
    console.log(id)
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("idUser", id);

    $.ajax({
        type: "POST",
        url: "/user/noteCome",
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        data: data,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            if (textStatus === "success"){
                comeBlock.remove();
                $("<div class=\"note-btn left\">\n" +
                    "                        Ушёл\n" +
                    "                    </div>").appendTo(parent).on("click", requestLeftFromGym);

            }
            $("#btnSendRecording").prop("disabled", false);

            showPopUpSuccessful();
            $("#resultResponsePopUp").html("Посещение пользователя <i>" + data + "</i> было успешно отмечено!" );
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);
            hiddenRecording();
            showPopUpError("<h5>Ошибка запроса</h5>");
            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });



}
function noteLeft(id, leftBlock, parent) {
    let data = new FormData();
    console.log(id)
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("idUser", id);

    $.ajax({
        type: "POST",
        url: "/user/noteLeft",
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        data: data,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            if (textStatus === "success"){
                leftBlock.remove();
                $("<div class=\"note-btn come\">\n" +
                    "                        Пришёл\n" +
                    "                    </div>").appendTo(parent).on("click", requestComeToGym);
            }
            $("#btnSendRecording").prop("disabled", false);
            //
            showPopUpSuccessful();
            $("#resultResponsePopUp").html("Посещение пользователя <i>" + data + "</i> было успешно отмечено!" );
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);
            hiddenRecording();
            showPopUpError("<h5>Ошибка запроса</h5>");
            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });



}