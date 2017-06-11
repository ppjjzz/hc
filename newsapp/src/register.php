<?php
	header('Access-Control-Allow-Origin:*');
 $email=$_POST['email'];
 $passcode=md5($_POST['passcode']);
 $conn=mysql_connect("localhost","root","Pjz530019582");

		mysql_select_db("user");
		mysql_query("set names 'utf8'");
		$re="INSERT INTO user (username,passcode)
		VALUES
		('$email','$passcode')";
		if(mysql_query($re,$conn)){
			echo "success";
		} else{
			echo 'error';
		};

?>