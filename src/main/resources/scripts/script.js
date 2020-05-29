let idDiscount;


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
    [ save changes discount (AJAX)]*/


$(".save").click(function (e) {
    e.preventDefault();
    let nameDiscount = $(this).siblings("ol").children("li").children("p");
    let idDiscount = $(this).siblings(".idDiscount");
    let pricesDiscount = nameDiscount.siblings("ol").children("li").children("p").children(".prices-duration");
    let pricesPrices = nameDiscount.siblings("ol").children("li").children("p").children(".prices-price");
    let pricesId = nameDiscount.siblings("ol").children("li").children(".idPrice");
    let currency = nameDiscount.siblings("ol").children("li").children(".idPrice");

    let dataMapFiled = new Map();

    dataMapFiled.set("discountName", nameDiscount.text().replace(/\s+/g, ' '));
    dataMapFiled.set("discountId", parseInt(idDiscount.val()));
    let discountPrices = [];
    let discountDurations = [];
    let discountPricesId = [];
    for (let i = 0; i < pricesId.length; i++){
        discountDurations.push(pricesDiscount.eq(i).text().trim());
        discountPrices.push(pricesPrices.eq(i).text().toString().match(/^\d+/));
        discountPricesId.push(parseInt(pricesId.eq(i).val()));
    }
    dataMapFiled.set("pricesPrice", discountPrices);
    dataMapFiled.set("pricesDuration", discountDurations);
    dataMapFiled.set("pricesId", discountPricesId);

    dataMapFiled.set("_csrf", $("#csrfUserList").attr("content"));
    // console.log(dataMapFiled);
    requestSaveDiscount(dataMapFiled)

})

function saveDiscountData(){
    $(".save").click(function (e) {
        e.preventDefault();
        let nameDiscount = $(this).siblings("ol").children("li").children("p");
        let idDiscount = $(this).siblings(".idDiscount");
        let pricesDiscount = nameDiscount.siblings("ol").children("li").children("p").children(".prices-duration");
        let pricesPrices = nameDiscount.siblings("ol").children("li").children("p").children(".prices-price");
        let pricesId = nameDiscount.siblings("ol").children("li").children(".idPrice");
        let currency = nameDiscount.siblings("ol").children("li").children(".idPrice");

        let dataMapFiled = new Map();

        dataMapFiled.set("discountName", nameDiscount.text().replace(/\s+/g, ' '));
        dataMapFiled.set("discountId", parseInt(idDiscount.val()));
        let discountPrices = [];
        let discountDurations = [];
        let discountPricesId = [];
        for (let i = 0; i < pricesId.length; i++){
            discountDurations.push(pricesDiscount.eq(i).text().trim());
            discountPrices.push(pricesPrices.eq(i).text().toString().match(/^\d+/));
            discountPricesId.push(parseInt(pricesId.eq(i).val()));
        }
        dataMapFiled.set("pricesPrice", discountPrices);
        dataMapFiled.set("pricesDuration", discountDurations);
        dataMapFiled.set("pricesId", discountPricesId);

        dataMapFiled.set("_csrf", $("#csrfUserList").attr("content"));
        // console.log(dataMapFiled);
        requestSaveDiscount(dataMapFiled)

    })
}
/*==================================================================*/




/*==================================================================
    [ handler Enter ]*/


$( ".discounts .textArea" ).on("keydown", function (e) {
    if (e.keyCode === 13) {
        let changeFieldP = $(this).siblings("p")
        let changeField = $(this).siblings("p").find("span");
        if (changeFieldP.hasClass("dNone")) {
            changeFieldP.removeClass("dNone");
            $(this).addClass("dNone");
            console.log(changeField.length);
            if (changeField.length === 1){
                changeFieldP.text($(this).val().trim());
            }
            else if(changeField.length === 2){
                let price = $(this).val().replace(/\s+/g, " ").split(" - ");
                changeField.eq(0).text(price[0].trim());
                changeField.eq(1).text(price[1]);
                // console.log(price[1].match(/^\d+/))
            }


        }
    }
})

