<?php
require_once("includes/header.php");
require_once("includes/classes/Item.php");
$id=$_GET["id"];
$item=new Item($con, $id);
echo $item->show();
?>
<style>
    body, html, .content, .container {
        height: 100%;
    }
    .btn {
        font-size: 2rem;
        line-height: 100%;
        width: 60px;
        margin: 0;
    }
    .purchase {
        background: black;
        width: fit-content;
        color: white;
        margin: 1vh 0;
    }
</style>
<script src="assets/js/cartActions.js"></script>