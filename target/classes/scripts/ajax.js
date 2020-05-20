$(document).ready(function() {

    $("#saveData").click(function(event) {

        // Stop default form Submit.
        event.preventDefault();

        // Call Ajax Submit.

        requestSavePersonalData();

    });

    $("#save-avatar").click(function(event) {

        event.preventDefault();

        requestSaveAvatar();

    });

    $("#saveEditUser").click(function(event) {

        // Stop default form Submit.
        event.preventDefault();
        // let s = document.location.pathname;
        // console.log(s);
        requestSaveEditUser();

    });

});

function requestSavePersonalData() {

    // Get form
    var form = $('#personalData')[0];
    console.log(form);
    var data = new FormData(form);

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
