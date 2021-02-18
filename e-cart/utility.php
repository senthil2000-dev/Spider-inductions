<?php
error_reporting(E_ERROR);
require_once("includes/config.php");
// $val=$POST["noOfCol"];
function insert($con, $table, $name_values, $values) {
    $names=implode(", ",$name_values);
    $statement= "INSERT INTO $table($names) VALUES(";
    for($k=0;$k<sizeof($name_values);$k++) {
        $statement.=':placeholder'.$k;
        if($k!=sizeof($name_values)-1)
            $statement.=", ";
    }
    $statement.=")";
    $query=$con->prepare("$statement");
    for($k=0;$k<sizeof($name_values);$k++) {
        $query->bindParam(":placeholder".$k, $values[$k]);
    }
    return $query->execute();
}

function update($con, $table, $names, $values, $cond=0, $conn='OR') {
    $statement= "UPDATE $table SET ";
    for($k=0;$k<sizeof($names);$k++) {
        $statement.="$names[$k]=:placeholder".$k;
        if($k!=sizeof($names)-1)
            $statement.=", ";
    }
    
    if($cond) {
        $m=0;
        $statement.=" WHERE";
        foreach($cond as $key=>$value) {
            $statement.=" $key='$value'";
            if($m!=sizeof($cond)-1)
                 $statement.=' '.$conn;
            $m++;
        }
    }
    $query=$con->prepare("$statement");
    for($k=0;$k<sizeof($names);$k++) {
        $query->bindParam(':placeholder'.$k, $values[$k]);
    }
    return $query->execute();
}

function select($con, $table, $condition) {
    $statement= "SELECT * FROM $table";

    if($condition)
        $statement.=" WHERE $condition";
    $query=$con->prepare("$statement");
    $query->execute();
    $rows=[];
    while($row=$query->fetch(PDO::FETCH_ASSOC)) {
        array_push($rows, $row);
    }
    return $rows;
}

function selectCol($con, $table, $condition, $col) {
    $statement= "SELECT $col FROM $table";

    if($condition)
        $statement.=" WHERE $condition";
    $query=$con->prepare("$statement");
    $query->execute();
    return $query->fetchColumn();
}

function deleteFrom($con, $table, $condition) {
    $statement= "DELETE FROM $table";

    if($condition)
        $statement.=" WHERE $condition";
    $query=$con->prepare("$statement");
    $query->execute();
}

?>
