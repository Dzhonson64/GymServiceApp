$( document ).ready(function() {
    $("td.data").hover(function () {
        $(this).find(".changeCell").addClass("active");
    }, function(){ // задаем функцию, которая срабатывает, когда указатель выходит из элемента
        $(this).find(".changeCell").removeClass("active");
    })
})