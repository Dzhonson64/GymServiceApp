<#import "parts/common.ftlh" as c>
<#include "parts/security.ftlh">
<#import "parts/popUp.ftlh" as p>
<@c.page>
<@p.popUpSuccessful />
<meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
<div class="container mt-5">
    <table class="userList">
        <thead>
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Password</td>
            <td>Role</td>
            <td></td>
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