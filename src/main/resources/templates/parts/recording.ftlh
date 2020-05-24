<div class="recording closeRecording" id="recording">
    <div class="recording-form">
        <div class="recording-content-from">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="recording-header-form" >
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                            <h3 class="recording-title">
                                 Отправить заявку
                            </h3>
                            <a title="Close" class="close" id="closeRecording"><i class="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                        <div class="recording-body">
                            <form class="from-recording  d-flex justify-content-center flex-column" method="POST" id="formRecording">
                                <div class="row mb-3">
                                    <input type="text" placeholder="Ваше имя" name="name">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" placeholder="Ваша фамилия" name="surname">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" placeholder="Ваш телефон" name="phone">
                                </div>
                                <div class="row mb-3">
                                    <select name="gender" class="selectGender">
                                        <option>Мужской</option>
                                        <option>Женский</option>
                                    </select>
                                </div>
                                <input type="hidden" name="_csrf" value="${_csrf.token}" />
                                <div class="row">
                                    <button type="submit" id="btnSendRecording">Отправить</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>