<#import "parts/common.ftlh" as c>
<#import "parts/login.ftlh" as l>

<@c.page>
<#include "parts/navbar.ftlh">
<div class="container-fluid p-0">
    <div class="login-block">
        <div class="wrap-logo">
            <div class="logo-form">
                <span class="pb-26">Registration</span>
                <div class="img-titile pb-48">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                </div>
                <@l.login "/registration" true/>
                <div class="errors">

                </div>
            </div>
        </div>
    </div>


</div>
${message?ifExists}
</@c.page>
