<#import "parts/common.ftlh" as c>
<#include "parts/security.ftlh">
<#import "parts/popUp.ftlh" as p>
<@c.page>
    <#include "parts/navbar.ftlh">
    <@p.popUpSuccessful />
    <@p.popUpError />
    <meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
    <meta name="authUser" content="${idActiveUser}" id="idAuthUser">
    <div class="container-fluid mt-5">
        <table class="userList">
            <thead>
            <tr>
                <td>Id</td>
                <td>Username</td>
                <td>id активного абонемента</td>
                <td>ФИО</td>
                <td>Gender</td>
                <td>Age</td>
                <td>Password</td>
                <td>Role</td>
            </tr>
            </thead>

            <#list users as u>
                <tr class="c">
                    <td class = "userId">${u.id}</td>
                    <td>
                        <span>${u.username}</span>
                        <#if idActiveUser == u.id>
                            <span class="you">(You)</span>
                        </#if>
                    </td>
                    <td>
                        <#if u.idDiscount??>
                            <span>${u.idDiscount}</span>
                        <#else>
                            <span>-</span>
                        </#if>
                    </td>


                    <td>
                        <span>${u.surname} ${u.name} ${u.patronymic}</span>
                    </td>
                    <td>
                        <span>${u.gender}</span>
                    </td>
                    <td>
                        <span>${u.age}</span>
                    </td>
                    <td>
                        <div class="password">
                            <input type="password" value="${u.password}" disabled>
                            <i class="fa fa-eye-slash password-input" aria-hidden="true" ></i>
                        </div>
                    </td>


                    <td>
                        <#list u.roles as role>
                        <#if role == "ADMIN">
                        <span class="admin">${role}<span><#sep> ,
                        <#else>
                                    <span class="role">${role}</span><#sep> ,
                                </#if>
                                </#list>
                    </td>
                    <td>
                        <#if u.discount_users??>

                            <#if u.isInGym()>
                                <div class="note-btn left">
                                    Ушёл
                                </div>
                            <#else>
                                <div class="note-btn come">
                                    Пришёл
                                </div>
                            </#if>
                        </#if>
                    </td>
                    <td>
                        <form method="get" action="/UserActivities">
                            <input type="hidden" value="${u.id}" name="usr">
                            <button type="submit" class="userActivities">Посмотреть занятия</button>
                        </form>
                    </td>
                    <td>

                        <a href="/user/${u.id}">
                            <div class="edit-btn">edit
                            </div>
                        </a>
                        <i class="fa fa-times-circle deleteUserFromList" aria-hidden="true"></i>


                    </td>

                </tr>
            </#list>
        </table>
    </div>

</@c.page>