function changeFieldEditDiscountAfterBlur(){

    $( ".discounts .textArea" ).on("keydown", function (e) {
        if (e.keyCode === 13) {
            let changeFieldP = $(this).siblings("p")
            let changeField = $(this).siblings("p").find("span");
            if (changeFieldP.hasClass("dNone")) {
                changeFieldP.removeClass("dNone");
                $(this).addClass("dNone");

                console.log(changeField.length);
                if (changeField.length === 1){
                    changeFieldP.text($(this).val().trim());
                }
                else if(changeField.length === 2){
                    let price = $(this).val().split("-");
                    changeField.eq(0).text(price[0].trim());
                    changeField.eq(1).text(price[1].trim());
                }else {
                    console.log("Полей слишком много");
                }


            }
        }
    })
}
/*==================================================================*/




/*==================================================================
    [ Show & Hidden input for edit discount text ]*/


$(".rounded p").on("click", function () {
    let changeField = $(this).siblings(".textArea");

    if (changeField.hasClass("dNone")){
        changeField.eq(0).removeClass("dNone");

        $(this).addClass("dNone");
        console.log($(this).text().trim());
        changeField.val($(this).text().trim())

    }else {
        console.log(changeField.attr("class"));
        changeField.addClass("dNone");
        $(this).removeClass("dNone");
    }
})

function changeFieldEditDiscountFieldBeforeBlur() {
    $(".rounded p").on("click", function () {
        let changeField = $(this).siblings(".textArea");
        changeField.eq(0).removeClass("dNone");
        $(this).addClass("dNone");
        changeField.val($(this).text().trim())
    })
}
/*==================================================================*/




/*==================================================================
    [ Show & Hidden a discount list edit ]*/


$(".slideToggle").click(function () {
    let nestedList = $(this).siblings(
        ".rounded");
    nestedList.slideToggle();

})

function slideToggleDataDiscount(){

    $(".slideToggle").click(function () {
        let nestedList = $(this).siblings(
            ".rounded");
        nestedList.slideToggle();

    })
}
/*==================================================================*/




/*==================================================================
    [ Show & Hidden a recording form ]*/


$(".buy").click(function () {
    let checkedDiscount = $(this).siblings(".card__price").children('.inputGroup').children('input[name="radio"]:checked');
    // $("#recording").removeClass("closeRecording");
    // $("#recording").addClass("activeRecording");

})
//
// $("buy").click(function () {
//     $("#recording").removeClass("activeRecording");
//     $("#recording").addClass("closeRecording");
//
// })
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
    [ Delete recording card (AJAX)]*/

$(".deleteRecording").on("click", function (e) {
    let btnDelete = $(this);
    let removeBlock =  btnDelete.closest(".recordingCardBlock");
    removeBlock.fadeOut(800);
    setTimeout(function (){
        deleteRecordingCard(btnDelete);
    }, 800);
})
/*==================================================================*/




/*==================================================================
    [ Add comments in recording card (AJAX)]*/

$(".addCommentRecording").on("click", function (e) {
    let btnComment = $(this);
    let resultComment =  btnComment.siblings(".comment-post");
    let blockTextComment =  resultComment.children(".comment-text");
    let fieldComment =  resultComment.siblings(".textAreaComment");
    if (fieldComment.hasClass("dNone")){
        fieldComment.removeClass("dNone");
        resultComment.addClass("dNone");
        fieldComment.val(blockTextComment.text());
        btnComment.text("Сохранить комментарий");
    }else {
        addCommentRecordingCard(fieldComment.val(), btnComment);
        btnComment.text("Добавить комментарий");
        fieldComment.addClass("dNone");
        blockTextComment.text(fieldComment.val());
        if (fieldComment.val().length !== 0){
            resultComment.removeClass("dNone");
        }
    }


    // removeBlock.fadeOut(800);
    // setTimeout(function (){
    //     deleteRecordingCard(btnDelete);
    // }, 800);
})
/*==================================================================*/



