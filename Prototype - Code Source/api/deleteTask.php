<?php
$id = $_POST["id"];
$dbh = new PDO("mysql:host=localhost;dbname=todo-list", "root", "12345");
$sql = " DELETE FROM tasks WHERE idtasks = $id ";
$getFormer = $dbh->prepare($sql);
$getFormer->execute();

?>
