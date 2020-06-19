
/*==================================================================
    [ save changes discount (AJAX)]*/


$(".discounts .save").click(function (e) {
    e.preventDefault();
    let discountBlock = $(this).siblings(".rounded");
    let nameDiscount = discountBlock.find(".nameDiscount");
    let idDiscount = $(this).siblings(".idDiscount");
    let countPeriod = discountBlock.find(".countPeriod");
    let pricesPrices = discountBlock.find(".priceNum");
    let typePeriod = discountBlock.find(".typePeriod");
    let pricesId = discountBlock.find(".idPrice");
    let descriptionDiscount = discountBlock.find(".description");

    let dataMapFiled = new Map();

    dataMapFiled.set("discountName", nameDiscount.val());
    dataMapFiled.set("discountId", parseInt(idDiscount.val()));
    dataMapFiled.set("descriptionDiscount", descriptionDiscount.val());
    let discountPrices = [];
    let discountCountPeriod = [];
    let discountTypePeriod = [];
    let discountPricesId = [];
    console.log(descriptionDiscount.val());
    for (let i = 0; i < pricesId.length; i++){
        discountCountPeriod.push(parseInt(countPeriod.eq(i).val()));
        discountPrices.push(parseInt(pricesPrices.eq(i).val().trim()));
        discountTypePeriod.push(typePeriod.eq(i).val());
        discountPricesId.push(parseInt(pricesId.eq(i).val()));
    }
    dataMapFiled.set("pricesPrice", discountPrices);
    dataMapFiled.set("discountCountPeriod", discountCountPeriod);
    dataMapFiled.set("discountTypePeriod", discountTypePeriod);
    dataMapFiled.set("pricesId", discountPricesId);


    requestSaveDiscount(dataMapFiled)


})
/*==================================================================*/

function buildNewDiscount(btnAdd, placeInto){
    $('<div class="col-lg-4 mt-5">')
        .append('<div class="roundedBlock">\n' +
            '                    <div class="rounded">\n' +
            '                        <i class="fa fa-times-circle closeBtn" aria-hidden="true"></i>\n' +
            '                        <i class="fa fa-chevron-down slideToggle" aria-hidden="true"></i>\n' +
            '                        <h5>Название</h5>\n' +
            '                        <input type="text" value="-" class="nameDiscount">\n' +
            '                        <ol class="rounded pricesBlock dNone ">\n' +
            '                            <h5>Цены</h5>\n' +
            '<i class="fa fa-plus-square-o addPrice" aria-hidden="true"></i>' +
            '\n' +
            '                        </ol>\n' +
            '                        <h5>Описание</h5>\n' +
            '                        <textarea class="description" id="" cols="30" rows="10" >-</textarea>\n' +
            '                    </div>\n' +
            '                    <div class="btn draw-border changeAvatar change-bg" >\n' +
            '                        <a class="change-img">сменить аватарку</a>\n' +
            '                    </div>\n' +
            '                    <input type="text" hidden value="" class="idDiscount">\n' +
            '                    <button type="submit" class="save btn draw-border">Save</button>\n' +
            '                </div>')
        .insertBefore(btnAdd.parent());
}

function buildNewPrice(beforeElem) {
    $('<li class="d-flex justify-content-end align-items-end flex-column">')
        .append('<i class="fa fa-times-circle deletePrice" aria-hidden="true"></i>' +
            '<label>Количество периодов</label>\n' +
            '                                <input type="number" value="0" class="countPeriod"/>\n' +
            '                                <label>Тип периода</label>\n' +
            '                                <select class="typePeriod" data-placeholder="">\n' +
            '                                    <option value="День">День</option>\n' +
            '                                    <option value="Неделя">Неделя</option>\n' +
            '                                    <option value="Месяц">Месяц</option>\n' +
            '                                    <option value="Год">Год</option>\n' +
            '                                </select>\n' +
            '                                <label>Цена</label>\n' +
            '                                <input type="number" class="priceNum" value="0"/>\n' +
            '                                <input type="text" hidden value="" class="idPrice">\n' +
            '                            </li>')
        .insertBefore(beforeElem);
}


function slideTogglePrices() {
    let nestedList = $(this).siblings(".rounded");
    nestedList.slideToggle();
}

function deleteDiscount() {
    let idDiscount = $(this).closest(".roundedBlock").find(".idDiscount");
    let discount = idDiscount.closest(".col-lg-4");
    discount.fadeOut(800);
    setTimeout( function () {
        requestDeleteDiscount(discount, idDiscount.val());
    },800);
}

function addPrice(){
    buildNewPrice($(this));
    let discountId = $(this).closest(".col-lg-4").last().find(".idDiscount");
    let newPrice = $(this).siblings("li").last();
    let priceId = newPrice.find(".idPrice")
    newPrice.find(".deletePrice").on("click", deletePrice);
    console.log(newPrice);
    requestAddPrice(discountId.val(), priceId);
}

