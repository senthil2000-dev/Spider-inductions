<?php
require_once("../includes/config.php");
$username=$_SESSION["username"];
$query=$con->prepare("SELECT cart FROM users WHERE username=:us");
$query->bindParam(":us", $username);
$query->execute();
$cart=$query->fetchColumn();
if($cart)
    $result=explode(",", $cart);
else
    $result=array();
echo json_encode($result);
?>