<?php
require_once('gryphonframeworkconfig.php');
require_once('gryphonframework.php');
$e =  $_GET{'email'};
$regex = "/[^a-z0-9\.@]/i";
$e = preg_replace($regex,"",$e); 
$a = $GryphonStorageAccount;
$j = jAuthenticate($GryphonStorageUsername,$GryphonStoragePassword,$GryphonStorageSalt);
$p = $GryphonStorageProject;
if(!filter_var($e, FILTER_VALIDATE_EMAIL))
  {
	echo "E-mail is not valid";
  }
else
  {
	$url = $GryphonStorageURL . "reset.php?a=" . $a . "&j=" . $j . "&p=" . $p . "&e=" . $e;
	$page = file_get_contents($url);
	$key = $GryphonStorageUsername . substr($GryphonStoragePassword,-8);
	$key = md5($key) . $GryphonStorageUsername . substr($GryphonStoragePassword,-8);
	$key = hash("sha256",$key);
	$encrypted = trim($page);
	if ($encrypted == "fail")
	{
		$decrypted = $encrypted;
	}
	else
	{
		$decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($key), base64_decode($encrypted), MCRYPT_MODE_CBC, md5(md5($key))), "\0");
	}
	$answer = "fail";
	if (($sendgrid_api_user == "your_sendgrid_username") || ($sendgrid_api_key == "your_sendgrid_password") || ($decrypted == "fail"))
	{}
	else
		{
			$sendgrid = 				"https://sendgrid.com/api/mail.send.json";
			$sendgrid = $sendgrid . 	"?api_user=" . $sendgrid_api_user;
			$sendgrid = $sendgrid . 	"&api_key=" . $sendgrid_api_key;
			$sendgrid = $sendgrid . 	"&to=" . $e;
			$sendgrid = $sendgrid . 	"&subject=" . urlencode($reset_sendgrid_subject);
			$sendgrid = $sendgrid . 	"&html=" . urlencode($reset_sendgrid_html_before_password . "<br><br>Password: " . $decrypted . "<br><br>" . $reset_sendgrid_html_after_password);
			$sendgrid = $sendgrid . 	"&from=" . $reset_sendgrid_from;
			file_get_contents($sendgrid);
			$answer = "done";
		}
	echo $answer;
  }
?>