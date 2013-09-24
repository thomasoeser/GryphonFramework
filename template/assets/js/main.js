$(document).ready(function() {
	  if (supports_html5_storage() == true)
		{
			$('#rememberme').show();
			var remember = localStorage.getItem('remember');
			if (remember == "true"){
				document.getElementById("remember").checked = true;
			}
		}
	else{
			$('#rememberme').hide();
		}
});
function saveFileDone(key)
{
	if (key == "test")
	{
		$('#noteSaveBtn').html("Saved &#10004;");
	}

}
function appendFileDone(key)
{

}
function loadFileDone(key,data)
{
	if (key == "test")
	{
		document.getElementById("note").value = data;
		$('#noteSaveBtn').html("Save;");
	}
}
function delFileDone(key,data)
{
	if (key == "test")
	{
		document.getElementById("note").value = "";
		$('#noteSaveBtn').html("Save");
	}
}
function filesDirDone(key,data)
{

}
function fileExistsDone(key,data)
{

}
function signinDone(data)
{
	if (data == "y")
	{
		$('#navSignup').hide();
		$('#navSignin').hide();
		$('#navSignout').show();
		$('#navNote').show();
		navNote();
		if (document.getElementById("remember").checked == true)
			{
				localStorage.setItem("remember", "true");
				localStorage.setItem("username", document.getElementById("username").value);
				localStorage.setItem("password", document.getElementById("password").value);
			}
		$('#signinError').html("&#160;<br>&#160;<br>");	
		
	}
	else
	{
		signinError();
	}
}
function signupDone(data)
{

	if (data == "done")
	{
		hideAllPages();
		$('#pageSignupSent').show();	
	}
	else
	{
		signupError();
	}

}
function resetPasswordDone(data)
{
	if (data == "done")
	{
		hideAllPages();
		$('#pageResetSent').show();
	}
	else
	{
		resetPasswordError();
	}
}
function saveFileError(key){}
function appendFileError(key){}
function loadFileError(key){}
function delFileError(key){}
function filesDirError(key){}
function fileExistsError(key){}
function signupError()
{
	var html = "<br><br><br><div class='alert alert-danger'>The email you entered is not valid or is already associated with an account.</div>";
	$('#signupError').html(html);
}
function signinError()
{
	var html = "<br><div class='alert alert-danger'>The username or password you entered is incorrect.</div>";
	$('#signinError').html(html);
}
function resetPasswordError()
{
	var html = "<br><br><br><div class='alert alert-danger'>The email you entered is not valid.</div>";
	$('#resetError').html(html);
}
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
function rememberme()
{
	if (document.getElementById("remember").checked == false)
	{
		localStorage.setItem("remember", "false");		
		localStorage.setItem("username", "");
		localStorage.setItem("password", "");
	}
}

function saveNote()
{
	save('test',document.getElementById('note').value);
}
function loadNote()
{
	load('test');
}
function deleteNote()
{
	del('test');
}
function changedNote()
{
	$('#noteSaveBtn').html("Save");
}
// Navigation
function navHome()
{
	$('#navHome').addClass( "active" );
	$('#navNote').removeClass( "active" );
	$('#navSignup').removeClass( "active" );
	$('#navSignin').removeClass( "active" );
	$('#navSignout').removeClass( "active" );
	hideAllPages();
	$('#pageHome').show();
	
}
function navNote()
{
	$('#navHome').removeClass( "active" );
	$('#navNote').addClass( "active" );
	$('#navSignup').removeClass( "active" );
	$('#navSignin').removeClass( "active" );
	hideAllPages();
	$('#pageNote').show();
	
}
function navSignup()
{
	$('#navHome').removeClass( "active" );
	$('#navNote').removeClass( "active" );
	$('#navSignup').addClass( "active" );
	$('#navSignin').removeClass( "active" );
	hideAllPages();
	document.getElementById("email").value = "";
	$('#signupError').html("&#160;<br>&#160;<br>");	
	$('#pageSignup').show();
	
}
function navSignin()
{
	$('#navHome').removeClass( "active" );
	$('#navNote').removeClass( "active" );
	$('#navSignup').removeClass( "active" );
	$('#navSignin').addClass( "active" );
	hideAllPages();
	if (document.getElementById("remember").checked == false)
	{
		document.getElementById("username").value = "";
		document.getElementById("password").value = "";
	}
	else
	{
		var remember = localStorage.getItem('remember');
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		if (remember == "true"){
			document.getElementById("remember").checked = true;
			document.getElementById("username").value = username;
			document.getElementById("password").value = password;	
		}
	}
	$('#signinError').html("&#160;<br>&#160;<br>");		
	$('#pageSignin').show();
	
}
function navSignout()
{
	$('#navHome').removeClass( "active" );
	$('#navNote').removeClass( "active" );
	$('#navSignup').removeClass( "active" );
	$('#navSignin').removeClass( "active" );
	hideAllPages();
	
		$('#navSignup').show();
		$('#navSignin').show();
		$('#navSignout').hide();
		$('#navNote').hide();	
	
	$('#pageSignedOut').show();
	if (document.getElementById("remember").checked == false)
		{
			localStorage.setItem("remember", "false");		
			localStorage.setItem("username", "");
			localStorage.setItem("password", "");
		}
			document.getElementById("username").value = "";
			document.getElementById("password").value = "";	
			document.getElementById("note").value = "";	
			$('#noteSaveBtn').html("Save");
			
			
}
function forgotPassword()
{
	$('#navHome').removeClass( "active" );
	$('#navNote').removeClass( "active" );
	$('#navSignup').removeClass( "active" );
	$('#navSignin').removeClass( "active" );
	hideAllPages();
	$('#resetError').html("&#160;<br>&#160;<br>");	
	document.getElementById("reset").value = "";
	$('#pageReset').show();
}
function hideAllPages()
{
	$('#pageHome').hide();
	$('#pageSignup').hide();
	$('#pageSignin').hide();
	$('#pageNote').hide();
	$('#pageReset').hide();
	$('#pageSignupSent').hide();
	$('#pageResetSent').hide();
	$('#pageSignedOut').hide();
}
