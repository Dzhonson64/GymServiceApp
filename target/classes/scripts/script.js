
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