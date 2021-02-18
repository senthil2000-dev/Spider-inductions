<?php
require_once("includes/header.php");
$table="items";
$editOpt=true;
$checkout=false;
$purHist=false;
$nameOfList="Manage Products";
if(!isset($_GET["seller"])) {
    exit("No seller name");
}
$seller=$_GET["seller"];
if($_SESSION["position"]=="1") {
    header("Location: buyerDashboard.php?seller=$seller");
}
$query=$con->prepare("SELECT * FROM users WHERE username=:username");
$query->bindParam(":username", $seller);
$query->execute();
if($query->rowCount()==0) {
    exit("No such user");
}
$cond="WHERE seller='$seller'";
require_once("includes/table.php");
?>