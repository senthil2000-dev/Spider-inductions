<?php 
require_once("includes/header.php");
require_once("utility.php");
require_once("includes/classes/AddUpdateForm.php");
    $seller=$_SESSION["username"];
    $query=$con->prepare("SELECT position FROM users WHERE username=:username");
    $query->bindParam(":username", $seller);
    $query->execute();
    if($query->fetchColumn()!=0) {
        exit("Not eligible to add items");
    }
if(isset($_POST["addButton"])) {
        $table=$_GET["table"];
        $placeholders=AddUpdateForm::getPlaceholders($con, $table);
        $values=[];
        foreach($placeholders as $key=>$val) {
            if($key=="id") {
                unset($placeholders[$key]);
                continue;
            }
            if($key=="seller") {
                $values[]=$_SESSION["username"];
            }
            else if($val!=="mediumblob") {
                $values[]=$_POST[$key]; 
            }
            else {
               $values[] = (file_get_contents($_FILES[$key]['tmp_name']));; 
            }
        }
        $res=insert($con, $table, array_keys($placeholders), $values);
       
        if($res==1)
            header("Location: sellerDashboard.php?seller=".$seller);
        else
            echo "<div class='alert alert-danger'><b>ERROR! </b>Failed inserting data!</div>";
     
}
?>
<style>
body {
    display: flex;
    flex-direction: column;
    background-color: dodgerblue;
}
.btn {
    background: green;
}
</style>
<?php
$form=new AddUpdateForm($con, $_GET["table"]);
echo $form->createAddForm();
?>