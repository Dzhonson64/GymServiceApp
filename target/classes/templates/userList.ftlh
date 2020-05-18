<#import "parts/common.ftlh" as c>

<@c.page>

<div class="container mt-5">
    <table class="userList">
        <thead>
            <tr>
                <td>Name</td>
                <td>Role</td>
                <td></td>
            </tr>
        </thead>

        <#list users as user>
        <tr>

            <td >${user.username}</td>
            <td>
                <#list user.roles as role>
                <#if role == "ADMIN">
                    <span class="admin">${role}<span><#sep> ,
                        <#else>
                        <span class="role">${role}</span><#sep> ,
                </#if>
                </#list>
            </td>
            <td>

                    <a href="/user/${user.id}">
                        <div class="edit-btn">edit
                        </div>
                    </a>

            </td>
        </tr>
    </#list>
    </table>
</div>

</@c.page>