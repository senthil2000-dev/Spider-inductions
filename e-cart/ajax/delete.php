<?php
require_once("../includes/config.php");
$id=$_POST["id"];
$table=$_POST["table"];
echo "DELETE FROM $table WHERE id=:id";
$query=$con->prepare("DELETE FROM $table WHERE id=:id");
$query->bindParam(":id", $id);
$query->execute();
?>