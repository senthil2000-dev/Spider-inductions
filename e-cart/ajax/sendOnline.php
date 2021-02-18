<?php
require_once("../includes/config.php");
$username=$_SESSION["username"];
$cart=$_POST["str"];
$query=$con->prepare("UPDATE users set cart=:cart WHERE username=:us");
$query->bindParam(":us", $username);
$query->bindParam(":cart", $cart);
$query->execute();
echo "done";
?>