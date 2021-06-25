<?php
$id = $_POST["sid"];
$dbh = new PDO("mysql:host=localhost;dbname=todo-list","root","12345");
$sql = "UPDATE tasks SET task_state = :task_state WHERE idtasks = $id";
$addtaskQuery = $dbh->prepare($sql);
$addtaskQuery->bindParam(":task_state",$_POST["task_state"],PDO::PARAM_STR);

$addtaskQuery->execute();
?>
