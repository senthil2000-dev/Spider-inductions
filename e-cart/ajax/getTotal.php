<?php
require_once("../includes/config.php");
$username=$_SESSION["username"];
$query=$con->prepare("SELECT cart FROM users WHERE username=:us");
$query->bindParam(":us", $username);
$query->execute();
$cart=$query->fetchColumn();
$result=explode(",", $cart);
$sum=0;
$values=array_unique($result);
if($cart!="") {
    $query=$con->prepare("SELECT price, id FROM items WHERE id IN (" . implode(',', $values) . ")");
    $query->execute();
    while($row=$query->fetch(PDO::FETCH_ASSOC)) {
        $sum+=$row["price"]*count(array_keys($result, $row["id"]));
    }
}
echo "₹".$sum;
?>