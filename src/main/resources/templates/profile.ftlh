<#import "parts/common.ftlh" as c>
<#import "parts/login.ftlh" as l>

<@c.page>
<div class="container">


    <div class="profile">
        <div class="row">
            <div class="col-lg-4 align-items-stretch">
                <div class="settings content">
                    <h5>Настройки</h5>
                    <p>${username}</p>
                    <img src="/img/account_user.png" alt="user">
                    <p class="change-img">сменить аватарку</p>
                </div>
            </div>
            <div class="col-lg-8 align-items-stretch">
                <div class="personal-data content d-flex flex-column">
                    <h5>Личный данные</h5>
                    <form method="post">
                        <div class="personal-data-content ">
                            <div class="col-md-12">
                                <div class="personal-data-block">
                                    <label>Username</label>
                                    <input type="text" name = "username" value="${username}">
                                </div>
                                <div class="personal-data-block">
                                    <label>Password</label>
                                    <input type="text" name = "password" value="${password}">
                                </div>
                            </div>

                            <input type="hidden" name="_csrf" value="${_csrf.token}" />
                            <button type="submit" class="save">Save</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </div>

</div>

</@c.page>