<?php  
require_once('includes/Short.php');
require_once('includes/config.php');
	if(isset($_GET['id'])){
		$id  = $_GET['id'];
		$short=new Short($conn);
		$url = $short->dest($id);
		header("Location: $url");
	}
?>

<!DOCTYPE html>
<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<title>Shorten URLS</title>
</head>
<body>
	<input type="text" id='val' name="inp" required>
	<input type="submit" onclick='generate()' placeholder="want a short url?">
	<div class='short'></div>
	<script type="text/javascript">
			function generate() {
				let url=document.getElementById('val').value;
				$.post("includes/process.php", {link: url})
    			.done(function(data) {
					out = 'http://localhost/urlshortner/index.php?id=' + data;
					document.getElementsByClassName('short')[0].innerHTML='<b>Shortened url: </b><a href="' + out + '" target="_blank">myweb/' + data + '</a>';
				 });
			}
	</script>
</body>
</html>