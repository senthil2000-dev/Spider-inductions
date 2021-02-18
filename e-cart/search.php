<?php
require_once("includes/header.php");
if(!isset($_GET["searchQuery"])) {
    exit("No such term");
}
$term=$_GET["searchQuery"];

$table="items";
$editOpt=0;
$checkout=false;
$purHist=false;
$nameOfList="Search results";
$buyer=$_SESSION["username"];
$cond="WHERE name LIKE '%$term%' OR description LIKE '%$term%'";
require_once("includes/table.php");
?>
<style>
    tr:hover:not(:first-child) {
        background: blue;
        color: white;
    }
</style>

<script src="assets/js/select.js"></script>