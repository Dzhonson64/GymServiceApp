let timeCell, dateCell;
$(".addNoteSchedule").on("click", function () {
    $("#changeCellSchedule").removeClass("closeRecording");
    $("#changeCellSchedule").addClass("activeRecording");
    dateCell = $(this).closest("td").attr("data-date");
    timeCell = $(this).closest("td").attr("data-time");
})

$(".bntDelete").on("click", function () {
    let cellData = $(this).closest(".data");
    let idCellData = parseInt(cellData.attr("data-id"));
    sendDeleteNoteSchedule(idCellData, cellData)
})

$(".bntChange").on("click", function () {
    $("#changeCellSchedule2").removeClass("closeRecording");
    $("#changeCellSchedule2").addClass("activeRecording");

    let cellData = $(this).closest(".data");
    let cellDataId = parseInt(cellData.attr("data-id"));
    let tag = cellData.find(".tag").text().trim();
    let timeStart = cellData.find(".time .start").text().trim();
    let topic = cellData.find(".name").text().trim();
    let duration = parseInt(cellData.find(".duration").text());
    let coachId = parseInt(cellData.find(".coach").attr("data-coachId"));
    console.log(coachId);

    $("#changeCellSchedule2").find(".topic").val(topic);
    $("#changeCellSchedule2").find(".tag").val(tag);
    $("#changeCellSchedule2").find(".startTime").val(timeStart);
    $("#changeCellSchedule2").find(".duration").val(duration);
    $("#changeCellSchedule2").find(".duration").val(duration);
    $("#changeCellSchedule2").find("form").attr("data-coachId", coachId);
    $("#changeCellSchedule2").find("form").attr("data-cellDataId", cellDataId);

    dateCell = $(this).closest(".data").attr("data-date");
    timeCell = $(this).closest(".data").attr("data-time");
})

$("#changeCellSchedule #closeRecording").on("click", function () {
    $("#changeCellSchedule").removeClass("activeRecording");
    $("#changeCellSchedule").addClass("closeRecording");
})
$("#changeCellSchedule2 #closeRecording").on("click", function () {
    $("#changeCellSchedule2").removeClass("activeRecording");
    $("#changeCellSchedule2").addClass("closeRecording");
})

$("#changeCellSchedule #btnSendChangeSchedule").click(function(event) {
    event.preventDefault();
    let formBlock = $(this).closest("form");
    let clientId = parseInt($("#changeCellSchedule").find(".selectClient option:selected").val());
    sendAddNoteSchedule(formBlock, dateCell, clientId);
});

$("#changeCellSchedule2 #btnSendChangeSchedule").click(function(event) {
    event.preventDefault();
    let clientId = parseInt($("#changeCellSchedule2").find(".selectClient option:selected").val());
    let formBlock = $(this).closest("form");
    sendChangeNoteSchedule(formBlock, dateCell, clientId);
});


function sendAddNoteSchedule(formBlock, dateCell, clientId) {

    var form = formBlock[0];
    var data = new FormData(form);
    data.append("dateCell", dateCell)
    data.append("clientId", clientId)
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
function sendChangeNoteSchedule(formBlock, dateCell, clientId) {

    var form = formBlock[0];
    console.log(formBlock.attr("data-coachId"));
    var data = new FormData(form);
    data.append("dateCell", dateCell)
    data.append("clientId", clientId)
    data.append("idCellData", parseInt(formBlock.attr("data-celldataid")))
    $("#btnSendRecording").prop("disabled", false);
    $.ajax({
        type: "PUT",
        url: "/updateActivitySchedule",
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
function sendDeleteNoteSchedule(idCellData, thisField) {

    var data = new FormData();
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("idCellData", idCellData);

    $("#btnSendRecording").prop("disabled", false);
    $.ajax({
        type: "DELETE",
        url: "/deleteActivitySchedule",
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
                thisField.remove();
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