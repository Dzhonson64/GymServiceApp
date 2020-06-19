<#include "security.ftlh">
<#macro login path isRegister>

                <#if !isRegister>
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
                    Login
            </button>
        </div>
    </div>
</form>
                    <#else>
<form action="${path}" method="post">
    <div class="logo-input validate-input">
        <input type="text" class="input-login" name="surname"/>
        <span class="focus-input" data-placeholder="Surname"></span>
    </div>
    <div class="logo-input validate-input">
        <input type="text" class="input-login" name="name"/>
        <span class="focus-input" data-placeholder="Name"></span>
    </div>
    <div class="logo-input validate-input">
        <input type="text" class="input-login" name="patronymic"/>
        <span class="focus-input" data-placeholder="Patronymic"></span>
    </div>
    <div class="logo-input validate-input">
        <input type="number" class="input-login" name="age" min="1"/>
        <span class="focus-input" data-placeholder="Age"></span>
    </div>
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
    <div class="selectField validate-input">
        <select name="gender" class="selectGender">
            <option>Мужской</option>
            <option>Женский</option>
        </select>
    </div>
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
    <div class="container-login-btn">
        <div class="wrap-login-btn">
            <div class="login-form-bgbtn"></div>
            <button class="login-form-btn">
                Registration
            </button>
        </div>
    </div>
</form>

                </#if>

</#macro>

<#macro logout>
<div class="logBlock">
    <a href="/login">Sign in</a>
</div>

<#if userActive??>
<form action="/logout" method="post">
    <input type="hidden" name="_csrf" value="${_csrf.token}" />
    <button type="submit">Sign Out</button>
</form>
<#else>
<div class="regBlock">
    <a href="/registration">Sign up</a>
</div>

</#if>

</#macro>
