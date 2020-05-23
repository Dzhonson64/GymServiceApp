<#import "parts/common.ftlh" as c>

<@c.page>
<#include "parts/navbar.ftlh">
<div class="container">
    <div class="row d-flex justify-content-center">
        <form action="/user" method="post" class="user-edit-form mt-5" id="userEditFrom">
            <div class="form_grup">
                <input type="text" name="username" value="${user.username}" class="form_input">
                <label class="form_label">Username</label>
            </div>

            <#list roles as role>
            <div>
                <label><input type="checkbox" name="${role}" class="option-input checkbox" ${user.roles?seq_contains(role)?string("checked", "")}>${role}</label>
            </div>
        </#list>
        <input type="hidden" value = "${user.id}" name = "userId">
        <input type="hidden" value = "${_csrf.token}" name = "_csrf">
        <button type = "submit" class="save" id="saveEditUser">Save</button>
        </form>
    </div>
</div>


</@c.page>