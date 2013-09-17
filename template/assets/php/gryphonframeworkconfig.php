<?php
	date_default_timezone_set('UTC');
	
	# gryphonstorage.com || credentials
	$GryphonStorageAccount = "your_GryphonStorage_account";
	$GryphonStorageUsername = "your_GryphonStorage_username";
	$GryphonStoragePassword = "your_GryphonStorage_password";
	$GryphonStorageProject = "your_GryphonStorage_project";
	$GryphonStorageSalt = salt();
	$GryphonStorageURL = "http://gryphonstorage.com/php/";
	
	# sendgrid.com || credentials
	$sendgrid_api_user = "your_sendgrid_username";
	$sendgrid_api_key = "your_sendgrid_password";

		# Signup 
		$signup_sendgrid_subject = "YOUR PROJECT - Signup";
		$signup_sendgrid_from = "from@example.com";
		$signup_sendgrid_html_before_password = "Thank you for signing up to YOUR PROJECT.";
		$signup_sendgrid_html_after_password = "";
		
		# Reset Password 
		$reset_sendgrid_subject = "Your project - Password reset";	
		$reset_sendgrid_from = "from@example.com";
		$reset_sendgrid_html_before_password = "Your password has been reset. Your new password is:";
		$reset_sendgrid_html_after_password = "";
	
	
function salt()
{
     $now = time();
     $startDate = strtotime("1 January 2013");
     $dateDiff = $now - $startDate;
     return floor($dateDiff/(60*60*24));
}

?>