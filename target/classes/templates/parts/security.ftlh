<#assign
known = Session.SPRING_SECURITY_CONTEXT??
>

<#if known>
<#assign
userActive = Session.SPRING_SECURITY_CONTEXT.authentication.principal
name = userActive.getUsername()
isAdmin = userActive.isAdmin()
idActiveUser = userActive.getId()



>
<#else>
<#assign
name = "unknown"
isAdmin = false
>
</#if>