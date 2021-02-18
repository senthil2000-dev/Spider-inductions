<?php
require_once("../includes/config.php");
$username=$_SESSION["username"];
$query=$con->prepare("SELECT time, count(*) FROM purchases WHERE seller=:seller GROUP BY time ORDER BY time DESC");
$query->bindParam(":seller", $username);
$query->execute();
$result=array();
while($row=$query->fetch(PDO::FETCH_ASSOC)) {
    $key=date("M jS", strtotime($row["time"]));
    $result[$key]=$row["count(*)"];
}
$result=array_slice($result, 0, 7);
echo json_encode($result);
?>