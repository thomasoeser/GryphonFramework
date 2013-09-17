<?php
require_once('gryphonframeworkconfig.php');
require_once('gryphonframework.php');
header('Content-Type: text/html; charset=utf-8');

if (isset($_GET["u"])) {$useraccountid =  $_GET{'u'};}else{$useraccountid = "";}

$regex = "/[^a-z0-9]/i";
$useraccountid = preg_replace($regex,"",$useraccountid);
$result = "";
if ((strlen($jauthenticate) < 51) && (strlen($useraccountid) < 51) && (strlen($filename) < 51)) 
{
	$a = $GryphonStorageAccount;
	$p = $GryphonStorageProject;
	$u = $useraccountid;
	$url = $GryphonStorageURL . "signin.php?a=" . $a . "&p=" . $p . "&u=" . $u;
	$result = file_get_contents($url);
}
echo trim($result);
?>