<#import "parts/common.ftlh" as c>
<#import "parts/popUp.ftlh" as p>


<@c.page>
<meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
<#include "parts/navbar.ftlh">
<#include "parts/changeCellSchedule.ftlh">
<div class="schedule">
    <div class="slider">
        <div class="slider__wrapper">
            <div class="slider__item">
                <div class="content">
                    <table class="scheduleContent">
                        <tr>
                            <th></th>
                            <#list dates as date>
                            <th>
                                ${date?string('dd MMMM')}
                            </th>
                        </#list>
                        <th></th>
                        </tr>
                        <#list entry?keys as key>
                        <tr>
                            <td>${key}</td>
                            <#list entry[key] as value>
                            <#if value.id??>
                            <td class="data" data-date = "${value.dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}">
                                <div class="content-td d-flex flex-column">
                                    <div class="tag">
                                        Онлайн
                                    </div>
                                    <div class="time">
                                        <span class="start">${value.dateStart.getTime()?string('HH:mm')}</span> - <span class="end">${value.dateEnd.getTime()?string('HH:mm')}</span>

                                    </div>
                                    <div class="durationBlock">
                                        <i class="fa fa-clock-o" aria-hidden="true"></i> <span class="duration">${value.duration.getMinute()} мин</span>
                                    </div>
                                    <div class="name">${value.name}</div>
                                    <div class="coach">${value.user.surname} ${value.user.name} ${value.user.patronymic}</div>
                                    <div class="count-empty-places-block">Cвободно: <span class="count-empty-places">${value.countEmptyPlaces}</span></div>
                                </div>
                            </td>
                            <#else>
                            <td class="data" data-date = "${value.dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}">
                                <div class="changeCell justify-content-center align-items-center">
                                    <div class="bntChange">
                                        Добавить
                                    </div>

                                </div>
                            </td>
                            </#if>

                    </#list>
                    <td>${key}</td>
                    </tr>
                </#list>
                </table>
            </div>

        </div>
        <div class="slider__item">
            <div style="background: green;" class="content">2</div>
        </div>
        <div class="slider__item">
            <div style="background: violet;" class="content">3</div>
        </div>
        <div class="slider__item">
            <div style="background: coral;" class="content">4</div>
        </div>
    </div>
    <a class="slider__control slider__control_left" href="#" role="button"></a>
    <a class="slider__control slider__control_right slider__control_show" href="#" role="button"></a>
</div>
</div>

</@c.page>