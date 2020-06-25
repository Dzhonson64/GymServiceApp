let timeCell, dateCell, fieldTo;
$(".addNoteSchedule").on("click", function () {
    $("#changeCellSchedule").removeClass("closeRecording");
    $("#changeCellSchedule").addClass("activeRecording");
    dateCell = $(this).closest("td").attr("data-date");
    timeCell = $(this).closest("td").attr("data-time");
    fieldTo = $(this)
    $("#changeCellSchedule").find(".startTime").attr("value", timeCell);
})

function changeCellData(){
    $("#changeCellSchedule2").removeClass("closeRecording");
    $("#changeCellSchedule2").addClass("activeRecording");

    let cellData = $(this).closest(".data");
    let cellDataId = parseInt(cellData.attr("data-id"));
    let tag = cellData.find(".tag").text().trim();
    let timeStart = cellData.find(".time .start").text().trim();
    let topic = cellData.find(".name").text().trim();
    let duration = parseInt(cellData.find(".duration").text());
    let coachId = parseInt(cellData.find(".coach").attr("data-coachId"));

    $("#changeCellSchedule2").find(".topic").val(topic);
    $("#changeCellSchedule2").find(".tag").val(tag);
    $("#changeCellSchedule2").find(".startTime").val(timeStart);
    $("#changeCellSchedule2").find(".duration").val(duration);
    $("#changeCellSchedule2").find(".duration").val(duration);
    $("#changeCellSchedule2").find("form").attr("data-coachId", coachId);
    $("#changeCellSchedule2").find("form").attr("data-cellDataId", cellDataId);

    dateCell = $(this).closest(".data").attr("data-date");
    timeCell = $(this).closest(".data").attr("data-time");
}

function deleteCellData(){
    let cellData = $(this).closest(".data");
    let idCellData = parseInt(cellData.attr("data-id"));
    sendDeleteNoteSchedule(idCellData, cellData)
}

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

    $("#changeCellSchedule2").find(".topic").val(topic);
    $("#changeCellSchedule2").find(".tag").val(tag);
    $("#changeCellSchedule2").find(".startTime").val(timeStart);
    $("#changeCellSchedule2").find(".duration").val(duration);
    $("#changeCellSchedule2").find(".duration").val(duration);
    $("#changeCellSchedule2").find("form").attr("data-coachId", coachId);
    $("#changeCellSchedule2").find("form").attr("data-cellDataId", cellDataId);

    dateCell = $(this).closest(".data").attr("data-date");
    timeCell = $(this).closest(".data").attr("data-time");
    fieldTo = $(this);
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
    if (checkFieldsToSchedule(formBlock, timeCell) === true){
        sendAddNoteSchedule(formBlock, dateCell, clientId, fieldTo);
    }else{
        showPopUpError("<h5>Ошибка запроса!</h5>" +
            "<p>Пожалуйста, проверьте правильно вводимых полей</p>"

        );
        console.log("ERROR : ", jqXHR.responseText);
    }
});

$("#changeCellSchedule2 #btnSendChangeSchedule").click(function(event) {
    event.preventDefault();
    let clientId = parseInt($("#changeCellSchedule2").find(".selectClient option:selected").val());
    let formBlock = $(this).closest("form");
    if (checkFieldsToSchedule(formBlock, timeCell) === true){
        sendChangeNoteSchedule(formBlock, dateCell, clientId, fieldTo);
    }else{
        showPopUpError("<h5>Ошибка запроса!</h5>" +
            "<p>Пожалуйста, проверьте правильно вводимых полей</p>"

        );
        console.log("ERROR : ", jqXHR.responseText);
    }

});