function deletePrice(){
    let idPrice = $(this).siblings(".idPrice");
    let price = idPrice.parent();
    price.fadeOut(800);
    setTimeout( function () {
        requestDeletePrice(price, idPrice.val());
    },800);
}

$(".discounts .slideToggle").click(function (e) {
    e.preventDefault();
    if ($(this).hasClass("rotated")){
        $(this).removeClass("rotated");
    }else {
        $(this).addClass("rotated")
    }
    let nestedList = $(this).siblings(".rounded");
    nestedList.slideToggle();
})

$(".discounts .addPrice").click(function (e) {
    e.preventDefault();
    buildNewPrice($(this));
    let discountId = $(this).closest(".col-lg-4").last().find(".idDiscount");
    let newPrice = $(this).siblings("li").last();
    let priceId = newPrice.find(".idPrice")

    console.log(newPrice.find(".deletePrice"));
    requestAddPrice(discountId.val(), priceId);

})


$(".discounts .closeBtn").click(function (e) {
    e.preventDefault();
    let idDiscount = $(this).closest(".roundedBlock").find(".idDiscount");
    let discount = idDiscount.closest(".col-lg-4");
    discount.fadeOut(800);
    setTimeout( function () {
        requestDeleteDiscount(discount, idDiscount.val());
    },800);
})

$(".discounts .deletePrice").click(function (e) {
    e.preventDefault();
    let idPrice = $(this).siblings(".idPrice");
    let price = idPrice.parent();
    price.fadeOut(800);
    setTimeout( function () {
        requestDeletePrice(price, idPrice.val());
    },800);
})

$(".discounts .add").click(function (e) {
    e.preventDefault();
    buildNewDiscount($(this), $(this).closest(".row"))

    let newDiscount = $(this).closest(".col-lg-4").siblings(".col-lg-4").last();
    //buildNewPrice()
    let fieldIdDiscount = newDiscount.find(".idDiscount");
    requestAddDiscount(fieldIdDiscount);
    console.log(newDiscount.find(".slideToggle"));
    newDiscount.find(".slideToggle").on("click", slideTogglePrices);
    newDiscount.find(".closeBtn").on("click", deleteDiscount);
    newDiscount.find(".addPrice").on("click", addPrice);
})

$(".discounts #save-bgImg").click(function(event) {

    event.preventDefault();

    requestSaveBgImgDiscount(parseInt(idDiscount));

});


function requestSaveDiscount(dataMapField) {
    let data = new FormData();
    let prices = [];
    for (let pair of dataMapField.entries()) {
        data.append(pair[0], pair[1])

    }
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);

    $.ajax({
        type: "POST",
        url: "/editDiscounts/change",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(textStatus, jqXHR) {
            console.log("SUCCESS");
            showPopUpSuccessful();
            $("#resultResponsePopUp").text("Абонемент успешно обновлён!");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            showPopUpError("<h5>УПС!!!</h5>" +
                "<p>Произошла неожиданная ошибка." +
                "<br>Мы уже ведём работу по её устанению! Извнините за неудобства.</p>"

            );
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}
function requestDeleteDiscount(discount, idDiscount) {
    let data = new FormData();
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("idDiscount", parseInt(idDiscount));

    $.ajax({
        type: "DELETE",
        url: "/editDiscounts/delete",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(textStatus, jqXHR) {
            console.log("SUCCESS");
            discount.remove();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}
function requestAddDiscount(fieldIdDiscount) {
    let data = new FormData();
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);

    $.ajax({
        type: "PUT",
        url: "/editDiscounts/addDiscount",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS", data);
            fieldIdDiscount.attr("value", data);
        },
        error: function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}
function requestAddPrice(discountId, fieldIdPrice) {
    let data = new FormData();
    console.log(discountId);
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("discount", discountId);

    $.ajax({
        type: "PUT",
        url: "/editDiscounts/addPrice",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
            console.log("SUCCESS", data);
            fieldIdPrice.attr("value", data);
        },
        error: function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}
function requestDeletePrice(price, idPrice) {
    let data = new FormData();
    console.log(price);
    console.log(idPrice);
    let csrfToken = $("#csrfUserList").attr("content");
    data.append("_csrf", csrfToken);
    data.append("idPrice", parseInt(idPrice));

    $.ajax({
        type: "DELETE",
        url: "/editDiscounts/deletePrice",
        data: data,


        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(textStatus, jqXHR) {
            console.log("SUCCESS");
            price.remove();
        },
        error: function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}
function requestSaveBgImgDiscount(idDiscount) {

    let form = $('#change-avatar-form')[0];
    console.log(form);
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
            /*if (jqXHR.status === 403 || jqXHR.status === 0){*/
                showPopUpError("<h5>Неправильный формат</h5>" +
                    "<p>Пожалуйста, выберите правильный формат фото для аватара: <i>jpg, png</i>" +
                    "<br>Размер файла не должен превышать 5МБ!</p>"

                );
            /*}*/
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
            $("#save-avatar").prop("disabled", false);
            $("#suc").prop("disabled", false);

        }
    });
}
