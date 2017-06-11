window.onload=function(){
  var email=document.getElementById("email"),
       mobile=document.getElementById("mobile"),
	    codes=document.getElementById("code"),
	    getcode=document.getElementById("getcode"),
	    passcode=document.getElementById("passcode"),
	    repasscode=document.getElementById("repasscode"),
	    submit=document.getElementById("submit");
	    var canvas=document.getElementById("canvas");
	    var ctx=canvas.getContext("2d");
	    var arr=[];
	    var code="";
	getcode.onclick=function(){
		canvas.style.display="block";
		getcode.style.display="none";
	}
	    submit.onclick=function(){
	    	if(codes.value.toLowerCase()!=code.toLowerCase()){
	    		alert("验证码错误")
	    		return false;
	    	}
	    	var emailrx=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	    	var mobilerx=/^1[3|4|5|7|8][0-9]{9}$/;
	    	var test;
	    	var value;
	    	if(email){
	    		test=emailrx.test(email.value);
	    		value=email.value;
	    	} else{
	    		test=mobilerx.test(mobile.value);
	    		value=mobile.value
	    	}
	    	if(test && CheckPassWord(passcode.value)){
	    		if(passcode.value==repasscode.value){
	    			var xhr=new XMLHttpRequest();
	    		xhr.open("POST",'../src/register.php',true);
	    		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	    		xhr.send("email="+value+"&passcode="+passcode.value);
	    		xhr.onreadystatechange=function(){
	    			if(xhr.readyState==4 && xhr.status==200){
	    				console.log(xhr.responseText);
	    				if(xhr.responseText=="success"){
	    					alert("恭喜你注册成功");
	    				location.href="login.html";
	    				} else{
	    					alert("注册失败请重试");
	    				}
	    				
	    			}
	    		}
	    		} else{
	    			alert("密码前后不一致");
	    			return false;
	    		}
	    		
	    	} else{
	    		alert("请输入正确格式的邮箱或密码");
	    		return false;
	    	}
	    	    
	    }
	
	for (var i=65;i<91;i++) {
		arr.push(i)
	}
	for (var i=97;i<123;i++) {
		arr.push(i)
	}
	arr=arr.map(x=>String.fromCharCode(x))
//	arr=arr.map(x=>x.toUpperCase())
	for (let i=0;i<4;i++) {
		var ran=parseInt(Math.random()*52);
		code+=arr[ran];
	}
	ctx.font="70px Arial";
	ctx.fillText(code,20,110);
	ctx.bezierCurveTo(15,80,78,22,110,33);
	ctx.fill()
	canvas.onclick=function(){
		code="";
		for (let i=0;i<4;i++) {
		var ran=parseInt(Math.random()*52);
		code+=arr[ran];
	}
		ctx.clearRect(0,0,1000,1000);
		ctx.fillText(code,40,110);
	}    
}
function CheckPassWord(password) {//必须为字母加数字且长度不小于8位
   var str = password;
    if (str == null || str.length <6 || str.length >12) {
        return false;
    }
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(str)) {
        return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}