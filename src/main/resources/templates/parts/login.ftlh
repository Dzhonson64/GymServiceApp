<#macro login path isRegister>
<form action="${path}" method="post">
    <div class="logo-input">
        <input type="text" name="username"/>
        <span class="focus-input" data-placeholder="Username"></span>
    </div>
    <div class="logo-input">
        <input type="password" name="password"/>
        <span class="focus-input" data-placeholder="Password"></span>
    </div>
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
    <div class="container-login-btn">
        <div class="wrap-login-btn">
            <div class="login-form-bgbtn"></div>
            <button class="login-form-btn">
                Login
            </button>
        </div>
    </div>
</form>
</#macro>

<#macro logout>
<form action="/logout" method="post">
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
    <button type="submit">Sign Out"</button>
</form>
</#macro>
