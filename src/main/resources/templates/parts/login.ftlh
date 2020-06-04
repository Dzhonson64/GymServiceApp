<#include "security.ftlh">
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
        <i class="fa fa-eye-slash password-input" aria-hidden="true" ></i>
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
<div class="row">
    <div class="col d-flex justify-content-end align-items-center">
        <a class="sighInText" href="/registration">Sign in</a>
    </div>
    <#if userActive??>
    <div class="col-lg-6">
        <form action="/logout" method="post">
            <input type="hidden" name="_csrf" value="${_csrf.token}" />
            <button type="submit">Sign Out</button>
        </form>
    </div>
    <#else>
    <div class="col-lg-6 d-flex justify-content-start align-items-center">
            <a href="/login" class="sighInText">Sign up</a>
    </div>
    </#if>
</div>



</#macro>
