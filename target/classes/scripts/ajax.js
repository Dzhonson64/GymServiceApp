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


    $("#saveAvatar").click(function(event) {

        event.preventDefault();
        requestSaveAvatar();

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

    console.log(id)



    let data = new FormData();
    data.append("id", id);
    console.log(data.get("id"))
    // $("#btnSendRecording").prop("disabled", false);



    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
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
    console.log(btnAddComment)

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
                btnAddComment.siblings(".comment-post").find(".comment-text").val(data);
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

function deleteUserFromList(dataForm, selfId) {

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
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            console.log(parseInt(selfId))
            console.log(parseInt(id))


            if (parseInt(selfId) === parseInt(id)){
                let csrfToken = $("#csrfUserList").attr("content");
                let data2 = new FormData();
                console.log(csrfToken);
                data2.append("_csrf", csrfToken);
                $.ajax({
                    type: "POST",
                    url: "/logout",
                    // prevent jQuery from automatically transforming the data into a query string
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 1000000,
                    data: data2,
                    success: function(data, textStatus, jqXHR) {
                        console.log("SUCCESS : ", data);

                        window.location.href = "http://localhost:8080/login"
                        //$('#avatar-img')[0].reset();
                    },
                    error: function(jqXHR, textStatus, errorThrown) {

                        // $("#result").html(jqXHR.responseText);

                        console.log("ERROR : ", jqXHR.responseText);
                        $("#suc").prop("disabled", false);

                    }
                });
            }
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

function unsubscribeDiscount(idDiscountPrice, DiscountBLock, noneDiscountBLock) {

    let csrfToken = $("#csrfUserList").attr("content");

    let data = new FormData();

    data.append("idDiscountPrice", idDiscountPrice);
    data.append("_csrf", csrfToken);

    $.ajax({
        type: "DELETE",
        url: "/user/unsubscribeDiscount",
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
                showPopUpSuccessful();
            }
            DiscountBLock.remove();
            console.log(noneDiscountBLock);
            noneDiscountBLock.removeClass("dNone");
            $("#saveEditUser").prop("disabled", false);

            $("#resultResponsePopUp").text("Вы успешно отписались от абонемента!");
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);
            showPopUpError("<h5>УПС!!!</h5>" +
                "<p>Произошла неожиданная ошибка." +
                "<br>Мы уже ведём работу по её устанению! Извнините за неудобства.</p>"

            );

            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });
}


$("#saveEditUser").on("click", function (e) {
    e.preventDefault();
    console.log("f");
    let form = $(this).closest("form");
    let userid = $("#userId").attr("content")
    saveUserList(form, parseInt(userid))
})
function saveUserList(form, userId) {

    let csrfToken = $("#csrfUserList").attr("content");

    let data = new FormData(form[0]);

    data.append("_csrf", csrfToken);

    $.ajax({
        type: "POST",
        url: "/user/" + userId,
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

            window.location.href = 'http://localhost:8080/user';
        },
        error: function(jqXHR, textStatus, errorThrown) {
            let errorField = form.find(".errorsUserEdit");
            let errorText = JSON.parse(jqXHR.responseText);
            console.log(errorText);
            console.log(errorField);
            errorField.empty();
            for(let i = 0; i < errorText.length; i++){
                $('<p>' + errorText[i] + '</p>').appendTo(errorField);

            }

            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });
}