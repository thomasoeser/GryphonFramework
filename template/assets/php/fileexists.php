<?php
require_once('gryphonframeworkconfig.php');
require_once('gryphonframework.php');
header('Content-Type: text/html; charset=utf-8');

if (isset($_GET["u"])) {$useraccountid =  $_GET{'u'};}else{$useraccountid = "";}
if (isset($_GET["f"])) {$filename =  $_GET{'f'};}else{$filename = "";}

$regex = "/[^a-z0-9]/i";
$useraccountid = preg_replace($regex,"",$useraccountid);
$regex = "/[^a-z0-9_]/i";
$filename = preg_replace($regex,"",$filename);

$result = "";
if (strlen($useraccountid) < 51)
{
	$a = $GryphonStorageAccount;
	$p = $GryphonStorageProject;
	$u = $useraccountid;
	$url = $GryphonStorageURL . "fileexists.php?a=" . $a . "&p=" . $p . "&u=" . $u . "&f=" . $filename;
	$result = file_get_contents($url);
}
echo trim($result);
?>