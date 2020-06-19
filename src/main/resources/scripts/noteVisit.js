$(".userList .note-btn").on("click", function (event) {
    let idUser = $(this).closest("tr").find(".userId").text();
    deleteRecordingCard(parseInt(idUser));
})

function deleteRecordingCard(id) {
    let data = new FormData();
    console.log(id)
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("idUser", id);

    $.ajax({
        type: "POST",
        url: "/user/noteVisit",
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        data: data,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            if (textStatus === "success"){
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