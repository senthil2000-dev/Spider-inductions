<?php
class TableClass{

    private $con, $sqlData, $id;

    public function __construct($con, $table, $id) {
        $this->con=$con;
        $query=$this->con->prepare("SELECT * FROM $table WHERE id = :id");
        $query->bindParam(":id", $id);
        $query->execute();
        $this->sqlData=$query->fetch(PDO::FETCH_ASSOC);
        $this->id=$id;
    }
    public function getSql() {
        return $this->sqlData;
    }
}
?>