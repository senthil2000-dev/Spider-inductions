<?php
require_once("includes/header.php");
$table="items";
$editOpt=false;
$nameOfList="Recommended";
$checkout=false;
$purHist=false;
$buyer=$_SESSION["username"];
$cond=isset($_GET["cond"]) ? $_GET["cond"] : "";
require_once("includes/table.php");
?>
<style>
    tr:hover:not(:first-child) {
        background: blue;
        color: white;
    }
</style>
<div>
    <form method='GET' id="query">
        <input hidden type="text" name="tableName" value='<?php echo $table; ?>'>
        <input hidden type="text" name="page" value='<?php echo $page; ?>'>
        <input class='query' type="text" name="cond" placeholder="Enter query">
        <button class='btn btn-primary' type='submit'>PERFORM</button>
    </form>
</div>
<script src="assets/js/select.js"></script>