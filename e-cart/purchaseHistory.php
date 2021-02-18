<?php
require_once("includes/header.php");
$table="purchases";
$editOpt=false;
$purHist=true;
$nameOfList="Items you purchased";
$checkout="purchaseHistory.php";
$buyer=$_SESSION["username"];
$cond="WHERE Buyer='$buyer'";
require_once("includes/table.php");
?>