<?php
require_once('gryphonframeworkconfig.php');
require_once('gryphonframework.php');

if (isset($_POST["j"])) {$jauthenticate =  $_POST{'j'};}else{$jauthenticate = "";}
if (isset($_POST["u"])) {$useraccountid =  $_POST{'u'};}else{$useraccountid = "";}
if (isset($_POST["f"])) {$filename =  $_POST{'f'};}else{$filename = "";}
if (isset($_POST["m"])) {$mode =  $_POST{'m'};}else{$mode = "";}
if (isset($_POST["data"])) {$postdata =  $_POST{'data'};}else{$postdata = "";}

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
	$url = $GryphonStorageURL . "save.php";
	$data = array("a" => $GryphonStorageAccount,"p" => $GryphonStorageProject,"j" => $jauthenticate, "u" => $useraccountid, "f" => $filename, "m" => $mode, "data" => $postdata );
	$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data),
		),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
}
echo trim($result);
?>