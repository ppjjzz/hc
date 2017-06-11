var login=document.getElementById("bubble"),
    username=document.getElementById("username"),
    userError=document.getElementById("userError"),
    passError=document.getElementById("passError"),
    warring=document.getElementById("warring"),
    passcode=document.getElementById("passcode");
    login.onclick=function(){
    	var xhr=new XMLHttpRequest();
    	    xhr.open("POST","http://localhost/hc/newsapp/src/login.php",true);
    	    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    	    xhr.send('username='+username.value+"&passcode="+passcode.value);
    	    xhr.onreadystatechange=function(){
    	    	if(xhr.readyState==4 && xhr.status==200){
    	    		console.log(xhr.responseText);
    	    		if(xhr.responseText=="success"){
    	    			alert("登录成功");
    	    			sessionStorage.setItem("username",username.value);
    	    			location.href="personal.html";
    	    		} else if(xhr.responseText=="error"){
    	    			passError.style.display="block";
    	    			warring.style.display="block";
    	    			setTimeout(function(){
    	    				warring.style.display="none";
    	    			    passError.style.display="none";
    	    			},2000);
    	    		} else{
    	    			userError.style.display="block";
    	    			warring.style.display="block";
    	    			setTimeout(function(){
    	    				warring.style.display="none";
    	    			    userError.style.display="none";
    	    			},2000);
    	    		}
    	    	}
    	    }
    }
