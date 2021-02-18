<?php
class AddUpdateForm{
    private $con, $table, $result;

    public function __construct($con, $table){
        $this->con=$con;
        $this->table=$table;
        
        $this->result=AddUpdateForm::getPlaceholders($con, $table);
    }
    public function createAddForm(){
        $result=$this->result;
        $html="<div class='column'>
                <h1>$this->table</h1>
                <h5>Add entry form</h5>
                <form class='styleForm' method='POST' enctype='multipart/form-data'>";
        // for($k=0;$k<sizeof($result); $k++) {
        //     $name=$this->createInput(null, $result[$k]);
        //     $html.=$name;
        // }
        foreach($result as $key=>$value) {
            if($key=="id"||$key=="seller") {
                $name="";
            }
            else if($value=="varchar") {
                $name=$this->createInput(null, $key, "text");
            }
            else if($value=="int") {
                $name=$this->createInput(null, $key, "number");
            }
            else if($value=="mediumblob") {
                $name=$this->createInput(null, $key, "file");
            }
            $html.=$name;
        }
        $addButton=$this->createAddButton();
        $html.="$addButton</form></div>";

        return $html;
                
    }

    public function createEditDetailsForm($val){
        $result=$this->result;
        $html="<div class='column'>
                <h1>$this->table</h1>
                <h5>Add entry form</h5>
                <form class='styleForm' method='POST' enctype='multipart/form-data'>";
        $values = $val->getSql();
        foreach($result as $key=>$valType) {
            $value=$values[$key];
            if($key=="id"||$key=="seller") {
                $name="";
            }
            else if($valType=="varchar") {
                $name=$this->createInput($value, $key, "text");
            }
            else if($valType=="int") {
                $name=$this->createInput($value, $key, "number");
            }
            else if($valType=="mediumblob") {
                $name=$this->createInput($value, $key, "file");
            }
            $html.=$name;
        }
        $saveButton=$this->createSaveButton();
        $html.="$saveButton</form></div>";

        return $html;
    }

    private function createInput($value, $placeholder, $type){
        if($value==null) $value="";
        if($type!="file") {
            return "<div class='form-group'>
                    <input class='form-control' type='$type' placeholder='$placeholder' name='$placeholder' value='$value' required>
                </div>";
        }
        else {
            $value="";
            
            return "<div class='form-group'>
                    <label id='pic' for='product' required>Choose a product picture:</label>
                    <input type='file' id='product' name='$placeholder' accept='image/png, image/jpeg' value='$value' hidden>
                    </div>";
        }
    }
   
    private function createAddButton(){
        return "<button type='submit' class='btn' name='addButton'>Add</button>";
    }

    private function createSaveButton(){
        return "<button type='submit' class='btn' name='saveButton'>Save</button>";
    }

    public static function getPlaceholders($con, $table) {
        $result=[];
        $dataType=[];
        $query=$con->prepare("SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'cart' AND TABLE_NAME = '$table' ORDER BY ORDINAL_POSITION");
        $query->execute();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $result[]=$row["COLUMN_NAME"];
            $dataType[]=$row["DATA_TYPE"];
        }
        return array_combine($result, $dataType);
    }
}
?>