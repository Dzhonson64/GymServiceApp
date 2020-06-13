<#import "parts/common.ftlh" as c>
<meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
<@c.page>
<#include "parts/navbar.ftlh">
<div class="discounts">
    <div class="container">
        <div class="row">
            <h1 class="mt-5">Cписок абонементов</h1>
        </div>
        <div class="row">
            <#list discounts as discount>
            <div class="col-lg-4 mt-5">
                <div class="roundedBlock">
                    <div class="rounded">
                        <i class="fa fa-times-circle closeBtn" aria-hidden="true"></i>
                        <i class="fa fa-chevron-down slideToggle" aria-hidden="true"></i>
                        <h5>Название</h5>
                        <input type="text" value="${discount.name}" class="nameDiscount">
                        <ol class="rounded pricesBlock dNone ">
                            <h5>Цены</h5>
                            <#list discount.pricies as price>
                            <li class="d-flex justify-content-end align-items-end flex-column">
                                <i class="fa fa-times-circle deletePrice" aria-hidden="true"></i>
                                <label>Количество периодов</label>
                                <input type="number" value="${price.countDuration?c}" class="countPeriod"/>
                                <label>Тип периода</label>
                                <select class="typePeriod" data-placeholder="">
                                    <option value="${price.duration}" hidden>${price.duration}</option>
                                    <option value="День">День</option>
                                    <option value="Неделя">Неделя</option>
                                    <option value="Месяц">Месяц</option>
                                    <option value="Год">Год</option>
                                </select>
                                <label>Цена</label>
                                <input type="number" class="priceNum" value="${price.price?c}"/>
                                <input type="text" hidden value="${price.id?c}" class="idPrice">
                            </li>
                        </#list>
                        <i class="fa fa-plus-square-o addPrice" aria-hidden="true"></i>

                        </ol>
                        <h5>Описание</h5>
                        <textarea class="description" id="" cols="30" rows="10" >${discount.description}</textarea>
                    </div>
                    <div class="btn draw-border changeAvatar change-bg" >
                        <a class="change-img">сменить аватарку</a>
                    </div>
                    <input type="text" hidden value="${discount.id}" class="idDiscount">
                    <button type="submit" class="save btn draw-border">Save</button>
                </div>



        </div>
        </#list>
        <div class="col-lg-4 d-flex align-items-center">
            <i class="fa fa-plus-square-o add" aria-hidden="true"></i>
        </div>


    </div>
    <div id="openModalDiscountBg" class="modal-from closeModal">
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
                                    <button type="submit" class="saveImg" id="save-bgImg">Save</button>
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
