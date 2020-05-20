<#import "parts/common.ftlh" as c>
<#include "parts/security.ftlh">
<#import "parts/popUp.ftlh" as p>
<@c.page>
<@p.popUpSuccessful />
<div class="container mt-5">
    <table class="userList">
        <thead>
        <tr>
            <td>Name</td>
            <td>Role</td>
            <td></td>
        </tr>
        </thead>

        <#list users as u>
        <tr class="c">

            <td >
                <span class="id" hidden="hidden">${u.id}</span>
                <span>${u.username}</span>
                <#if idActiveUser == u.id>
                <span class="you">(You)</span>
                </#if>
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

                <a href="/user/${u.id}">
                    <div class="edit-btn">edit
                    </div>
                </a>
                <form method="POST" action="/user/${u.id}/deleteFromList">
                    <button type="submit">
                        <i class="fa fa-times-circle deleteUserFromList" aria-hidden="true"></i>
                    </button>

                    <input type="hidden" value = "${_csrf.token}" name = "_csrf">
                </form>


            </td>

        </tr>
    </#list>
    </table>
</div>

</@c.page>