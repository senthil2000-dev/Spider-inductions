<?php
ob_start();

session_start();

date_default_timezone_set("Asia/Kolkata");
try{
  $conn=new PDO("mysql:dbname=short;host=localhost;port=3306","root","");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
}
catch (PDOException $e){
    echo "Connection failed".$e->getMessage();
}
?>