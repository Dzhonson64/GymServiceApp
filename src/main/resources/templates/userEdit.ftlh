<#import "parts/common.ftlh" as c>

<@c.page>
<#include "parts/navbar.ftlh">
<div class="container">
    <div class="row d-flex justify-content-center">
        <form method="post" class="user-edit-form mt-5" id="userEditFrom">
            <div class="form_grup">
                <input type="text" name="username" value="${user.username}" class="form_input">
                <label class="form_label">Username</label>
            </div>
            <div class="form_grup">
                <input type="text" name="name" value="${user.name}" class="form_input">
                <label class="form_label">Name</label>
            </div>
            <div class="form_grup">
                <input type="text" name="surname" value="${user.surname}" class="form_input">
                <label class="form_label">Surname</label>
            </div>
            <div class="form_grup">
                <input type="text" name="patronymic" value="${user.patronymic}" class="form_input">
                <label class="form_label">Patronymic</label>
            </div>
            <div class="form_grup">
                <select name="gender" class="selectGender">
                    <option hidden>${user.gender}</option>
                    <option>Мужской</option>
                    <option>Женский</option>
                </select>
                <label class="form_label">Gender</label>
            </div>

            <div class="form_grup">
                <input type="text" name="age" value="${user.age?c}" class="form_input">
                <label class="form_label">Age</label>
            </div>

            <#list roles as role>
            <div>
                <label><input type="checkbox" name="${role}" class="option-input checkbox" ${user.roles?seq_contains(role)?string("checked", "")}>${role}</label>
            </div>
        </#list>
        <input type="hidden" value = "${user.id}" name = "userId">
        <input type="hidden" value = "${_csrf.token}" name = "_csrf">
        <button type = "submit" class="saver" id="saveEditUser">Save</button>
        </form>
    </div>
</div>


</@c.page>