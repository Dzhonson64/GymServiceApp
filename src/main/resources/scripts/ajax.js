$(document).ready(function() {

    $("#saveData").click(function(event) {

        // Stop default form Submit.
        event.preventDefault();

        // Call Ajax Submit.
        console.log("work")

        ajaxSubmitForm();

    });

    $("#save-avatar").click(function(event) {

        // Stop default form Submit.
        event.preventDefault();

        // Call Ajax Submit.
        console.log("work")

        ajaxSubmitForm2();

    });

});

function ajaxSubmitForm() {

    // Get form
    var form = $('#personalData')[0];

    var data = new FormData(form);
    console.log(form);
    console.log(data);

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

            // $("#result").html(data);
            console.log("SUCCESS : ", data);
            $("#saveData").prop("disabled", false);
            $("#success").html("YES!!");
            // $('#personalData')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);
            console.log("ERROR : ", jqXHR.responseText);
            $("#saveData").prop("disabled", false);

        }
    });

}


function ajaxSubmitForm2() {

    // Get form
    console.log($('#avatar-img')[0]);
    let form = $('#change-avatar-form')[0];

    let data = new FormData(form);
    console.log(form);
    console.log( data);

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

            // $("#result").html(data);
            console.log("SUCCESS : ", data);
            // $("#save-avatar").prop("disabled", false);
            $("#suc").html("YES!!");
            $("#avatar-img").attr('src', '/uploads/profile/' + data);
            //$('#avatar-img')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // $("#result").html(jqXHR.responseText);
            console.log("ERROR : ", jqXHR.responseText);
            $("#suc").prop("disabled", false);

        }
    });

}