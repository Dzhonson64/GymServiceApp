$(".login-block .reg").on("click", function (e) {
    e.preventDefault();
    requestRegUser($(this).closest("form"));
})


function requestRegUser(form) {

    // Get form
    let data = new FormData(form[0]);


    $.ajax({
        type: "POST",
        url: "/registration",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS : ", data);
            window.location.href = 'http://localhost:8080/login';

        },
        error: function(jqXHR, textStatus, errorThrown, data) {

            // $("#result").html(jqXHR.responseText);

            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
            let errorText = JSON.parse(jqXHR.responseText);

            let errorField = form.closest(".login-block").find(".errors");
            errorField.empty();
            for(let i = 0; i < errorText.length; i++){
                $('<p>' + errorText[i] + '</p>').appendTo(errorField);

            }

            $("#save-avatar").prop("disabled", false);
            $("#suc").prop("disabled", false);

        }
    });
}