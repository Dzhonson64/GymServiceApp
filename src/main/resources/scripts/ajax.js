$(document).ready(function() {

    // $("#saveData").click(function(event) {
    //
    //     // Stop default form Submit.
    //     event.preventDefault();
    //
    //     // Call Ajax Submit.
    //
    //     requestSavePersonalData();
    //
    // });

    $(".profile #save-avatar").click(function(event) {

        event.preventDefault();
        console.log("TT");

        requestSaveAvatar();

    });

    $(".discounts #save-bgImg").click(function(event) {

        event.preventDefault();

        requestSaveBgImgDiscount(parseInt(idDiscount.val()));

    });

    // $("#saveEditUser").click(function(event) {
    //
    //     // Stop default form Submit.
    //     event.preventDefault();
    //     // let s = document.location.pathname;
    //     // console.log(s);
    //     requestSaveEditUser();
    //
    // });


    $("#btnSendRecording").click(function(event) {
        event.preventDefault();
        sendRecording();

    });

});

function deleteRecordingCard(btnDeleteCard, removeBlock) {

    let id = btnDeleteCard.siblings(".idRecording").val();
    let csrfToken = $("#csrfUserList").attr("content");
    console.log(id)
    console.log(csrfToken)

    let data = new FormData();

    data.append("id", id);
    data.append("_csrf", csrfToken);
    console.log(data.get("id"))
    // $("#btnSendRecording").prop("disabled", false);
    $.ajax({
        type: "DELETE",
        url: "/listRecording/delete",
        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        data: data,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            if (textStatus === "success"){
                removeBlock.remove();
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

function addCommentRecordingCard(text, btnAddComment){
    let data = new FormData();
    let id = btnAddComment.siblings(".idRecording").val();
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("comment", text);
    data.append("id", id);
    data.append("_csrf", csrfToken);

    $.ajax({
        type: "PUT",
        url: "/listRecording/addComment",
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
                // rowTableDataForm.remove();
                // showPopUpSuccessful();
            }
            $("#saveEditUser").prop("disabled", false);

            $("#resultResponsePopUp").text("Пользователь был успешно удалён!");
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);

            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });
}

function requestSaveDiscount(dataMapField) {
    let data = new FormData();
    // console.log(dataMapField);
    let prices = [];
    for (let pair of dataMapField.entries()) {
        data.append(pair[0], pair[1])
        console.log(pair[0], pair[1])

    }
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("id", id);

    $.ajax({
        type: "POST",
        url: "/editDiscounts/change",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
        },
        error: function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}

function sendRecording() {

    var form = $("#formRecording")[0];
    var data = new FormData(form);
    $("#btnSendRecording").prop("disabled", false);
    $.ajax({
        type: "POST",
        url: "/recording",
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

function requestSavePersonalData() {

    // Get form
    var form = $('#personalData')[0];
    console.log(form);
    var data = new FormData(form);

    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);

    $("#saveData").prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "/user/profile/saveData",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            $("#saveData").prop("disabled", false);
            showPopUpSuccessful();
            $("#resultResponsePopUp").text("Ваши личные данные были успешно обновлены!");

            // $('#personalData')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {
                showPopUpError();
            // $("#result").html(jqXHR.responseText);
            // console.log("ERROR : ", jqXHR.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            $("#saveData").prop("disabled", false);

        }
    });

}

function requestSaveBgImgDiscount(idDiscount) {

    // Get form
    let form = $('#change-avatar-form')[0];
console.log(idDiscount);
    let data = new FormData(form);
    data.append("discountId", idDiscount);
    $("#save-avatar").prop("disabled", true);
    console.log(data.get("discountId"));
    $.ajax({
        type: "POST",
        url: "editDiscounts/changeBgImgDiscount",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            $("#save-avatar").prop("disabled", false);
            // $("#avatar-img").attr('src', '/uploads/profile/' + data);
            // showPopUpSuccessful();
            // $("#resultResponsePopUp").text("Ваш аватар был успешно обновлен!");
            // console.log($('#miniAvatarUserMenu'));
            // $('#miniAvatarUserMenu').attr('src', '/uploads/profile/' + data);
            //$('#avatar-img')[0].reset();
            $("#suc").prop("disabled", false);
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);
            if (jqXHR.status === 403 || jqXHR.status === 0){
                showPopUpError("<h5>Неправильный формат</h5>" +
                    "<p>Пожалуйста, выберите правильный формат фото для аватара: <i>jpg, png</i>" +
                    "<br>Размер файла не должен превышать 5МБ!</p>"

                );
            }
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
            $("#save-avatar").prop("disabled", false);
            $("#suc").prop("disabled", false);

        }
    });
}

function requestSaveAvatar() {

    // Get form
    let form = $('#change-avatar-form')[0];

    let data = new FormData(form);

    $("#save-avatar").prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "/user/profile/saveAvatar/",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            $("#save-avatar").prop("disabled", false);
            $("#avatar-img").attr('src', '/uploads/profile/' + data);
            showPopUpSuccessful();
            $("#resultResponsePopUp").text("Ваш аватар был успешно обновлен!");
            console.log($('#miniAvatarUserMenu'));
            $('#miniAvatarUserMenu').attr('src', '/uploads/profile/' + data);
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);
            if (jqXHR.status === 403 || jqXHR.status === 0){
                showPopUpError("<h5>Неправильный формат</h5>" +
                    "<p>Пожалуйста, выберите правильный формат фото для аватара: <i>jpg, png</i>" +
                    "<br>Размер файла не должен превышать 5МБ!</p>"

                );
            }
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
            $("#save-avatar").prop("disabled", false);
            $("#suc").prop("disabled", false);

        }
    });
}

function requestSaveEditUser() {

    // Get form
    let form = $('#userEditFrom')[0];


    let data = new FormData(form);

    $("#saveEditUser").prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "/user/",
        data: data,
        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        // complete: function(xmlHttp) {
        //     // xmlHttp is a XMLHttpRquest object
        //     alert(xmlHttp.status);
        // },
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            if (textStatus === "success"){
                window.location.href="/user";
               // showPopUp();
            }
            $("#saveEditUser").prop("disabled", false);

            $("#resultResponsePopUp").text("Ваш аватар был успешно обновлен!");
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);

            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });



}

function deleteUserFromList(dataForm) {

    // $("#saveEditUser").prop("disabled", true);
    let rowTableDataForm = dataForm.closest("tr.c");
    let id = rowTableDataForm.children(":first").text();
    let csrfToken = $("#csrfUserList").attr("content");

    let data = new FormData();

    data.append("id", id);
    data.append("_csrf", csrfToken);

    $.ajax({
        type: "DELETE",
        url: "/user/"+id+"/deleteFromList",
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
                rowTableDataForm.remove();
                showPopUpSuccessful();
            }
            $("#saveEditUser").prop("disabled", false);

            $("#resultResponsePopUp").text("Пользователь был успешно удалён!");
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);

            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });
}