/*==================================================================
    [ Show & Hidden a error popup info ]*/

function hiddenRecording(){
    $("#recording").removeClass("activeRecording ");
    $("#recording").addClass("closeRecording ");
}
/*==================================================================*/





/*==================================================================
    [ Show & Hidden a menu-list profile]*/

$("#profileMenu").click(function () {
    $("#profileMenuList").slideToggle("fast");
})
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
    [ Show & Hidden from to select bg img discount]*/

function showModalDiscountBg(){
    $("#openModalDiscountBg").removeClass("closeModal");
    $("#openModalDiscountBg").addClass("activeModal");
}

function hiddenModalDiscountBg() {
    $("#openModalDiscountBg").removeClass("activeModal");
    $("#openModalDiscountBg").addClass("closeModal");
}

$(".change-bg").click(function () {
    idDiscount = $(this).siblings(".idDiscount");
    showModalDiscountBg();
})

$("#closeModal").click(function () {
    hiddenModalDiscountBg();
})

function сhangeBg(){
    $(".change-bg").click(function () {
        idDiscount = $(this).siblings(".idDiscount");
        showModal();
    })

}
/*==================================================================*/






/*==================================================================
    [ Add new price in discount ]*/
$(".discounts .addDiscount").on("click", function () {
    $('<div class="col-lg-4 mt-5">')
        .append('<div class="roundedBlock">\n' +
            '<i class="fa fa-times-circle deleteDiscount" aria-hidden="true"></i>' +
            '                    <ol class="rounded">\n' +
            '                        <li>\n' +
            '                            <i class="fa fa-caret-down slideToggle" aria-hidden="true"></i>\n' +
            '                            <span class="title">Название абонемента</span>\n' +
            '                            <p class="titleDiscount"><span></span></p>\n' +
            '                            <input type="text" value="" class="dNone textArea" />\n' +
            '                            <ol class="rounded prices dNone">\n' +
            '                                <span class="title">Цены</span>\n' +
            '                            <i class="fa fa-plus-square-o addPrice" aria-hidden="true"></i>\n' +
            '                    </ol>\n' +
            '                    </li>\n' +
            '                    </ol>\n' +
            '                    <div class="btn draw-border changeAvatar change-bg" >\n' +
            '                        <a class="change-img">сменить фоновую картинку</a>\n' +
            '                    </div>\n' +
            '                    <input type="text" hidden value="" class="idDiscount">\n' +
            '                    <button type="submit" class="save btn draw-border">Save</button>\n' +
            '                </div>')
        .insertBefore($(this).parent());
    let newDiscountBlock = $(this).parent().closest(".discounts").find(".roundedBlock").last();
    let idDiscountField = $(this).parent().siblings().last().find(".idDiscount");
    let newPriceField = $(this).siblings("li").last();

    newPriceField.find("p").on("click", changeFieldEditDiscountFieldBeforeBlur())
    newPriceField.find(".textArea").on("click", changeFieldEditDiscountAfterBlur())

    newDiscountBlock.find("p").on("click", changeFieldEditDiscountFieldBeforeBlur())
    newDiscountBlock.find(".textArea").on("click", changeFieldEditDiscountAfterBlur())
    newDiscountBlock.find(".slideToggle").on("click", slideToggleDataDiscount());
    newDiscountBlock.find(".addPrice").on("click", addPriceDiscount());
    newDiscountBlock.find(".changeAvatar").on("click", сhangeBg());
    newDiscountBlock.find(".save").on("click", saveDiscountData());
    newDiscountBlock.find(".deleteDiscount").on("click", deleteDiscount());
    console.log(newDiscountBlock);
    requestAddDiscount(idDiscountField);
});


/*================================================================*/





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



