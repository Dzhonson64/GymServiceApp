<#macro login path isRegister>
<form action="${path}" method="post">
    <div class="logo-input validate-input">
        <span class="btn-show-pass">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        </span>
        <input type="text" class="input-login" name="username"/>
        <span class="focus-input" data-placeholder="Username"></span>
    </div>
    <div class="logo-input validate-input">
        <span class="btn-show-pass">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        </span>
        <input type="password" class="input-login" name="password"/>
        <span class="focus-input" data-placeholder="Password"></span>
    </div>
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
    <div class="container-login-btn">
        <div class="wrap-login-btn">
            <div class="login-form-bgbtn"></div>
            <button class="login-form-btn">
                <#if !isRegister>
                    Login
                    <#else>
                Registration
                </#if>
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
