/*==================================================================
    [ Show & Hidden a successful popup info ]*/

function showPopUpSuccessful(){
    $("#successfulPopUp").removeClass("closePopUp");
    $("#successfulPopUp").addClass("activePopUp");
}

$("#closeSuccessfulPopUp").click(function () {
    $("#successfulPopUp").removeClass("activePopUp");
    $("#successfulPopUp").addClass("closePopUp");
})
/*==================================================================*/





/*==================================================================
    [ Show & Hidden a error popup info ]*/

function showPopUpError(textError){
    $("#errorPopUp").removeClass("closePopUp");
    $("#errorPopUp").addClass("activePopUp");
    $("#resultResponsePopUpError").html(textError);
}

$("#closeErrorPopUp").click(function () {
    $("#errorPopUp").removeClass("activePopUp");
    $("#errorPopUp").addClass("closePopUp");
    $("#resultResponsePopUpError").html("");
})
/*==================================================================*/




/*==================================================================
    [ Show & Hidden a recording form ]*/


$("#sendRecording").click(function () {
    console.log("f");
    $("#recording").removeClass("closeRecording");
    $("#recording").addClass("activeRecording");

})

$("#closeRecording").click(function () {
    $("#recording").removeClass("activeRecording");
    $("#recording").addClass("closeRecording");

})
/*==================================================================*/




/*==================================================================
    [ Show & Hidden a error popup info (AJAX)]*/

$(".deleteUserFromList").on("click", function (e) {
    let form = $(this);
    form.closest("tr.c").fadeOut(1000);
    setTimeout(function (){
        deleteUserFromList(form)
    }, 1000);
})
/*==================================================================*/




/*==================================================================
    [ Show & Hidden a error popup info (AJAX)]*/

function hiddenRecording(){
    $("#recording").removeClass("activeRecording ");
    $("#recording").addClass("closeRecording ");
}
/*==================================================================*/





/*==================================================================
    [ Show & Hidden password symbols ]*/

$(".password-input").click( function(){
    let inputPassword = $(this).siblings( 'input' );

    if (inputPassword.attr('type') === 'password'){
        $(this).addClass('fa-eye');
        $(this).removeClass('fa-eye-slash');
        inputPassword.attr('type', 'text');
    } else {
        $(this).removeClass('fa-eye');
        $(this).addClass('fa-eye-slash');
        inputPassword.attr('type', 'password');
    }
})
/*==================================================================*/






/*==================================================================
    [ Show & Hidden from to select avatar img ]*/

function showModal(){
    $("#openModal").removeClass("closeModal");
    $("#openModal").addClass("activeModal");
}

function hiddenModal() {
    $("#openModal").removeClass("activeModal");
    $("#openModal").addClass("closeModal");
}

$("#change-avatar").click(function () {
    showModal();
})

$("#closeModal").click(function () {
    hiddenModal();
})
/*==================================================================*/





/*==================================================================
    [ The changed field to select avatar img ]*/

let fields = document.querySelectorAll('.field__file');
Array.prototype.forEach.call(fields, function (input) {
    let label = input.nextElementSibling,
        labelVal = label.querySelector('.field__file-fake').innerText;

    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
            countFiles = this.files.length;

        if (countFiles)
            label.querySelector('.field__file-fake').innerText = 'Выбрано файлов: ' + countFiles;
        else
            label.querySelector('.field__file-fake').innerText = labelVal;
    });
});
/*==================================================================*/


// document.addEventListener("DOMContentLoaded", function(){
//     var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
//     console.log(scrollbar);
//     document.querySelector('[href="#openModal"]').addEventListener('click',function(){
//         document.body.style.overflow = 'hidden';
//         document.querySelector('#openModal').style.marginLeft = scrollbar;
//     });
//     document.querySelector('[href="#close"]').addEventListener('click',function(){
//         document.body.style.overflow = 'visible';
//         document.querySelector('#openModal').style.marginLeft = '0px';
//     });
// });

$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
        css3: true,
        scrollingSpeed: 1000,
        scrollOverflow: true,
        navigation: true
    });
});

/*==================================================================
    [ Focus input ]*/
$('.input-login').each(function(){
    $(this).on('blur', function(){
        console.log($(this).val());
        console.log($(this).val().trim() !== "");
        console.log($(this));
        if($(this).val().trim() !== "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    })
})
/*==================================================================*/





/*==================================================================
    [ Validate ]*/

var input = $('.validate-input .input');

$('.validate-form').on('submit',function(){
    var check = true;

    for(var i=0; i<input.length; i++) {
        if(validate(input[i]) === false){
            showValidate(input[i]);
            check=false;
        }
    }

    return check;
});


$('.validate-form .input').each(function(){
    $(this).focus(function(){
        hideValidate(this);
    });
});

function validate (input) {
    if($(input).attr('type') === 'email' || $(input).attr('name') === 'email') {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() === ''){
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}
/*==================================================================*/





/*==================================================================
    [ Show pass ]*/

var showPass = 0;
$('.btn-show-pass').on('click', function(){
    if(showPass === 0) {
        $(this).next('.input-login').attr('type','text');
        $(this).find('i').removeClass('fa-exclamation-circle');
        $(this).find('i').addClass('fa-exclamation-circle');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type','password');
        $(this).find('i').addClass('fa-exclamation-circle');
        $(this).find('i').removeClass('fa-exclamation-circle');
        showPass = 0;
    }
});
/*==================================================================*/