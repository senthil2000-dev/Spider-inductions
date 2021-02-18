<?php
require_once("includes/config.php");
require_once("includes/classes/Errors.php");
$errorArray=array();
if(isset($_POST["loginBtn"])) {
  $query=$con->prepare("SELECT username, position FROM users WHERE email=:email AND password=:password");
  $query->bindParam(":email", $email);
  $query->bindParam(":password", $password);
  $email=$_POST["email"];
  $pw=$_POST["password"];
  $password=hash("sha512", $pw);
  $query->execute();
  if($query->rowCount()>0) {
    $_SESSION["userLoggedIn"] = $email;
    $row=$query->fetch(PDO::FETCH_ASSOC);
    $_SESSION["username"] = $row["username"];
    $_SESSION["position"] = $row["position"];
    $username=$_SESSION['username'];
    $position=$_SESSION["position"];
    if($position)
      header("Location: buyerDashboard.php");
    else
      header("Location: sellerDashboard.php?seller=$username");
  } 
  else {
    array_push($errorArray, Errors::$loginIncorrect);
    $error="<span class='error'>Invalid email/password</span>";
  }
}
?>

<link rel="stylesheet" type="text/css" href="assets/css/formStyle.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"/>
<div class="login-box">
  <h1>Login</h1>
  <?php echo getError(Errors::$loginIncorrect); ?>
  <form method='POST'>
  <div class="textbox">
    <i class="fas fa-envelope"></i>
    <input type="text" name='email' placeholder="Email" autocomplete="off" required>
  </div>

  <div class="textbox">
    <i class="fas fa-lock"></i>
    <input type="password" name='password' placeholder="Password" autocomplete="off" required>
  </div>
    <input type="submit" name='loginBtn' class="btn" value="SignIn">
  </form>
  <a href="register.php">New to this site?</a>
</div>
<?php
require_once("includes/footer.php");
?>