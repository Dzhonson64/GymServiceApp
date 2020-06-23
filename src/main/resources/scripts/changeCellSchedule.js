let timeCell, dateCell;
$(".addNoteSchedule").on("click", function () {
    $("#changeCellSchedule").removeClass("closeRecording");
    $("#changeCellSchedule").addClass("activeRecording");
    dateCell = $(this).closest("td").attr("data-date");
    timeCell = $(this).closest("td").attr("data-time");
})

$("#closeRecording").on("click", function () {
    $("#changeCellSchedule").removeClass("activeRecording");
    $("#changeCellSchedule").addClass("closeRecording");
})

$("#btnSendChangeSchedule").click(function(event) {
    event.preventDefault();
    let formBlock = $(this).closest("form");
    sendChangeSchedule(formBlock, dateCell);

});


function sendChangeSchedule(formBlock, dateCell) {

    var form = formBlock[0];
    console.log(form);
    var data = new FormData(form);
    data.append("dateCell", dateCell)
    console.log(data.get("name"));
    $("#btnSendRecording").prop("disabled", false);
    $.ajax({
        type: "PUT",
        url: "/putActivitySchedule",
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
            console.log("SUCCESS : ", data);
            if (textStatus === "success"){
                hiddenRecording();
                showPopUpSuccessful();
                showPopUpSuccessful();
            }
            $("#btnSendRecording").prop("disabled", false);
            //
            $("#resultResponsePopUp").text("Заявка отправлена");
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