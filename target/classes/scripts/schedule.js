$( document ).ready(function() {
    $("td.data").hover(function () {
        $(this).find(".changeCell").addClass("active");
    }, function(){
        $(this).find(".changeCell").removeClass("active");
    })

    $(".btn-more").on("click", function () {
        $(this).siblings(".dataCell").slideToggle();
    })
})