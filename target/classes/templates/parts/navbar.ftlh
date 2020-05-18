<#import "login.ftlh" as l>
<#include "security.ftlh">
<nav class="container-fluid mynavbar pt-1 pb-1">

    <a class="navbar-brand col-lg-2" href="/">Спортивный клуб</a>
    <div class="nav-content col-lg-10" id="navbarSupportedContent">
        <div class="row">
            <ul class="nav-links col-lg-11" >
                <li class="col-auto p-0">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="col-auto p-0">
                    <a class="nav-link" href="/main">Messages</a>
                </li>
                <li class="col-auto p-0">
                    <a class="nav-link" href="/test">test</a>
                </li>
                <#if isAdmin>
                <li class="col-auto p-0">
                    <a class="nav-link" href="/user/">Users</a>
                </li>
            </#if>
            <#if idActiveUser??>
            <li class="col-auto p-0">
                <a class="nav-link" href="/user/profile">Profile</a>
            </li>
        </#if>

        </ul>
        <div class="col-lg-1 login">
            <@l.logout />
        </div>
    </div>

</nav>