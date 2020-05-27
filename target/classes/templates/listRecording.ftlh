<#import "parts/common.ftlh" as c>
<#import "parts/popUp.ftlh" as p>
<#import "parts/pager.ftlh" as pag>

<@c.page>
<meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
<#include "parts/navbar.ftlh">
<div class="listRecording">
    <div class="container">
        <div class="row">
            <h2>Список записей в спорт-клуб</h2>
        </div><@pag.pager url page />
        <div class="container">
            <div class="row">
                    <#list page.content as recording>
                        <div class="col-lg-4 mb-5 recordingCardBlock">
                            <div class="containerCard">
                                <div class="card">
                                    <#if recording.gender == "Женский">
                                    <img src="/img/womanAvatar.png" alt="Person" class="card__image">
                                    <#else>
                                    <img src="/img/manAvatar.png" alt="Person" class="card__image">
                                </#if>
                                <p class="card__name">${recording.name} ${recording.surname} </p>
                                <p class="card__phone">Телефон: ${recording.phone}</p>
                                <div class="grid-container">

                                    <div class="date-post">
                                        <p>Дата отправки</p>
                                        <p>${recording.dateSend}</p>
                                    </div>

                                    <div class="time-post">

                                        <p>Время отправки</p>
                                        <p>${recording.timeSend}</p>
                                    </div>

                                </div>
                                <#if recording.timeSend??>
                                <div class="comment-post">
                                    <span>Комментарий:</span>
                                    <p class="comment-text">${recording.comment}</p>
                                </div>
                            </#if>
                            <textarea cols="30" rows="10" class="textAreaComment dNone"></textarea>
                            <!--                                    <ul class="social-icons">-->
                            <!--                                        <li><a href="#"><i class="fa fa-instagram"></i></a></li>-->
                            <!--                                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>-->
                            <!--                                        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>-->
                            <!--                                        <li><a href="#"><i class="fa fa-codepen"></i></a></li>-->
                            <!--                                    </ul>-->
                            <input type="hidden" name="id" value="${recording.id}" class="idRecording" />
                            <button class="btn draw-border addCommentRecording">Добавить комментарий</button>
                            <button class="btn draw-border deleteRecording">Удалить</button>

                        </div>
            </div>
                        </div>
                    </#list>

            </div>
        </div>
    <@pag.pager url page />
    </div>
</div>

</@c.page>