<#import "parts/common.ftlh" as c>
<#import "parts/popUp.ftlh" as p>


<@c.page>
<meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
<#include "parts/navbar.ftlh">
<#include "parts/changeCellSchedule.ftlh">
<div class="schedule">
    <div class="slider">
        <div class="slider__wrapper">
            <#list slideScheduleData as slide>
            <div class="slider__item">
                <div class="content">
                    <table class="scheduleContent">
                        <tr>
                            <th></th>
                            <#list slide.dates as date>
                            <th>
                                ${date?string('dd MMMM')}
                            </th>
                        </#list>
                        <th></th>
                        </tr>
                        <#list slide.entry?keys as key>
                        <tr>
                            <td>${key}</td>

                            <#list (slide.entry[key])! as val>
                            <#if (val?size >= 1) && val[0].id??>

                            <td class="multiCell" data-date = "${val[0].dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}">
                                <#if (val?size > 1)>
                                <div class="changeMultiCell addNoteSchedule justify-content-center align-items-center">
                                    <div class="bntChange">
                                        Добавить
                                    </div>
                                </div>
                                <div class="btn-more">Показать все</div>
                                <div class="dataCell dNone">
                                    <#list val as value>

                                    <div class="data" data-id="${value.id}">
                                        <div class="content-td d-flex flex-column">
                                            <div class="tag">
                                                ${value.type}
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
                                        <div hidden class="idCell">${value.id}</div>
                                    </div>
                                </#list>
                </div>
                <#else>
                <div class="changeMultiCell addNoteSchedule justify-content-center align-items-center">
                    <div class="bntChange">
                        Добавить
                    </div>
                </div>
                <div class="dataCell">
                    <#list val as value>

                    <div class="data" data-date = "${value.dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}" data-id="${value.id}">
                        <div class="content-td d-flex flex-column">
                            <div class="tag">
                                ${value.type}
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
                        <div hidden class="idCell">${value.id}</div>
                    </div>
                </#list>
            </#if>


            </td>

            <#else>
            <#list val as value>
            <td class="data" data-date = "${value.dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}">
                <div class="changeCell addNoteSchedule justify-content-center align-items-center">
                    <div class="bntChange">
                        Добавить
                    </div>
                </div>
            </td>
        </#list>
    </#if>

</#list>
<td>${key}</td>
</tr>
</#list>
</table>
</div>

</div>
</#list>
</div>
<a class="slider__control slider__control_left" href="#" role="button"></a>
<a class="slider__control slider__control_right slider__control_show" href="#" role="button"></a>
</div>
</div>

</@c.page>