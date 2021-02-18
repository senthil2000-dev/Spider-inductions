<?php
require_once("includes/header.php");
$table="items";
$editOpt=false;
$purHist=false;
$checkout="checkout.php";
$buyer=$_SESSION["username"];
$nameOfList="Hi $buyer! Proceed to checkout";
$query=$con->prepare("SELECT cart FROM users WHERE username=:username");
$query->bindParam(":username", $buyer);
$query->execute();
$cart=$query->fetchColumn();
$res=explode(",", $cart);
$res=array_unique($res);
$res=array_values($res);
if(sizeof($res)>0) {
    $cond="WHERE ";
}
for($m=0;$m<sizeof($res);$m++) {
    $val=$res[$m];
    if($m!=sizeof($res)-1)
        $cond.="id='$val' OR ";
    else
        $cond.="id='$val'";
}
require_once("includes/table.php");
?>
<h3 class="totalAmount">CHECKOUT AMOUNT: </h3>
<button onclick='purchase()' class="btn pBtn">PURCHASE</button>
<style>
    tr:hover:not(:first-child) {
        background: blue;
        color: white;
    }
</style>

<script src="assets/js/select.js"></script>