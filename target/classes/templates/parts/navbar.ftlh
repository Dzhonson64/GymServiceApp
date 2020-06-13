<#import "login.ftlh" as l>
<#include "security.ftlh">
<nav class="container-fluid mynavbar">

    <a class="navbar-brand col-lg-2" href="/">Спортивный клуб</a>
    <div class="nav-content col-lg-10" id="navbarSupportedContent">
        <div class="row">
            <ul class="nav-links col-lg-9" >
                <li class="col-auto p-0">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="col-auto p-0">
                    <a class="nav-link" href="/main">Messages</a>
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
        <div class="col-lg-3 login">
            <div class="row">
                <div class="col-lg-6">
                    <div class="profileMenu d-flex align-items-center" >
                        <div class="userBlock d-flex justify-content-center align-items-center" id="profileMenu">
                            <#if userActive??>
                            <img src="/uploads/profile/${userActive.filename}" alt="" id="miniAvatarUserMenu">
                            <span class="userNameMenu" id="userNameMenu">${name}</span>
                            <input type="hidden" value="${userActive.id}"  id="idUser">



                            <#else>
                            <img src="/uploads/profile/account_user.png" alt="" >
                            <span class="userNameMenu" >The Guest</span>
                            <input type="hidden" value="-1" id="idUser">
                        </#if>
                    </div>



                </div>
                <div class="menu-list" id="profileMenuList">
                    <div class="arrow-up"></div>
                    <ul>
                        <li>
                            <a href="/user/profile">Настройки</a>
                        </li>
                        <#if isAdmin>
                        <li>
                            <a href="/listRecording">Записи в клуб</a>
                        </li>
                        <li>
                            <a href="/editDiscounts">Список абонементов</a>
                        </li>
                    </#if>

                    </ul>
                </div>
            </div>
            <div class="col-lg-6 d-flex justify-content-center align-items-center">
                <div class="loginBlock d-flex justify-content-around align-items-center">
                    <@l.logout />
                </div>

            </div>
        </div>

    </div>

</nav>