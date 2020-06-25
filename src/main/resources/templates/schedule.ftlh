<#import "parts/common.ftlh" as c>
<#import "parts/popUp.ftlh" as p>
<#import "parts/changeCellSchedule2.ftlh" as ch2>
<#import "parts/changeCellSchedule.ftlh" as ch>


<@c.page>
    <meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
    <#include "parts/navbar.ftlh">
    <#include "parts/security.ftlh">
    <@p.popUpError/>
    <@ch2.changeCellSchedule2 clients/>
    <@ch.changeCellSchedule clients/>
    <div class="schedule">
        <div class="groupBy d-flex flex-row justify-content-center">
            <form action="/schedule/groupBy" method="get">

                <div class="row">
                    <input hidden name="_csrf" value="${_csrf.token}">

                    <h4>Фильтр</h4>
                    <#if !isAdmin>
                    <div class="group d-flex flex-column">
                        <label>По тренерам</label>
                        <select name="coaches multiple>
                            <#list admins as admin>
                                <option value="${admin.id}">
                        ${admin.surname} ${admin.name} ${admin.patronymic}
                        </option>
                        </#list>
                        </select>
                    </div>
                        <#else>

                    <div class="group d-flex flex-column">
                        <label>По клиентами</label>
                        <select name="clients" multiple>
                            <#list clients as client>
                                <option value="${client.id}">
                                    ${client.surname} ${client.name} ${client.patronymic}
                                </option>
                            </#list>
                        </select>
                    </div>
                        </#if>

                    <div class="group d-flex flex-column">
                        <label>По времени</label>
                        <select name="time" multiple>
                            <#list workTimes as time>
                                <option value="${time}">
                                    ${time}
                                </option>
                            </#list>
                        </select>
                    </div>
                    <div class="group d-flex flex-column">
                        <label>По дням</label>
                        <select name="days" multiple>
                            <#list workDays as day>
                                <option value="${day?string('dd-MM-yyyy')}">
                                    ${day?string('dd MMMM')}
                                </option>
                            </#list>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <button type="submit">Применить</button>
                </div>

            </form>

        </div>
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
                                                <#if isAdmin>
                                                <td class="multiCell" data-date = "${val[0].dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}">
                                                    <#if (val?size > 1)>
                                                    <div class="changeMultiCell addNoteSchedule justify-content-center align-items-center">
                                                        <div class="bntAdd">
                                                            Добавить
                                                        </div>
                                                    </div>
                                                    <div class="btn-more">Показать все</div>
                                                    <div class="dataCell dNone">

                                                        <#list val as value>

                                                            <div class="data" data-id="${value.id}">
                                                                <#if value.usr.id == userActive.id>
                                                                    <div class="changeNoteSchedule justify-content-center align-items-center">

                                                                        <div class="bntChange">
                                                                            Изменить
                                                                        </div>
                                                                        <div class="bntDelete">
                                                                            Удалить
                                                                        </div>
                                                                    </div>
                                                                </#if>
                                                                <div class="content-td d-flex flex-column">
                                                                    <div class="tag">
                                                                        ${value.type}
                                                                    </div>
                                                                    <div class="time">
                                                                        <span class="start">${value.dateStart.getTime()?string('HH:mm')}</span> - <span class="end">${value.dateEnd.getTime()?string('HH:mm')}</span>

                                                                    </div>
                                                                    <div class="durationBlock">
                                                                        <i class="fa fa-clock-o" aria-hidden="true"></i> <span class="duration">${value.duration.getMinute()}</span> мин
                                                                    </div>
                                                                    <div class="name">${value.name}</div>
                                                                    <span class="labelCell">Тренер: </span>
                                                                    <div class="coach" data-coachId = "${value.usr.id}">${value.usr.surname} ${value.usr.name} ${value.usr.patronymic}</div>
                                                                    <#if isAdmin>
                                                                        <span class="labelCell">Клиент: </span>
                                                                        <div class="client" data-clientId = "${value.client.id}">${value.client.surname} ${value.client.name} ${value.client.patronymic}</div>
                                                                    </#if>
                                                                </div>
                                                            </div>
                                                        </#list>

                                                    </div>
                                                    <#else>
                                                    <div class="changeMultiCell addNoteSchedule justify-content-center align-items-center">
                                                        <div class="bntAdd">
                                                            Добавить
                                                        </div>
                                                    </div>
                                                    <div class="dataCell">
                                                        <#list val as value>

                                                        <div class="data" data-date = "${value.dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}" data-id="${value.id}">
                                                            <#if value.usr.id == userActive.id>
                                                                <div class="changeNoteSchedule justify-content-center align-items-center">
                                                                    <div class="bntChange">
                                                                        Изменить
                                                                    </div>
                                                                    <div class="bntDelete">
                                                                        Удалить
                                                                    </div>
                                                                </div>
                                                            </#if>
                                                            <div class="content-td d-flex flex-column">
                                                                <div class="tag">
                                                                    ${value.type}
                                                                </div>
                                                                <div class="time">
                                                                    <span class="start">${value.dateStart.getTime()?string('HH:mm')}</span> - <span class="end">${value.dateEnd.getTime()?string('HH:mm')}</span>

                                                                </div>
                                                                <div class="durationBlock">
                                                                    <i class="fa fa-clock-o" aria-hidden="true"></i> <span class="duration">${value.duration.getMinute()}</span> мин
                                                                </div>
                                                                <div class="name">${value.name}</div>
                                                                <span class="labelCell">Тренер: </span>
                                                                <div class="coach" data-coachId = "${value.usr.id}">${value.usr.surname} ${value.usr.name} ${value.usr.patronymic}</div>
                                                                <#if isAdmin>
                                                                    <span class="labelCell">Клиент: </span>
                                                                    <div class="client" data-clientId = "${value.client.id}">${value.client.surname} ${value.client.name} ${value.client.patronymic}</div>
                                                                </#if>
                                                            </div>
                                                            </#list>
                                                        </div>

                                                        </#if>



                                                        <#else>
                                                    <td class="multiCell" data-date = "${val[0].dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}">
                                                        <#if (val?size > 1)>
                                                        <div class="btn-more">Показать всё</div>
                                                        <div class="dataCell dNone">

                                                            <#list val as value>

                                                                <div class="data" data-id="${value.id}">
                                                                    <#if value.usr.id == userActive.id>

                                                                    </#if>
                                                                    <div class="content-td d-flex flex-column">
                                                                        <div class="tag">
                                                                            ${value.type}
                                                                        </div>
                                                                        <div class="time">
                                                                            <span class="start">${value.dateStart.getTime()?string('HH:mm')}</span> - <span class="end">${value.dateEnd.getTime()?string('HH:mm')}</span>

                                                                        </div>
                                                                        <div class="durationBlock">
                                                                            <i class="fa fa-clock-o" aria-hidden="true"></i> <span class="duration">${value.duration.getMinute()}</span> мин
                                                                        </div>
                                                                        <div class="name">${value.name}</div>
                                                                        <span class="labelCell">Тренер: </span>
                                                                        <div class="coach" data-coachId = "${value.usr.id}">${value.usr.surname} ${value.usr.name} ${value.usr.patronymic}</div>
                                                                    </div>
                                                                </div>
                                                            </#list>

                                                        </div>
                                                        <#else>
                                                        <div class="changeMultiCell addNoteSchedule justify-content-center align-items-center">

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
                                                                        <i class="fa fa-clock-o" aria-hidden="true"></i> <span class="duration">${value.duration.getMinute()}</span> мин
                                                                    </div>
                                                                    <div class="name">${value.name}</div>
                                                                    <span class="labelCell">Тренер: </span>
                                                                    <div class="coach" data-coachId = "${value.usr.id}">${value.usr.surname} ${value.usr.name} ${value.usr.patronymic}</div>
                                                                </div>
                                                                </#list>
                                                            </div>

                                                            </#if>



                                                    </td>
                                                </#if>
                                            <#else>

                                                <#list val as value>
                                                    <td class="none-data" data-date = "${value.dateStart.getTime()?string('dd-MM-yyyy')}" data-time = "${key}">
                                                        <#if isAdmin>
                                                            <div class="addNoteCell addNoteSchedule justify-content-center align-items-center">
                                                                <div class="bntAdd">
                                                                    Добавить
                                                                </div>
                                                            </div>
                                                        </#if>
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