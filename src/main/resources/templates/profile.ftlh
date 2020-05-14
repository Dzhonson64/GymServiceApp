<#import "parts/common.ftlh" as c>
<#import "parts/login.ftlh" as l>

<@c.page>
<h4>${username}</h4>
<form method="post">
    <label>Username</label>
    <input type="text" name = "username" value="${username}">

    <label>Password</label>
    <input type="text" name = "password" value="${password}">
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
    <button type="submit">Save</button>
</form>
</@c.page>