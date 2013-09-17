<?php
require_once('gryphonframeworkconfig.php');
require_once('gryphonframework.php');

if (isset($_GET["j"])) {$jauthenticate =  $_GET{'j'};}else{$jauthenticate = "";}
if (isset($_GET["u"])) {$useraccountid =  $_GET{'u'};}else{$useraccountid = "";}
if (isset($_GET["f"])) {$filename =  $_GET{'f'};}else{$filename = "";}

$regex = "/[^a-z0-9\-]/i";
$jauthenticate = preg_replace($regex,"",$jauthenticate);
$regex = "/[^a-z0-9]/i";
$useraccountid = preg_replace($regex,"",$useraccountid);
$regex = "/[^a-z0-9_ ]/i";
$filename = preg_replace($regex,"",$filename);
$regex = "/ /i";
$filename = preg_replace($regex,"_",$filename);
$result = "";
if ((strlen($jauthenticate) < 51) && (strlen($useraccountid) < 51) && (strlen($filename) < 51)) 
{
	$a = $GryphonStorageAccount;
	$j = $jauthenticate;
	$p = $GryphonStorageProject;
	$u = $useraccountid;
	$f = $filename;
	$url = $GryphonStorageURL . "files.php?a=" . $a . "&j=" . $j . "&p=" . $p . "&u=" . $u . "&f=" . $f;
	$result = file_get_contents($url);
}
echo trim($result);
?>