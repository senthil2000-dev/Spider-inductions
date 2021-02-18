<?php
require_once("includes/config.php");
require_once("includes/classes/Errors.php");
$errorArray=array();
if(isset($_POST["register"])) {
  $user=$_POST["username"];
  validateUsername($user);
  $email=$_POST["email"];
  checkEmail($email);
  $pw=$_POST["password"];
  validatePassword($pw);
  $position=$_POST["position"];
  $name=$_POST["name"];
  $password=hash("sha512", $pw);
  if(empty($errorArray)) {
    $query=$con->prepare("INSERT INTO users(name, username, email, password, position) VALUES(:name, :user, :email, :password, :position)");
    $query->bindParam(":name", $name);
    $query->bindParam(":user", $user);
    $query->bindParam(":email", $email);
    $query->bindParam(":password", $password);
    $query->bindParam(":position", $position);
    $query->execute();
    $_SESSION["userLoggedIn"] = $email;
    $_SESSION["username"]=$user;
    $_SESSION["position"]=$position;
    $username=$_SESSION['username'];
    $position=$_SESSION["position"];
    if($position)
      header("Location: buyerDashboard.php");
    else
      header("Location: sellerDashboard.php?seller=$username");
  }
  
}

?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"/>
<link rel="stylesheet" type="text/css" href="assets/css/formStyle.css">
<div class="login-box">
  <h1>Register</h1>
  <form method='POST'>
  <div class="textbox">
    <i class="fas fa-user"></i>
    <input type="text" name='name' placeholder="Name" autocomplete="off" required>
  </div>
  <?php echo getError(Errors::$usernameLength); ?>
  <?php echo getError(Errors::$usernameExists); ?>
  <div class="textbox">
    <i class="fas fa-user"></i>
    <input type="text" name='username' placeholder="Username" autocomplete="off" required>
  </div>
  <?php echo getError(Errors::$emailInvalid); ?>
  <?php echo getError(Errors::$emailExists); ?>
  <div class="textbox">
    <i class="fas fa-envelope"></i>
    <input type="email" name='email' placeholder="Email" autocomplete="off" required>
  </div>
  <?php echo getError(Errors::$notAlphanumeric); ?>
  <?php echo getError(Errors::$passwordLength); ?>
  <div class="textbox">
    <i class="fas fa-lock"></i>
    <input type="password" name='password' placeholder="Password" autocomplete="off" required>
  </div>
  <div class="textbox">
    <i class="fas fa-user"></i>
    <select name="position" id="posVal">
      <option value="0">Seller</option>
      <option value="1">Customer</option>    
    </select>
  </div>
    <input type="submit" name='register' class="btn" value="register">
  </form>
  <a href="index.php">Already have an account?</a>
</div>
<?php
require_once("includes/footer.php");
?>