$( document ).ready(function() {
    $("td.none-data").hover(function () {
        $(this).find(".addNoteCell").addClass("active");
    }, function(){
        $(this).find(".addNoteCell").removeClass("active");
    })

    $(".btn-more").on("click", function () {
        $(this).siblings(".dataCell").slideToggle();
    })

    $(".data").hover(function () {
        $(this).find(".changeNoteSchedule").addClass("active");
    }, function(){
        $(this).find(".changeNoteSchedule").removeClass("active");
    })
})

function hoverOnCellSchedule() {
    $(this).find(".changeNoteSchedule").addClass("active");
}
function hoverOffCellSchedule() {
    $(this).find(".changeNoteSchedule").removeClass("active");
}