<?php
/*
Gryphon Framework: http://gryphonframework.com
Gryphon Storage:   http://gryphonstorage.com
Copyright (c) Furious Gryphon Software, http://furiousgryphon.com
Author: Thomas Oeser

Licensed under The MIT License
-------------------------------------------------------------------------
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function jAuthenticate($username,$password,$salt)
{
	$myRandomNumber = jAuthenticateRandomNumber();
	$key1 =  jAuthenticateHash($myRandomNumber . $salt . $username);
	$key2 =  jAuthenticateHash($myRandomNumber . $salt . $password);
	$key3 =  jAuthenticateHash($myRandomNumber . $salt . $username . $password);
	$key4 =  jAuthenticateHash($salt . $myRandomNumber . $username);
	$key5 =  jAuthenticateHash($salt . $myRandomNumber . $password);
	$key6 =  jAuthenticateHash($salt . $myRandomNumber . $username . $password);
	$key7 =  jAuthenticateHash($username . $salt . $myRandomNumber);
	$key8 =  jAuthenticateHash($password . $salt . $myRandomNumber);
	$key9 =  jAuthenticateHash($username . $password . $salt . $myRandomNumber);		
	$key10 = jAuthenticateHash($myRandomNumber . $username . $password);
	$key1 = substr( $key1, 1 , 10 );
	$key2 = substr( $key2, 2 , 10 );
	$key3 = substr( $key3, 3 , 10 );
	$key4 = substr( $key4, 4 , 10 );
	$key5 = substr( $key5, 5 , 10 );
	$key6 = substr( $key6, 6 , 10 );
	$key7 = substr( $key7, 7 , 10 );
	$key8 = substr( $key8, 8 , 10 );
	$key9 = substr( $key9, 9 , 10 );
	$key10 = substr( $key10, 10 , 10 );
	$challenge = $key1 . $key2 . $key3 . $key4 . $key5 . $key6 . $key7 . $key8 . $key9 . $key10;
	$r1 = $key1;$r1=substr( $r1, $myRandomNumber[0], 1 );
	$r2 = $key2;$r2=substr( $r2, $myRandomNumber[1], 1 );
	$r3 = $key3;$r3=substr( $r3, $myRandomNumber[2], 1 );
	$r4 = $key4;$r4=substr( $r4, $myRandomNumber[3], 1 );
	$r5 = $key5;$r5=substr( $r5, $myRandomNumber[4], 1 );
	$r6 = $key6;$r6=substr( $r6, $myRandomNumber[5], 1 );
	$r7 = $key7;$r7=substr( $r7, $myRandomNumber[6], 1 );
	$r8 = $key8;$r8=substr( $r8, $myRandomNumber[7], 1 );
	$r9 = $key9;$r9=substr( $r9, $myRandomNumber[8], 1 );
	$r10 = $key10;$r10=substr( $r10, $myRandomNumber[9], 1 );
	$randomPassword = $r1 . $r2 . $r3 . $r4 . $r5 . $r6 . $r7 . $r8 . $r9 . $r10;
	$myvalue = valueofstring($username) . "" . valueofstring($password);
	$lastChars = substr($myvalue,-10);
	$myvalue = $lastChars;
	$myReturnValue = $myvalue + $myRandomNumber;
	$answer = $myReturnValue . "-" . $randomPassword . "-" . $salt;
	return $answer;
}

function jAuthenticateHash($mykey)
{
	$mykey = jAuthenticateMakeHash($mykey);
	$mykey1 = jAuthenticateMakeHash($mykey);
	$mykey1 = substr($mykey1,0,10);
	$mykey2 = jAuthenticateMakeHash($mykey1);
	$mykey2 = substr($mykey2,0,11);
	$mykey3 = jAuthenticateMakeHash($mykey2);
	$mykey3 = substr($mykey3,0,11);
	$mykey = $mykey2 . $mykey3 . $mykey1;
	return $mykey;
}

function jAuthenticateMakeHash($str)
{
	$hashNumVal1 = valueofstring($str);
	$hashNumVal2 = valueofstringtwo($str);
	$hashNumVal3 = valueofstringthree($str);
	$hashNumeric = $hashNumVal1 . $hashNumVal2 . $hashNumVal3 . $hashNumVal2 . $hashNumVal3 . $hashNumVal1 . $hashNumVal3 . $hashNumVal1 . $hashNumVal2;
	$value1 = substr( $hashNumeric, (strlen($hashNumeric) - 3) , 2 );
	$value2 = substr( $hashNumeric, (strlen($hashNumeric) - 5) , 2 );
	$value3 = substr( $hashNumeric, (strlen($hashNumeric) - 7) , 2 );
	$value4 = substr( $hashNumeric, (strlen($hashNumeric) - 9) , 2 );
	$value5 = substr( $hashNumeric, (strlen($hashNumeric) - 11) , 2 );
	$value6 = substr( $hashNumeric, (strlen($hashNumeric) - 13) , 2 );
	$value7 = substr( $hashNumeric, (strlen($hashNumeric) - 15) , 2 );
	$value8 = substr( $hashNumeric, (strlen($hashNumeric) - 17) , 2 );
	$value9 = substr( $hashNumeric, (strlen($hashNumeric) - 19) , 2 );
	$value10 = substr( $hashNumeric, (strlen($hashNumeric) - 21) , 2 );
	$value11 = substr( $hashNumeric, (strlen($hashNumeric) - 23) , 2 );
	$value = keyexchange($value1) . keyexchange($value2) . keyexchange($value3) . keyexchange($value4) . keyexchange($value5) . keyexchange($value6) . keyexchange($value7) . keyexchange($value8) . keyexchange($value9) . keyexchange($value10) . keyexchange($value11);
	$value = $value . keyexchange($value4) . keyexchange($value7) . $value  . keyexchange($value2) . $value;
	return $value;
}

function jAuthenticateRandomNumber()
{
	$ranone = mt_rand();
	$rantwo = mt_rand();
	$ranthree = mt_rand();
	$big = $ranone . $rantwo . $ranthree;
	$random = substr($big,-10);
	return $random;
}

function keyexchange($k)
{
		if ($k == "00"){$answer="A";}
		if ($k == "01"){$answer="B";}
		if ($k == "02"){$answer="C";}
		if ($k == "03"){$answer="D";}
		if ($k == "04"){$answer="E";}
		if ($k == "05"){$answer="F";}
		if ($k == "06"){$answer="G";}
		if ($k == "07"){$answer="H";}
		if ($k == "08"){$answer="I";}
		if ($k == "09"){$answer="J";}
		if ($k == "10"){$answer="K";}
		if ($k == "11"){$answer="L";}
		if ($k == "12"){$answer="M";}
		if ($k == "13"){$answer="N";}
		if ($k == "14"){$answer="O";}
		if ($k == "15"){$answer="P";}
		if ($k == "16"){$answer="Q";}
		if ($k == "17"){$answer="R";}
		if ($k == "18"){$answer="S";}
		if ($k == "19"){$answer="T";}
		if ($k == "20"){$answer="U";}
		if ($k == "21"){$answer="V";}
		if ($k == "22"){$answer="W";}
		if ($k == "23"){$answer="X";}
		if ($k == "24"){$answer="Y";}
		if ($k == "25"){$answer="Z";}
		if ($k == "26"){$answer="a";}
		if ($k == "27"){$answer="b";}
		if ($k == "28"){$answer="c";}
		if ($k == "29"){$answer="d";}
		if ($k == "30"){$answer="e";}
		if ($k == "31"){$answer="f";}
		if ($k == "32"){$answer="g";}
		if ($k == "33"){$answer="h";}
		if ($k == "34"){$answer="i";}
		if ($k == "35"){$answer="j";}
		if ($k == "36"){$answer="k";}
		if ($k == "37"){$answer="l";}
		if ($k == "38"){$answer="m";}
		if ($k == "39"){$answer="n";}
		if ($k == "40"){$answer="o";}
		if ($k == "41"){$answer="p";}
		if ($k == "42"){$answer="q";}
		if ($k == "43"){$answer="r";}
		if ($k == "44"){$answer="s";}
		if ($k == "45"){$answer="t";}
		if ($k == "46"){$answer="u";}
		if ($k == "47"){$answer="v";}
		if ($k == "48"){$answer="w";}
		if ($k == "49"){$answer="x";}
		if ($k == "50"){$answer="y";}
		if ($k == "51"){$answer="z";}
		if ($k == "52"){$answer="0";}
		if ($k == "53"){$answer="1";}
		if ($k == "54"){$answer="2";}
		if ($k == "55"){$answer="3";}
		if ($k == "56"){$answer="4";}
		if ($k == "57"){$answer="5";}
		if ($k == "58"){$answer="6";}
		if ($k == "59"){$answer="7";}
		if ($k == "60"){$answer="8";}
		if ($k == "61"){$answer="9";}
		if ($k == "62"){$answer="A";}
		if ($k == "63"){$answer="B";}
		if ($k == "64"){$answer="C";}
		if ($k == "65"){$answer="D";}
		if ($k == "66"){$answer="E";}
		if ($k == "67"){$answer="F";}
		if ($k == "68"){$answer="G";}
		if ($k == "69"){$answer="H";}
		if ($k == "70"){$answer="I";}
		if ($k == "71"){$answer="J";}
		if ($k == "72"){$answer="K";}
		if ($k == "73"){$answer="L";}
		if ($k == "74"){$answer="M";}
		if ($k == "75"){$answer="N";}
		if ($k == "76"){$answer="O";}
		if ($k == "77"){$answer="P";}
		if ($k == "78"){$answer="Q";}
		if ($k == "79"){$answer="R";}
		if ($k == "80"){$answer="S";}
		if ($k == "81"){$answer="T";}
		if ($k == "82"){$answer="U";}
		if ($k == "83"){$answer="V";}
		if ($k == "84"){$answer="W";}
		if ($k == "85"){$answer="X";}
		if ($k == "86"){$answer="Y";}
		if ($k == "87"){$answer="Z";}
		if ($k == "88"){$answer="a";}
		if ($k == "89"){$answer="b";}
		if ($k == "90"){$answer="c";}
		if ($k == "91"){$answer="d";}
		if ($k == "92"){$answer="e";}
		if ($k == "93"){$answer="f";}
		if ($k == "94"){$answer="g";}
		if ($k == "95"){$answer="h";}
		if ($k == "96"){$answer="i";}
		if ($k == "97"){$answer="j";}
		if ($k == "98"){$answer="k";}
		if ($k == "99"){$answer="l";}
		return $answer;
}

function valueofstring($mychar)
{
	$i = 0;
	$total = "";
	$total2 = 0;
	while ($i < strlen($mychar))
		{
			$char = substr( $mychar, $i , 1 );
			$total = $total . ord($char);
			$total2 = $total2 + ord($char);
			$i=$i+1;
		}
		$i = 0;
		$total3 = 0;
        while ($i < strlen($total))
        {
			$char = substr( $total, $i , 1 );
            $total3 = $total3 + $char;
        $i=$i+1;
        }
		$total = ($total2 * $total3);
		return $total;
}

function valueofstringtwo($mychar)
{
	$i = 0;
	$total = "";
	$total2 = 0;
	while ($i < strlen($mychar))
		{
			$char = substr( $mychar, $i , 1 );
			$total = $total . ord($char);
			$total2 = $total2 + ord($char);
			$i=$i+2;
		}
		$i = 0;
		$total3 = 0;
        while ($i < strlen($total))
        {
			$char = substr( $total, $i , 1 );
            $total3 = $total3 + $char;
        $i=$i+1;
        }
		$total = (($total2 * 7) + $total3);
		return $total;
}

 function valueofstringthree($mychar)
{
	$i = 0;
	$total = "";
	$total2 = 0;
	while ($i < strlen($mychar))
		{
			$char = substr( $mychar, $i , 1 );
			$total = $total . ord($char);
			$total2 = $total2 + ord($char);
			$i=$i+3;
		}
		$i = 0;
		$total3 = 0;
        while ($i < strlen($total))
        {
			$char = substr( $total, $i , 1 );
            $total3 = $total3 + $char;
        $i=$i+1;
        }
		$total = (($total2 * 21) - $total3);
		return $total;
}

function characterValue($one)
{
	if ($one == "0") {$fChar = 1;}
	if ($one == "1") {$fChar = 2;}
	if ($one == "2") {$fChar = 3;}
	if ($one == "3") {$fChar = 4;}
	if ($one == "4") {$fChar = 5;}
	if ($one == "5") {$fChar = 6;}
	if ($one == "6") {$fChar = 7;}
	if ($one == "7") {$fChar = 8;}
	if ($one == "8") {$fChar = 9;}
	if ($one == "9") {$fChar = 10;}
	if ($one == "a") {$fChar = 11;}
	if ($one == "b") {$fChar = 12;}
	if ($one == "c") {$fChar = 13;}
	if ($one == "d") {$fChar = 14;}
	if ($one == "e") {$fChar = 15;}
	if ($one == "f") {$fChar = 16;}
	return $fChar; 
}



 
 ?> 
