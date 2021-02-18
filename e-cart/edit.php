<?php
$id=$_GET["id"];
$table=$_GET["table"];
require_once("includes/header.php");
require_once("utility.php");
require_once("includes/classes/AddUpdateForm.php");
require_once("includes/classes/TableClass.php");
$seller=$_SESSION["username"];
$query=$con->prepare("SELECT * FROM items WHERE seller=:username and id=:id");
$query->bindParam(":username", $seller);
$query->bindParam(":id", $id);
$query->execute();
if($query->rowCount()==0) {
    exit("Not eligible to modify items");
}
if(isset($_POST["saveButton"])) {
    
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
                if(!($_FILES[$key]['tmp_name'])) {
                    unset($placeholders[$key]);
                }
                else {
                     $values[] = (file_get_contents($_FILES[$key]['tmp_name']));; 
                }
            } 
        }
        $res=update($con, $table, array_keys($placeholders), $values, ['id'=>$id]);
        if($res!=1)
            echo "<div class='alert alert-danger'><b>ERROR! </b>Failed inserting data</div>";
        else
            header("Location: sellerDashboard.php?seller=".$seller);
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
$tab = new TableClass($con, $table, $id);
$form=new AddUpdateForm($con, $table);
echo $form->createEditDetailsForm($tab);
?>
