<#import "parts/common.ftlh" as c>
<#import "parts/login.ftlh" as l>
<#import "parts/popUp.ftlh" as p>

<@c.page>
<#include "parts/navbar.ftlh">
<@p.popUpSuccessful />
<@p.popUpError />
<div class="container">


    <div class="profile">
        <div class="row">
            <div class="col-lg-4 align-items-stretch mt-5">
                <div class="settings content">
                    <h5>Настройки</h5>
                    <p class="userName">${username}</p>
                    <img src="/uploads/profile/${filename}" alt="user" id="avatar-img">
                    <div class="btn draw-border changeAvatar" id="change-avatar">
                        <a class="change-img">сменить аватарку</a>
                    </div>

                </div>
            </div>
            <div class="col-lg-8 align-items-stretch mt-5">
                <div class="personal-data content d-flex flex-column">
                    <h5>Личный данные</h5>
                    <form method="post" id="personalData">
                        <div class="personal-data-content ">
                            <div class="col-md-12">
                                <div class="personal-data-block">
                                    <label>Username</label>
                                    <input type="text" name = "username" value="${username}">
                                </div>
                                <div class="personal-data-block">
                                    <label>Password</label>
                                    <div class="passwordBlock">
                                        <input type="password" name = "password" value="${password}">
                                        <i class="fa fa-eye-slash password-input" aria-hidden="true" ></i>
                                    </div>

                                </div>
                            </div>

                            <input type="hidden" name="_csrf" value="${_csrf.token}" />
                            <button type="submit" class="save btn draw-border" id="saveData">Save</button>
                            <p id="success"></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <div id="openModal" class="modal-from closeModal">
            <div class="modal-dialog-from">
                <div class="modal-content-from">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="img">
                                    <img src="/img/tranferToServer.svg" alt="" class="title-img" >
                                </div>

                            </div>
                            <div class="col-lg-8">
                                <div class="modal-header-form">
                                    <h3 class="modal-title">Загрузите файл<i class="fa fa-cloud-download pl-2" aria-hidden="true"></i></h3>
                                    <a title="Close" class="close" id="closeModal">×</a>
                                </div>
                                <div class="modal-body">
                                    <form method="post" enctype="multipart/form-data" class="change-avatar-form" id="change-avatar-form">

                                        <div class="field__wrapper">

                                            <input name="file" type="file" name="file" id="field__file-2" class="field field__file">

                                            <label class="field__file-wrapper" for="field__file-2">
                                                <div class="field__file-fake">Файл не выбран</div>
                                                <div class="field__file-button">Выбрать</div>
                                            </label>

                                        </div>
                                        <input type="hidden" name="_csrf" value="${_csrf.token}" />
                                        <button type="submit" class="save" id="save-avatar">Save</button>
                                        <span class="message" id="suc">${inform?ifExists}</span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    </div>

</div>

</@c.page>