/*==================================================================
    [ Add new price in discount ]*/
$(".discounts .addPrice").on("click", function () {
    let p = $(this).parent();
    $('<li>')
        .append('<i class="fa fa-times-circle deletePriceDiscount" aria-hidden="true"></i>' +
            '<p>\n' +
            '<span class="prices-duration">0</span> - <span class="prices-price">0</span>\n' +
            '</p>\n' +
            '<input type="text" value="" class="dNone textArea" />\n' +
            '<input type="text" hidden value="" class="idPrice">')
        .insertBefore($(this));
    let newPriceField = $(this).siblings("li").last();
    newPriceField.find("p").on("click", changeFieldEditDiscountFieldBeforeBlur())
    newPriceField.find(".textArea").on("click", changeFieldEditDiscountAfterBlur())
    newPriceField.find(".deletePriceDiscount").on("click", deletePriceDiscount())

    let discountId = newPriceField.closest(".roundedBlock").find(".idDiscount");
    let pricesId = newPriceField.find(".idPrice");

    requestAddPrice(parseInt(discountId.val()), pricesId);
});

function addPriceDiscount() {
    $(".discounts .addPrice").on("click", function () {
        let p = $(this).parent();
        $('<li>')
            .append('<i class="fa fa-times-circle deletePriceDiscount" aria-hidden="true"></i>' +
                '<p>\n' +
                '<span class="prices-duration">0</span> - <span class="prices-price">0</span>\n' +
                '</p>\n' +
                '<input type="text" value="" class="dNone textArea" />\n' +
                '<input type="text" hidden value="" class="idPrice">')
            .insertBefore($(this));
        let newPriceField = $(this).siblings("li").last();
        newPriceField.find("p").on("click", changeFieldEditDiscountFieldBeforeBlur());
        newPriceField.find(".textArea").on("click", changeFieldEditDiscountAfterBlur());
        newPriceField.find(".deletePriceDiscount").on("click", deletePriceDiscount());

        let discountId = newPriceField.closest(".roundedBlock").find(".idDiscount");
        let pricesId = newPriceField.find(".idPrice");

        requestAddPrice(parseInt(discountId.val()), pricesId);
    });
}
/*================================================================*/




/*==================================================================
    [ Delete discount ]*/

$('.roundedBlock .deleteDiscount').on('click', function(){
    let discountId = $(this).siblings(".idDiscount");
    let discountBlock = discountId.closest(".col-lg-4");
    discountBlock.fadeOut(800);
    setTimeout(function (){
        requestDeleteDiscount(discountId.val(), discountBlock)
    }, 800);

});

function deleteDiscount() {
    $('.roundedBlock .deleteDiscount').on('click', function(){
        let discountId = $(this).siblings(".idDiscount");
        let discountBlock = discountId.closest(".col-lg-4");
        discountBlock.fadeOut(800);
        setTimeout(function (){
            requestDeleteDiscount(discountId.val(), discountBlock)
        }, 800);

    });
}
/*==================================================================*/



/*==================================================================
    [ Delete price discount ]*/

$('.roundedBlock .deletePriceDiscount').on('click', function(){
    let priceDiscountId = $(this).siblings(".idPrice");
    let priceDiscountBlock = $(this).siblings(".idPrice").parent();
    priceDiscountBlock.fadeOut(800);
    setTimeout(function (){
        requestDeletePriceDiscount(priceDiscountId.val(), priceDiscountBlock)
    }, 800);

});

function deletePriceDiscount() {
    $('.roundedBlock .deletePriceDiscount').on('click', function(){
        let priceDiscountId = $(this).siblings(".idPrice");
        let priceDiscountBlock = $(this).siblings(".idPrice").parent();
        priceDiscountBlock.fadeOut(800);
        setTimeout(function (){
            requestDeletePriceDiscount(priceDiscountId.val(), priceDiscountBlock)
        }, 800);

    });
}
/*==================================================================*/