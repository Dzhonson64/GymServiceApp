/*==================================================================
    [ Show & Hidden a recording form ]*/


$(".greeting .buy").click(function () {
    let checkedDiscount = $(this).siblings(".card__price").children('.inputGroup').children('input[name="radio"]:checked');
    console.log(checkedDiscount);
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
