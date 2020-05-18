<#macro page>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sweater</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/static/style.css">
    <link rel="stylesheet" href="/static/profile.css">
    <link rel="stylesheet" href="/static/userList.css">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">


</head>
<body>
<#include "navbar.ftlh">
    <#nested>
<script src="/scripts/jquery-3.2.1.min.js"></script>
<script src="/scripts/script.js"></script>
<script src="/scripts/ajax.js"></script>
</body>
</html>
</#macro>
