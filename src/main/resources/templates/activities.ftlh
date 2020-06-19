<#import "parts/common.ftlh" as c>
<#import "parts/popUp.ftlh" as p>


<@c.page>
<meta name="_csrf" content="${_csrf.token}" id="csrfUserList">
<#include "parts/navbar.ftlh">
<div class="container">
    <div class="row">
        <div class="activities">
            <div class="row">
                <h2 class="mt-5">Cписок занятий</h2>
            </div>
        </div>

    </div>
</div>

</@c.page>