function sendAddNoteSchedule(formBlock, dateCell, clientId, fieldTo) {
    var form = formBlock[0];
    var data = new FormData(form);
    data.append("dateCell", dateCell)
    data.append("clientId", clientId)
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
                $('<div class="dataCell">').append(
                    '            <div class="data" data-date = "" data-time = "" data-id="">\n' +
                    '                <div class="changeNoteSchedule justify-content-center align-items-center">\n' +
                    '                    <div class="bntChange">\n' +
                    '                        Изменить\n' +
                    '                    </div>\n' +
                    '                    <div class="bntDelete">\n' +
                    '                        Удалить\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            <div class="content-td d-flex flex-column">\n' +
                    '                <div class="tag">\n' +
                    '                </div>\n' +
                    '                <div class="time">\n' +
                    '                    <span class="start"></span> - <span class="end"></span>\n' +
                    '\n' +
                    '                </div>\n' +
                    '                <div class="durationBlock">\n' +
                    '                    <i class="fa fa-clock-o" aria-hidden="true"></i> <span class="duration"></span> мин\n' +
                    '                </div>\n' +
                    '                <div class="name"></div>\n' +
                    '                <span class="labelCell">Тренер: </span>\n' +
                    '                <div class="coach" data-coachId = ""></div>\n' +
                    '                <span class="labelCell">Клиент: </span>\n' +
                    '                <div class="client" data-clientId = ""></div>\n' +
                    '            </div>\n').appendTo(fieldTo.parent());
                fieldTo.removeClass("addNoteCell");
                fieldTo.removeClass("addNoteSchedule");
                fieldTo.addClass("changeMultiCell ");
                let newElem = fieldTo.parent().find(".data").last();
                newElem.on("mouseenter", hoverOnCellSchedule)
                newElem.on("mouseleave", hoverOffCellSchedule)
                newElem.find(".bntChange").on("click", changeCellData)
                newElem.find(".bntDelete").on("click", deleteCellData)

                newElem.attr("data-date", data["startDate"]);
                newElem.attr("data-time", data["startTime"]);
                newElem.attr("data-id", parseInt(data["idCellData"]));
                newElem.find(".tag").text(data["type"]);
                newElem.find(".start").text(data["startTime"]);
                newElem.find(".duration").text(data["duration"]);
                newElem.find(".end").text(data["endTime"]);
                newElem.find(".name").text(data["name"]);
                newElem.find(".coach").text(data["coach"]);
                newElem.find(".coach").attr("data-coachId", parseInt(data["coachId"]));
                newElem.find(".client").attr("data-clientId", parseInt((data["client"].id)));
                newElem.find(".client").text(data["client"].surname + " " + data["client"].name + " " + data["client"].patronymic + " (" + data["client"].username + ")");
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
function sendChangeNoteSchedule(formBlock, dateCell, clientId, newElem) {

    var form = formBlock[0];
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
                let newElem = fieldTo.closest("td").find(".data").last();
                newElem.attr("data-date", data["startDate"]);
                newElem.attr("data-time", data["startTime"]);
                newElem.attr("data-id", parseInt(data["idCellData"]));
                newElem.find(".tag").text(data["type"]);
                newElem.find(".start").text(data["startTime"]);
                newElem.find(".duration").text(data["duration"]);
                newElem.find(".end").text(data["endTime"]);
                newElem.find(".name").text(data["name"]);
                newElem.find(".coach").text(data["coach"]);
                newElem.find(".coach").attr("data-coachId", parseInt(data["coachId"]));
                newElem.find(".client").attr("data-clientId", parseInt((data["client"].id)));
                newElem.find(".client").text(data["client"].surname + " " + data["client"].name + " " + data["client"].patronymic + " (" + data["client"].username + ")");
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


function checkFieldsToSchedule(form, timeCell) {
    let topic = form.find(".topic").val();
    let duration = parseInt(form.find(".duration").val());
    let startTime = form.find(".startTime").val().split(":");
    let startTimeForm = timeCell.split(":");
    if (topic === "" || duration === "" || startTime === "" || duration > 59 || !isNumber(parseInt(startTime[0])) || !isNumber(parseInt(startTime[1]))) {
        return false;
    }

    let timeDate = new Date();

    let timeStartDate = new Date();
    let rightBorderTimeDate = new Date();
    let leftBorderTimeDate = new Date();


    timeStartDate.setHours(parseInt(startTime[0]))
    timeStartDate.setMinutes(parseInt(startTime[1]))
    timeStartDate.setSeconds(0)

    timeDate.setHours(parseInt(startTime[0]))
    timeDate.setMinutes(parseInt(startTime[1]) + duration)
    timeDate.setSeconds(0)

    rightBorderTimeDate.setHours(parseInt(startTimeForm[0]) + 1)
    rightBorderTimeDate.setMinutes(parseInt(startTimeForm[1]))
    rightBorderTimeDate.setSeconds(0)

    leftBorderTimeDate.setHours(parseInt(startTimeForm[0]))
    leftBorderTimeDate.setMinutes(parseInt(startTimeForm[1]))
    leftBorderTimeDate.setSeconds(0)


    if (timeStartDate < leftBorderTimeDate || timeStartDate > rightBorderTimeDate &&
        timeDate < leftBorderTimeDate || timeDate > rightBorderTimeDate
    ){
        return false;
    }


    return true;

}

function isNumber(num) {
    return typeof num === 'number' && !isNaN(num);
}