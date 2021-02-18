<?php
class Errors {
    public static $usernameLength = "Your username must be between 5 and 25 characters";
    public static $usernameExists = "This username already exists";
    public static $emailInvalid = "Please enter a valid email address";
    public static $emailExists = "This email is already in use";
    public static $notAlphanumeric = "Your passwords can only contain letters and numbers";
    public static $passwordLength = "Your password must be between 5 and 25 characters";
    public static $loginIncorrect = "Your username or password was incorrect";
}
function getError($error){
    global $errorArray;
    if(in_array($error, $errorArray)){
        return "<span class='error'>$error</span>";
    }
}

function validateUsername($un){
    global $errorArray;
    global $con;
    if(strlen($un)>25 || strlen($un)<5) {
        array_push($errorArray, Errors::$usernameLength);
        return;
    }

    $query = $con->prepare("SELECT username FROM users WHERE username=:un");
    $query->bindParam(":un", $un);
    $query->execute();

    if($query->rowCount() != 0) {
        array_push($errorArray, Errors::$usernameExists);
    }
}

function validatePassword($pw){
    global $errorArray;
    if(preg_match("/[^A-Za-z0-9]/", $pw)) {
        array_push($errorArray, Errors::$notAlphanumeric);
        return;
    }

    if(strlen($pw)>30 || strlen($pw)<5) {
        array_push($errorArray, Errors::$passwordLength);
    }
}

function checkEmail($em){
    global $errorArray;
    global $con;
    if(!filter_var($em, FILTER_VALIDATE_EMAIL)) {
        array_push($errorArray, Errors::$emailInvalid);
        return;
    }
  
    $query = $con->prepare("SELECT email FROM users WHERE email=:em");
    $query->bindParam(":em", $em);
    $query->execute();
  
    if($query->rowCount() != 0) {
        array_push($errorArray, Errors::$emailExists);
    }
  }
?>