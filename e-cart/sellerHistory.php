<?php
require_once("includes/header.php");
$table="purchases";
$editOpt=false;
$checkout="sellerHistory.php";
$purHist=null;
$nameOfList="Items sold";
$seller=$_SESSION["username"];
if($_SESSION["position"]=="1") {
    header("Location: buyerDashboard.php?seller=$seller");
}
$cond="WHERE seller='$seller'";
require_once("includes/table.php");
?>