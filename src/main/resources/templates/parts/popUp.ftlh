<#macro popUpSuccessful>
<div class="popUp closePopUp" id="successfulPopUp">
    <div class="popUp-form">
        <div class="popUp-content-from">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="popUp-header-form" >
                            <h3 class="popUp-title">
                                <i class="fa fa-check-square" aria-hidden="true"></i> Операция выполнена успешно
                            </h3>
                            <a title="Close" class="close" id="closeSuccessfulPopUp">×</a>
                        </div>
                        <div class="popUp-body">
                            <span id="resultResponsePopUp"></span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
</#macro>


<#macro popUpError>
<div class="popUp closePopUp" id="errorPopUp">
    <div class="popUp-form">
        <div class="popUp-content-from">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="popUp-header-form" >
                            <h3 class="popUp-title">
                                <i class="fa fa-window-close" aria-hidden="true"></i> Операция завершена с ошибкой!
                            </h3>
                            <a title="Close" class="close" id="closeErrorPopUp">×</a>
                        </div>
                        <div class="popUp-body">
                            <span id="resultResponsePopUpError"></span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
</#macro>