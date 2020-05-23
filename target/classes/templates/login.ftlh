<#import "parts/common.ftlh" as c>
<#import "parts/login.ftlh" as l>

<@c.page>
<#include "parts/navbar.ftlh">
<div class="container-fluid p-0">
    <div class="login-block">
        <div class="wrap-logo">
            <div class="logo-form">
                <span class="pb-26">Login</span>
                <div class="img-titile pb-48">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                </div>
                <@l.login "/login" false/>
                <div class="bottom-text">
                    <span>Don’t have an account? </span>
                    <a href="/registration">Create account</a>
                </div>

            </div>
        </div>
    </div>
</div>


</@c.page>
