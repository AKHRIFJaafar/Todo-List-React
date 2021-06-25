<?php
$dbh = new PDO("mysql:host=localhost;dbname=todo-list","root","12345");
$sql = " SELECT * FROM tasks ";
$TaskQuery = $dbh->query($sql);
$getTask = $TaskQuery->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($getTask));
?>