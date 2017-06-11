<?php
header('Access-Control-Allow-Origin:*');
  $username=$_POST["username"];
  $passcode=$_POST["passcode"];
  $con=mysql_connect("localhost","root","Pjz530019582");
  mysql_select_db("user",$con);
  $re=mysql_query("select * from user where username='".$username."'");
  if($re){
  	while($row=mysql_fetch_array($re)){
  	if($row['passcode']==md5($passcode)){
  		echo "success";
  	} else{
  		echo "error";
  	}
  }
  } else{
  	echo "not found";
  }
  	
   
  
?>