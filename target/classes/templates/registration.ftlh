<#import "parts/common.ftlh" as c>
<#import "parts/login.ftlh" as l>

<@c.page>

<div class="container p-0">
    <div class="login-block">
        <div class="wrap-logo">
            <div class="logo-form">
                <span class="pb-26">Registration</span>
                <div class="img-titile pb-48">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                </div>
                <@l.login "/registration" true/>

            </div>
        </div>
    </div>


</div>
${message?ifExists}
</@c.page>
