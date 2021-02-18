
<?php
require_once("includes/classes/AddUpdateForm.php");
class CreateTable{

    private $con, $editopt,$check, $purhist;

    public function __construct($con, $edit, $check, $purhist) {
        $this->con=$con;
        $this->editopt=$edit;
        $this->check=$check;
        $this->purhist=$purhist;
    }
    public function getTable($page, $pageSize, $table, $cond) {
        $editopt=$this->editopt;
        $result=AddUpdateForm::getPlaceholders($this->con, $table);
        if($this->purhist===true) {
            unset($result["Buyer"]);
            unset($result["BuyerEmail"]);
        }
        else if($this->purhist===null) {
            unset($result["seller"]);
        }
        $html= "<table><tr class='top'>";
        foreach($result as $key=>$val) {
            $html.="<th>".$key."</th>";
        }
        if($editopt) {
            $html.="<th>Edit</th>
                <th>Delete</th>";
        }
        
        $html.="</tr>";
        $fromLimit=($page - 1)*$pageSize;
        $username=$_SESSION["username"];
        $query=$this->con->prepare("SELECT cart FROM users WHERE username=:us");
        $query->bindParam(":us", $username);
        $query->execute();
        $cart=$query->fetchColumn();
        $cartItems=explode(",", $cart);
        $query=$this->con->prepare("SELECT * FROM $table $cond LIMIT :fromLimit, :pageSize");
        $query->bindParam(":fromLimit", $fromLimit, PDO::PARAM_INT);
        $query->bindParam(":pageSize", $pageSize, PDO::PARAM_INT);
        $query->execute();
        while($row=$query->fetch(PDO::FETCH_ASSOC)){
            $id=$row["id"];
            $html.="<tr id='$id'>";
            foreach($result as $key=>$val) {
                if($val=="mediumblob") {
                    $src="data:image/png;base64,".base64_encode($row[$key]);
                    $html.="<th><img src='$src' onerror='this.onerror=null; this.src=\"def.jpg\"' alt='No preview available' title='pic'></th>";
                }
                else {
                    if($this->check && $key=="quantity") {
                        $num = count(array_keys($cartItems, $id));
                        $html.="<th>".$num."</th>";
                    }
                    else {
                        if($key=="quantity" && $row[$key]==0) {
                            $html.="<th style='color:red;'>UNAVAILABLE</th>";
                        }
                        else
                            $html.="<th>".$row[$key]."</th>";  
                    }
                }
                    
            }
            $action2="editFunc($id, \"$table\")";
            $action="deleteFunc(this, $id, \"$table\")";
            if($editopt) {
                $html.="<td><button class='btn' onclick='$action2'>EDIT</button></td>
                    <td><button class='btn' onclick='$action'>DELETE</button></td>";
            }
            
            $html.="</tr>";
        }
        $html.="</table>";
        return $html;
    }
}
?>