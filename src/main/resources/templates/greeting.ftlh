<#import "parts/common.ftlh" as c>
<#import "parts/popUp.ftlh" as p>

<@c.page>
<link rel="stylesheet" type="text/css" href="/static/jquery.fullPage.css">
<@p.popUpSuccessful />
<#include "parts/recording.ftlh">
<div id="fullpage" class="greeting">
    <div class="section main-img" data-anchor="block1">
        <div class="header">
            <div class="main-img">
                <div class="wrap d-flex flex-column">
                    <#include "parts/navbar.ftlh">

                    <div class="content align-self-center">
                        <h1>Спорт-клуб</h1>
                        <div class="container-login-btn">
                            <div class="wrap-login-btn">
                                <div class="login-form-bgbtn"></div>
                                <button class="login-form-btn" id="sendRecording">
                                    Записаться
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="section trainingHall" data-anchor="block2">
        <div class="container">
            <div class="row">
                <h2>Тренажёрный зал</h2>
            </div>
            <div class="row">
                <p>В тренажерном зале мы постарались создать для вас максимально комфортные условия. У нас в арсенале более 30 тренажеров, которые помогут достичь желаемых спортивных результатов.</p>
            </div>
            <div class="row">
                <div class="prices">
                    <div class="row">
                        <#assign count = 0>
                        <#list discounts as discount>
                        <div class="col-lg-4">
                            <div class="containerCard">
                                <div class="card first" style="background-image: url('/uploads/bgDiscounts/${discount.fileImageBg}')">
                                    <div class="wrap">

                                        <p class="card__name">${discount.name}</p>
                                        <div class="card__price">
                                            <#list discount.pricies as price>
                                            <div class="inputGroup">
                                                <input id="radio${count}" name="radio" type="radio"/>
                                                <label for="radio${count}">${price.duration} - ${price.price}</label>
                                            </div>
                                            <#assign count = count + 1>
                                        </#list>
                                    </div>


                                    <div class="description-post">
                                        <span>Описание:</span>
                                        <p class="description-text">
                                            Программы направлены на всестороннее развитие детей всех возрастов. Занятия проводятся в студиях групповых программ, в зоне подогреваемого песка и в бассейне
                                        </p>
                                    </div>
                                    <input type="hidden" name="id" value="" class="idRecording" />
                                    <button class="btn draw-border buy">Забронировать</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </#list>
            </div>
        </div>
    </div>
</div>
</div>


<div class="section fitness" data-anchor="block3">
    <div class="container">
        <div class="row">
            <div class="topic">
                <h2>Фитнес</h2>
                <p>В вашем распоряжении зал с велотренажерами, лёгкие веса, а также групповые программы. Фитнес способствует поддержанию хорошей спортивной формы, а также сохранению и укреплению общего здоровья.</p>

            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 ">
                <img src="/img/sport.jpg" alt="">
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
                <div class="row">
                    <div class="col-lg-3 d-flex justify-content-end">
                        <img src="/img/fitness1.svg" alt="">
                    </div>
                    <div class="col-lg-9">
                        <p>1 месяц - 1 200 рублей</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 d-flex justify-content-end">
                        <img src="/img/fitness2.svg" alt="">
                    </div>
                    <div class="col-lg-9">
                        <p><b>Фитнес + тренажёрный зал</b></p>
                        <ul>
                            <li>на 1 месяц - <i>1 600</i> рублей</li>
                            <li>на 3 месяца - <i>4 100</i> рублей</li>
                            <li>на 6 месяцев - <i>7 900</i> рублей</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<div class="section sportsSection" data-anchor="block4">
    <div class="container">
        <div class="row">
            <h2>Спортивные секции</h2>
            <p>В наш клуб вы сможете не только прийти сами, но и привести с собой ребёнка! С детьми у нас работают настоящие профессионалы своего дела, приходите и убедитесь в этом!</p>
        </div>
        <div class="row">

            <div class="col-lg-6 d-flex justify-content-center align-items-center flex-column ">
                <div class="contentBlock">
                    <div class="row mb-5">
                        <div class="col-lg-3">
                            <img src="/img/judo.png" alt="">
                        </div>
                        <div class="col-lg-9 ">
                            <p><b>Каратэ (для детей с 4х лет)</b></p>
                            <p>2 000 рублей в месяц</p>
                            <p>1-е пробное занятие для детей БЕСПЛАТНО!</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <img src="/img/gymnast.png" alt="">
                        </div>
                        <div class="col-lg-9">
                            <p><b>Гимнастика</b></p>
                            <p>200 рублей - разовое посещение</p>
                            <p>2 000 рублей в месяц</p>
                        </div>
                    </div>

                </div>

            </div>
            <div class="col-lg-6 d-flex justify-content-end">
                <img src="/img/karate.jpg" alt="">
            </div>
        </div>
    </div>
</div>

<div class="section otherActivities" data-anchor="block5">
    <div class="container">
        <div class="row">
            <h2>У нас вы найдёте</h2>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <img src="/img/bike.svg" alt="">
                <p>Проводятся групповые тренировки на велотренажерах</p>
            </div>
            <div class="col-lg-3">
                <img src="/img/olympic_medal.svg" alt="">
                <p>Подготовка на соревнования по секции каратэ на чемпионаты мирового уровня</p>
            </div>
            <div class="col-lg-3">
                <img src="/img/weightlifting.svg" alt="">
                <p>Олимпийский гриф на 600 кг</p>
            </div>
            <div class="col-lg-3">
                <img src="/img/boxing.svg" alt="">
                <p>Зал для самостоятельных тренировок, оборудованный боксерскими грушами, в свободном доступе</p>
            </div>
        </div>
    </div>
</div>
<div class="section" data-anchor="block6">
    <div class="container">
        <div class="row">
            <h2>Фотогалерея</h2>
        </div>
        <div class="row">
            some photos
        </div>
    </div>

</div>
<div class="section contacts " data-anchor="block7">
    <div class="endBlock d-flex justify-content-between flex-column">
        <div class="container">
            <div class="row">
                <h2>Контакты</h2>
            </div>
            <div class="row">
                <p class="phone">71-33-19</p>
            </div>
            <div class="row">
                <div class="address">
                    <p>г.Саратов, ул.Школьная, д.17( пер.с ул.Лунная)</p>
                    <p>пн-пт: с 8:00 до 22:00,  сб-вс: с 10:00 до 18:00</p>
                    <p>gladiator164@mail.ru</p>
                </div>
            </div>
        </div>

        <#include "parts/footer.ftlh">
    </div>

</div>
</div>

</@c.page>
<script src="/scripts/jquery.fullPage.min.js"></script>
<script src="/scripts/jquery.easings.min.js"></script>
<script src="/scripts/jquery.slimscroll.min.js"></script>
<script src="https://www.paypal.com/sdk/js?client-id=sb"></script>
<script>paypal.Buttons().render('body');</script>