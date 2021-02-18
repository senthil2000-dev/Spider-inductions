<?php
class Item {
    private $con, $sql;
    public function __construct($con, $id) {
        $this->con=$con;
        $query=$con->prepare("SELECT * FROM items WHERE id=:id");
        $query->bindParam(":id", $id);
        $query->execute();
        $this->sql=$query->fetch(PDO::FETCH_ASSOC);
    }
    public function show() {
        $p_id=$this->sql["id"];
        $name=$this->sql["name"];
        $description=$this->sql["description"];
        $prev=$this->sql["image"];
        $src="data:image/png;base64,".base64_encode($prev);
        $available=$this->sql["quantity"];
        if($available>0) {
            $text="<span class='status1'><b>STATUS: </b>In stock</span>";
        }
        else {
            $text="<span class='status2'><b>STATUS: </b>Out of stock</span>";
        }
        $seller=$this->sql["seller"];
        $price=$this->sql["price"];
        $username=$_SESSION["username"];
        $query=$this->con->prepare("SELECT cart FROM users WHERE username=:us");
        $query->bindParam(":us", $username);
        $query->execute();
        $cart=$query->fetchColumn();
        $result=explode(",", $cart);
        $num = count(array_keys($result, $p_id));
        if($num===0) {
            $numText="ADD TO CART";
        }
        else {
            $numText="$num ADDED";
        }
        return "<div class='container'>
                    <div class='image'>
                        <img src='$src' onerror='this.onerror=null; this.src=\"def.jpg\"' alt='No preview available' title='pic'>
                    </div>
                    <div class='info'>
                            <h1>$name</h1>
                            <hr>
                            <span><span class='detailed'><b>Description:</b></span> $description</span>
                            <span class='availability'>Available: $available<b>.... </b>running out</span>
                            <span>Sold by <strong>$seller</strong></span>
                            $text
                            <span class='priceAmount'>Price: ₹$price INR</span>
                            <div class='purchase'>
                                <button class='btn' onclick='addItem($p_id, 1, $available)'>+</button><span class='numAdded'>$numText</span><button class='btn' onclick='addItem($p_id, -1, $available)'>-</button>
                            </div>
                    </div>
                    
                </div>";
    }
}