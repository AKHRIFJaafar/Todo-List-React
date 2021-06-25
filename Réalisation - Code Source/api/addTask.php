<?php
$dbh = new PDO("mysql:host=localhost;dbname=todo-list","root","12345");
$sql = "INSERT INTO tasks(task_name) VALUE (:task_name)";
$addTaskQuery = $dbh ->prepare($sql);
$addTaskQuery -> bindParam(":task_name",$_POST["task_name"],PDO::PARAM_STR);
$addTaskQuery -> execute();
?>