<?php
require_once("../includes/config.php");
$username=$_SESSION["username"];
$query=$con->prepare("SELECT cart FROM users WHERE username=:us");
$query->bindParam(":us", $username);
$query->execute();
$cart=$query->fetchColumn();
$result=explode(",", $cart);
$arr=array();
$values=array_unique($result);
if($cart!="") {
    $query=$con->prepare("SELECT * FROM items WHERE id IN (" . implode(',', $values) . ")");
    $query->execute();
    while($row=$query->fetch(PDO::FETCH_ASSOC)) {
        $quantity=count(array_keys($result, $row["id"]));
        $id=$row["id"];
        $name=$row["name"];
        $price=$row["price"];
        $image=$row["image"];
        $seller=$row["seller"];
        $subarr= array('id'=>$id, 'name' => $name, 'price' => $price, 'image' => $image, 'quantity' => $quantity, 'seller'=>$seller);
        array_push($arr, $subarr);
    }
    foreach($arr as $el) {
        $buyer=$_SESSION["username"];
        $email=$_SESSION["userLoggedIn"];
        $query=$con->prepare("INSERT INTO purchases(name, price, Quantity_Purchased, image, Buyer, BuyerEmail, seller) VALUES(:name, :price, :quantity, :image, :buyer, :buyeremail, :seller)");
        $query->bindParam(":name", $el["name"]);
        $query->bindParam(":price", $el["price"]);
        $query->bindParam(":quantity", $el["quantity"]);
        $query->bindParam(":image", $el["image"]); 
        $query->bindParam(":buyer", $buyer); 
        $query->bindParam(":buyeremail", $email);
        $query->bindParam(":seller", $seller); 
        $query->execute();
        $query=$con->prepare("UPDATE items SET quantity=quantity-:quantity WHERE id=:id");
        $query->bindParam(":quantity", $el["quantity"], PDO::PARAM_INT);
        $query->bindParam(":id", $el["id"], PDO::PARAM_INT); 
        $query->execute();
    }
}
?>