<#import "parts/common.ftlh" as c>
<#import "parts/login.ftlh" as l>
<#import "parts/popUp.ftlh" as p>

<@c.page>
<meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
<#include "parts/navbar.ftlh">
<@p.popUpSuccessful />
<@p.popUpError />
<div class="container">


    <div class="profile">
        <div class="row">
            <div class="col-lg-4 align-items-stretch mt-5">
                <div class="settings content">
                    <h5>Настройки</h5>
                    <p class="userName">${user.username}</p>
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
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="personal-data-block">
                                        <label>Логин</label>
                                        <input type="text" name = "username" value="${user.username}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="personal-data-block">
                                        <label>Пароль</label>
                                        <div class="passwordBlock">
                                            <input type="password" name = "password" value="${user.password}">
                                            <i class="fa fa-eye-slash password-input" aria-hidden="true" ></i>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="personal-data-block">
                                        <label>Имя</label>
                                        <input type="text" name = "name" value="${user.name}">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="personal-data-block">
                                        <label>Фамилия</label>
                                        <input type="text" name = "surname" value="${user.surname}">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="personal-data-block">
                                        <label>Отчество</label>
                                        <input type="text" name = "patronymic" value="${user.patronymic}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="personal-data-block genderField">
                                        <label>Пол</label>
                                        <select name="gender" class="selectGender">

                                            <option hidden>${user.gender}</option>
                                            <option>Мужской</option>
                                            <option>Женский</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="personal-data-block ageField">
                                        <label>Возраст</label>
                                        <input type="number" name = "age" value="${user.age?c}">
                                    </div>

                                </div>
                            </div>



                            <input type="hidden" name="_csrf" value="${_csrf.token}" />
                            <button type="submit" class="saver btn draw-border" id="saveData">Save</button>
                            <p id="success"></p>
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-lg-4 align-items-stretch mt-5">
                <div class="discount content">
                    <h5>Абонемент</h5>
                    <#if idDiscount??>
                    <div class="discountBlock">
                        <h4 class="discountName">${selectedDiscount.name}</h4>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="priceBlock">
                                    <span>Цена</span>
                                    <p>${selectedPrice.price} руб.</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="countDurationBlock">
                                    <span>Действителен Период</span>
                                    <p>${selectedPrice.countDuration} ${selectedPrice.duration}</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="remainingTime">
                                    <span>Осталось посещений</span>
                                    <p>${remainingTime}</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="remainingTime">
                                    <span>Дата действия абонемента</span>
                                    <p>${discountResultDate}</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="discountDescriptionBlock">
                                <span>Описание</span>
                                <p>${selectedDiscount.description}</p>
                            </div>
                        </div>
                        <input type="hidden" value="${idDiscount.id}" class="idDiscountPrice">
                        <div class="btn draw-border unsubscribeDiscount">
                            <a class="change-img">Отписаться</a>
                        </div>
                    </div>
                    <div class="row falseIdDiscountBlock dNone">
                        <p class="falseIdDiscount">Абонемент не куплен</p>
                    </div>
                    <#else>

                    <div class="row">
                        <p class="falseIdDiscount">Абонемент не куплен</p>
                    </div>


                </#if>
            </div>
        </div>
        <div class="col-lg-4 align-items-stretch mt-5">
            <div class="money content d-flex flex-column">
                <h5>Лицевой счёт</h5>
                <div class="coins d-flex justify-content-center align-items-center">
                    <img src="/img/coins.png" alt="">
                    <span>0 <i class="fa fa-rub" aria-hidden="true"></i></span>
                </div>
                <div class="btn draw-border">
                    <a class="change-img">Пополнить</a>
                </div>
            </div>


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
                                <button type="submit" class="saver" id="saveAvatar">Save</button>
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