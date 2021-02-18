<?php
require_once("includes/config.php");
if(!isset($_SESSION["userLoggedIn"])) {
    header("Location: index.php");
    
}
$name=$_SESSION["username"];
$pos=($_SESSION["position"]==0)?"sellerDashboard.php?seller=$name":"buyerDashboard.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"/>
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</head>
<body>

    <a href="checkout.php">
        <img src="cart.png" class="cartImg" alt="cart">
    </a>
    <div class="fixBar">
        <form action="search.php" method="GET">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Surf the world wide web" name="searchQuery" autocomplete="off">
                <div class="input-group-btn">
                    <button type="submit" class="btn-default">
                        <i class="glyphicon glyphicon-search"></i>
                    </button>
                </div>
            </div>
        </form>
    </div>
   <div id="sideBar">
        <div class='toggle-btn' onclick='toggleSidebar()'>
        <span></span>
        <span></span>
        <span></span>
        </div>
        <ul>
            <li onclick="window.location.href='<?php echo $pos; ?>'">Dashboard</li>
            <li onclick="window.location.href='purchaseHistory.php'">Purchase History</li>
            <li onclick="window.location.href='checkout.php'">Checkout</li>
            
            <?php
                if($_SESSION["position"]==0) {
                    echo "<li onclick=\"window.location.href='statistics.php'\">Statistics</li>";
                    echo "<li onclick=\"window.location.href='buyerDashboard.php'\">Buy</li>";
                    echo "<li onclick=\"window.location.href='sellerHistory.php'\">Items sold</li>";
                }
            ?>
            <li onclick="window.location.href='logout.php'">Log out</li>
        </ul>
    </div>
    <div class='content'>
    <script src="assets/js/actions.js"></script>

