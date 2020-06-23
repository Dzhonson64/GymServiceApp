<#macro changeCellSchedule clients>
<div class="changeCellSchedule closeRecording" id="changeCellSchedule">
    <div class="changeCellSchedule-form">
        <div class="changeCellSchedule-content-from">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="changeCellSchedule-header-form" >
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                            <h3 class="changeCellSchedule-title">
                                Добавить запись
                            </h3>
                            <a title="Close" class="close" id="closeRecording"><i class="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                        <div class="changeCellSchedule-body">
                            <form class="from-changeCellSchedule  d-flex justify-content-center flex-column" method="POST" id="formRecording">
                                <div class="row mb-3">
                                    <label>Название</label>
                                    <input type="text" placeholder="Название" name="name" class="topic">
                                </div>
                                <div class="row mb-3">
                                    <label>Тег</label>
                                    <input type="text" placeholder="Тег" name="tag" class="tag">
                                </div>
                                <div class="row mb-3">
                                    <label>Время начала тренировки</label>
                                    <input type="text" placeholder="Время начала тренировки" name="startTime" class="startTime">
                                </div>
                                <div class="row mb-3">
                                    <label>Продолжительность занятия (макс. 59 мин)</label>
                                    <input type="number" placeholder="Продолжительность занятия (макс. 59 мин)" name="duration" class="duration">
                                </div>
                                <div class="row mb-3 d-flex flex-column ">
                                    <label>Клиенты</label>
                                    <select name="client" class="selectClient">
                                        <#list clients as client>
                                        <option value="${client.id}">${client.surname} ${client.name} ${client.patronymic} (${client.username})</option>
                                    </#list>
                                    </select>
                                </div>
                                <input type="hidden" name="_csrf" value="${_csrf.token}" />
                                <div class="row">
                                    <button type="submit" id="btnSendChangeSchedule">Отправить</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
</#macro>