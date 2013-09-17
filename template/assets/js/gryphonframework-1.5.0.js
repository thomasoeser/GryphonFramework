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

var jAuthenticate = {
    key: function (username,password,salt) 
	{
		var myRandomNumber = jAuthenticateRandomNumber() + "";
			var key1 = jAuthenticateHash(myRandomNumber + salt + username);
			var key2 = jAuthenticateHash(myRandomNumber + salt + password);
			var key3 = jAuthenticateHash(myRandomNumber + salt + username + password);
			var key4 = jAuthenticateHash(salt + myRandomNumber + username);
			var key5 = jAuthenticateHash(salt + myRandomNumber + password);
			var key6 = jAuthenticateHash(salt + myRandomNumber + username + password);
			var key7 = jAuthenticateHash(username + salt + myRandomNumber);
			var key8 = jAuthenticateHash(password + salt + myRandomNumber);
			var key9 = jAuthenticateHash(username + password + salt + myRandomNumber);
			var key10 = jAuthenticateHash(myRandomNumber + username + password);
			key1 = key1.slice(1,11);
			key2 = key2.slice(2,12);
			key3 = key3.slice(3,13);
			key4 = key4.slice(4,14);
			key5 = key5.slice(5,15);
			key6 = key6.slice(6,16);
			key7 = key7.slice(7,17);
			key8 = key8.slice(8,18);
			key9 = key9.slice(9,19);
			key10 = key10.slice(10,20);
			var challenge = key1 + key2 + key3 + key4 + key5 + key6 + key7 + key8 + key9 + key10;
			challenge = jAuthenticateSplitStringAtInterval(challenge,10);
			var r1 = myRandomNumber.charAt(0);var r2 = myRandomNumber.charAt(1);var r3 = myRandomNumber.charAt(2);
			var r4 = myRandomNumber.charAt(3);var r5 = myRandomNumber.charAt(4);var r6 = myRandomNumber.charAt(5);
			var r7 = myRandomNumber.charAt(6);var r8 = myRandomNumber.charAt(7);var r9 = myRandomNumber.charAt(8);
			var r10 = myRandomNumber.charAt(9);			
			var randomPassword = challenge[0].charAt(r1)+challenge[1].charAt(r2)+challenge[2].charAt(r3)+challenge[3].charAt(r4)+challenge[4].charAt(r5)+challenge[5].charAt(r6)+challenge[6].charAt(r7)+challenge[7].charAt(r8)+challenge[8].charAt(r9)+challenge[9].charAt(r10);	
			var myvalue = jAuthenticateValueOfString(username) + "" + jAuthenticateValueOfString(password);
			var lastChars = myvalue.substring(myvalue.length - 10, myvalue.length)
			myvalue = lastChars;
			var myReturnValue = eval (myvalue) + eval(myRandomNumber);
        return  myReturnValue + "-" + randomPassword + "-" + salt;  
    }
};
function jAuthenticateSendWith(salt)
{
	var ts = new Date().getTime();
	var username = document.getElementById('username').value.trim();
	var password = document.getElementById('password').value.trim();
	return jAuthenticateKey.make(username,password,salt);	
}
function jAuthenticateRandomNumber()
{
	var random1 = Math.random() + "";
	var random1b = Math.random() + "";
	var random2 = random1.slice(2);
	var random2b = random1b.slice(2);
	var random3 = random2 + random2b;
	var random = random3.slice(0,10);
	return random;
}
function jAuthenticateSplitStringAtInterval (string, interval)
{
	var result = [];
	for (var i=0; i<string.length; i+=interval)
	result.push(string.substring (i, i+interval));
	return result;
}
function jAuthenticateValueOfString(mychar)
{
	mychar = mychar + " ";mychar = mychar.trim();
	var i = 0;
	var total = "";
	var total2 = 0;
	while (i < mychar.length)
	{
		total = total + mychar.charCodeAt(i);
		total2 = eval(total2) + eval(mychar.charCodeAt(i));
	i=i+1;
	}
	i = 0;
	var total3 = 0;
	total = total + " ";
	total = total.trim();
	while (i < total.length)
	{
		total3 = (eval(total3) + eval(total.charAt(i)));
	i=i+1;
	}
	total = (eval(total2) * eval(total3));
	return total;
}
function jAuthenticateValueOfStringTwo(str)
{
	str = str + " ";str = str.trim();
	var i = 0;
	var total = "";
	var total2 = 0;
	while (i < str.length)
	{
		total = total + str.charCodeAt(i);
		total2 = eval(total2) + eval(str.charCodeAt(i));
	i=i+2;
	}
	i = 0;
	var total3 = 0;
	total = total + " ";
	total = total.trim();
	while (i < total.length)
	{
		total3 = (eval(total3) + eval(total.charAt(i)));
	i=i+1;
	}
	total = ((eval(total2) * 7) +  eval(total3));
	return total;
}
function jAuthenticateValueOfStringThree(str)
{
	str = str + " ";str = str.trim();
	var i = 0;
	var total = "";
	var total2 = 0;
	while (i < str.length)
	{
		total = total + str.charCodeAt(i);
		total2 = eval(total2) + eval(str.charCodeAt(i));
	i=i+3;
	}
	i = 0;
	var total3 = 0;
	total = total + " ";
	total = total.trim();
	while (i < total.length)
	{
		total3 = (eval(total3) + eval(total.charAt(i)));
	i=i+1;
	}
	total = ((eval(total2) * 21) -  eval(total3));
	return total;
}
function jAuthenticateHash(str)
{
 	var mykey = str;
	mykey = jAuthenticateMakeHash(mykey);
	mykey1 = jAuthenticateMakeHash(mykey);
    mykey1 = mykey1.substring(0,10);
	var mykey2 = jAuthenticateMakeHash(mykey1);
	mykey2 = mykey2.substring(0,11);
	var mykey3 = jAuthenticateMakeHash(mykey2);
	mykey3 = mykey3.substring(0,11);
	mykey = mykey2 + mykey3 + mykey1;	
	return mykey;
}
function jAuthenticateMakeHash(str)
{
	var val1 = jAuthenticateValueOfString(str);
	var val2 = jAuthenticateValueOfStringTwo(str);
	var val3 = jAuthenticateValueOfStringThree(str);
	var hashNumeric = val1+""+val2+""+val3+""+val2+""+val3+""+val1+""+val3+""+val1+""+val2;
	var value1 = hashNumeric.charAt(hashNumeric.length-3) + hashNumeric.charAt(hashNumeric.length-2);
	var value2 = hashNumeric.charAt(hashNumeric.length-5) + hashNumeric.charAt(hashNumeric.length-4);
	var value3 = hashNumeric.charAt(hashNumeric.length-7) + hashNumeric.charAt(hashNumeric.length-6);
	var value4 = hashNumeric.charAt(hashNumeric.length-9) + hashNumeric.charAt(hashNumeric.length-8);
	var value5 = hashNumeric.charAt(hashNumeric.length-11) + hashNumeric.charAt(hashNumeric.length-10);
	var value6 = hashNumeric.charAt(hashNumeric.length-13) + hashNumeric.charAt(hashNumeric.length-12);
	var value7 = hashNumeric.charAt(hashNumeric.length-15) + hashNumeric.charAt(hashNumeric.length-14);
	var value8 = hashNumeric.charAt(hashNumeric.length-17) + hashNumeric.charAt(hashNumeric.length-16);
	var value9 = hashNumeric.charAt(hashNumeric.length-19) + hashNumeric.charAt(hashNumeric.length-18);
	var value10 = hashNumeric.charAt(hashNumeric.length-21) + hashNumeric.charAt(hashNumeric.length-20);
	var value11 = hashNumeric.charAt(hashNumeric.length-23) + hashNumeric.charAt(hashNumeric.length-22);
	
	var value = keyexchange(value1) + keyexchange(value2) + keyexchange(value3) + keyexchange(value4) + keyexchange(value5) + keyexchange(value6) + keyexchange(value7) + keyexchange(value8) + keyexchange(value9) + keyexchange(value10) + keyexchange(value11);
	value = value  + keyexchange(value4) + keyexchange(value7) + value  + keyexchange(value2) + value;
	
	
	return value;
}
function keyexchange(keynum)
{
	var answer = "";
	if (keynum == "00"){answer="A";}
	if (keynum == "01"){answer="B";}
	if (keynum == "02"){answer="C";}
	if (keynum == "03"){answer="D";}
	if (keynum == "04"){answer="E";}
	if (keynum == "05"){answer="F";}
	if (keynum == "06"){answer="G";}
	if (keynum == "07"){answer="H";}
	if (keynum == "08"){answer="I";}
	if (keynum == "09"){answer="J";}
	if (keynum == "10"){answer="K";}
	if (keynum == "11"){answer="L";}
	if (keynum == "12"){answer="M";}
	if (keynum == "13"){answer="N";}
	if (keynum == "14"){answer="O";}
	if (keynum == "15"){answer="P";}
	if (keynum == "16"){answer="Q";}
	if (keynum == "17"){answer="R";}
	if (keynum == "18"){answer="S";}
	if (keynum == "19"){answer="T";}
	if (keynum == "20"){answer="U";}
	if (keynum == "21"){answer="V";}
	if (keynum == "22"){answer="W";}
	if (keynum == "23"){answer="X";}
	if (keynum == "24"){answer="Y";}
	if (keynum == "25"){answer="Z";}
	if (keynum == "26"){answer="a";}
	if (keynum == "27"){answer="b";}
	if (keynum == "28"){answer="c";}
	if (keynum == "29"){answer="d";}
	if (keynum == "30"){answer="e";}
	if (keynum == "31"){answer="f";}
	if (keynum == "32"){answer="g";}
	if (keynum == "33"){answer="h";}
	if (keynum == "34"){answer="i";}
	if (keynum == "35"){answer="j";}
	if (keynum == "36"){answer="k";}
	if (keynum == "37"){answer="l";}
	if (keynum == "38"){answer="m";}
	if (keynum == "39"){answer="n";}
	if (keynum == "40"){answer="o";}
	if (keynum == "41"){answer="p";}
	if (keynum == "42"){answer="q";}
	if (keynum == "43"){answer="r";}
	if (keynum == "44"){answer="s";}
	if (keynum == "45"){answer="t";}
	if (keynum == "46"){answer="u";}
	if (keynum == "47"){answer="v";}
	if (keynum == "48"){answer="w";}
	if (keynum == "49"){answer="x";}
	if (keynum == "50"){answer="y";}
	if (keynum == "51"){answer="z";}
	if (keynum == "52"){answer="0";}
	if (keynum == "53"){answer="1";}
	if (keynum == "54"){answer="2";}
	if (keynum == "55"){answer="3";}
	if (keynum == "56"){answer="4";}
	if (keynum == "57"){answer="5";}
	if (keynum == "58"){answer="6";}
	if (keynum == "59"){answer="7";}
	if (keynum == "60"){answer="8";}
	if (keynum == "61"){answer="9";}
	if (keynum == "62"){answer="A";}
	if (keynum == "63"){answer="B";}
	if (keynum == "64"){answer="C";}
	if (keynum == "65"){answer="D";}
	if (keynum == "66"){answer="E";}
	if (keynum == "67"){answer="F";}
	if (keynum == "68"){answer="G";}
	if (keynum == "69"){answer="H";}
	if (keynum == "70"){answer="I";}
	if (keynum == "71"){answer="J";}
	if (keynum == "72"){answer="K";}
	if (keynum == "73"){answer="L";}
	if (keynum == "74"){answer="M";}
	if (keynum == "75"){answer="N";}
	if (keynum == "76"){answer="O";}
	if (keynum == "77"){answer="P";}
	if (keynum == "78"){answer="Q";}
	if (keynum == "79"){answer="R";}
	if (keynum == "80"){answer="S";}
	if (keynum == "81"){answer="T";}
	if (keynum == "82"){answer="U";}
	if (keynum == "83"){answer="V";}
	if (keynum == "84"){answer="W";}
	if (keynum == "85"){answer="X";}
	if (keynum == "86"){answer="Y";}
	if (keynum == "87"){answer="Z";}
	if (keynum == "88"){answer="a";}
	if (keynum == "89"){answer="b";}
	if (keynum == "90"){answer="c";}
	if (keynum == "91"){answer="d";}
	if (keynum == "92"){answer="e";}
	if (keynum == "93"){answer="f";}
	if (keynum == "94"){answer="g";}
	if (keynum == "95"){answer="h";}
	if (keynum == "96"){answer="i";}
	if (keynum == "97"){answer="j";}
	if (keynum == "98"){answer="k";}
	if (keynum == "99"){answer="l";}
	return answer;
}


function days()
{
	var Date1 = new Date (2013, 1, 1);
	var Date2 = new Date (Date.now());
	var Days = Math.floor((Date2.getTime() - Date1.getTime())/(1000*60*60*24));
	if (Days < 0) {Days = 1;}
	return Days;
}
function userHash()
{
	var username = $.trim(document.getElementById('username').value);
	var password = $.trim(document.getElementById('password').value);
	var hash = CryptoJS.SHA256(username + password);
	hash = hash + "";
	var myHash = hash.slice(-8);	
	hash = CryptoJS.SHA256(username + password + myHash);
	hash = hash + "";
	myHash = hash.slice(-16);
	myHash = reHash(myHash);
	return myHash;
}

function reHash(hash)
{
	var parts = hash.match(/[\s\S]{1,2}/g) || [];
	var i = 0;
	var newHash= "";
	while (i < parts.length)
	{
		newHash = newHash + reHashChars(parts[i]) + "";
	i++;
	}
	return newHash;
}
function reHashChars(chars)
{
	var fChar = 0;var sChar = 0;
	if (chars[0] == "0") {fChar = 1;}
	if (chars[0] == "1") {fChar = 2;}
	if (chars[0] == "2") {fChar = 3;}
	if (chars[0] == "3") {fChar = 4;}
	if (chars[0] == "4") {fChar = 5;}
	if (chars[0] == "5") {fChar = 6;}
	if (chars[0] == "6") {fChar = 7;}
	if (chars[0] == "7") {fChar = 8;}
	if (chars[0] == "8") {fChar = 9;}
	if (chars[0] == "9") {fChar = 10;}
	if (chars[0] == "a") {fChar = 11;}
	if (chars[0] == "b") {fChar = 12;}
	if (chars[0] == "c") {fChar = 13;}
	if (chars[0] == "d") {fChar = 14;}
	if (chars[0] == "e") {fChar = 15;}
	if (chars[0] == "f") {fChar = 16;}
	if (chars[1] == "f") {sChar = 1;}
	if (chars[1] == "e") {sChar = 2;}
	if (chars[1] == "d") {sChar = 3;}
	if (chars[1] == "c") {sChar = 4;}
	if (chars[1] == "b") {sChar = 5;}
	if (chars[1] == "a") {sChar = 6;}
	if (chars[1] == "9") {sChar = 7;}
	if (chars[1] == "8") {sChar = 8;}
	if (chars[1] == "7") {sChar = 9;}
	if (chars[1] == "6") {sChar = 10;}
	if (chars[1] == "5") {sChar = 11;}
	if (chars[1] == "4") {sChar = 12;}
	if (chars[1] == "3") {sChar = 13;}
	if (chars[1] == "2") {sChar = 14;}
	if (chars[1] == "1") {sChar = 15;}
	if (chars[1] == "0") {sChar = 16;}
	var charValue = eval(fChar) * eval(sChar);
	if ((charValue > 0) && (charValue < 8)) 	{charValue = "0";}
	if ((charValue > 7) && (charValue < 16)) 	{charValue = "1";}
	if ((charValue > 15) && (charValue < 24)) 	{charValue = "2";}
	if ((charValue > 23) && (charValue < 32)) 	{charValue = "3";}
	if ((charValue > 31) && (charValue < 40)) 	{charValue = "4";}
	if ((charValue > 39) && (charValue < 48)) 	{charValue = "5";}
	if ((charValue > 47) && (charValue < 56)) 	{charValue = "6";}
	if ((charValue > 55) && (charValue < 64)) 	{charValue = "7";}
	if ((charValue > 63) && (charValue < 72)) 	{charValue = "8";}
	if ((charValue > 71) && (charValue < 80)) 	{charValue = "9";}
	if ((charValue > 79) && (charValue < 88)) 	{charValue = "a";}
	if ((charValue > 87) && (charValue < 96)) 	{charValue = "b";}
	if ((charValue > 95) && (charValue < 104)) 	{charValue = "c";}
	if ((charValue > 103) && (charValue < 112)) {charValue = "x";}
	if ((charValue > 111) && (charValue < 120)) {charValue = "y";}
	if ((charValue > 119) && (charValue < 128)) {charValue = "z";}
	if ((charValue > 127) && (charValue < 136)) {charValue = "g";}
	if ((charValue > 135) && (charValue < 144)) {charValue = "h";}
	if ((charValue > 143) && (charValue < 152)) {charValue = "i";}
	if ((charValue > 151) && (charValue < 160)) {charValue = "j";}
	if ((charValue > 159) && (charValue < 168)) {charValue = "k";}
	if ((charValue > 167) && (charValue < 176)) {charValue = "l";}
	if ((charValue > 175) && (charValue < 184)) {charValue = "m";}
	if ((charValue > 183) && (charValue < 192)) {charValue = "n";}
	if ((charValue > 191) && (charValue < 200)) {charValue = "o";}
	if ((charValue > 199) && (charValue < 208)) {charValue = "p";}
	if ((charValue > 207) && (charValue < 216)) {charValue = "q";}
	if ((charValue > 215) && (charValue < 224)) {charValue = "r";}
	if ((charValue > 223) && (charValue < 232)) {charValue = "s";}
	if ((charValue > 231) && (charValue < 240)) {charValue = "t";}
	if ((charValue > 239) && (charValue < 248)) {charValue = "u";}
	if ((charValue > 247) && (charValue < 256)) {charValue = "v";}
	return charValue;
}
function IsEmail(email)
{
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function save(filename,data)
{
	var username = $.trim(document.getElementById('username').value);
	var password = $.trim(document.getElementById('password').value);	
	var hash = userHash();
	var jAuthenticateHash = jAuthenticate.key(username,password,days());
	var ts = new Date().getTime();
	var webreq = "assets/php/save.php?ts=" + ts;	
	$.post(webreq, {j: jAuthenticateHash, u: hash, f: filename, data: data })
	.done(function(fncdata){
		if ($.trim(fncdata) == "gs:saved")
			{
				saveFileDone(filename);
			}
		else
			{
				$.post(webreq, {j: jAuthenticateHash, u: hash, f: filename, data: data })
				.done(function(fncdata)
				{
					if ($.trim(fncdata) == "gs:saved")
						{
							saveFileDone(filename);
						}
					else{
							saveFileError(filename);
						}
				});
			}
	});
}
function append(filename,data)
{
	var username = $.trim(document.getElementById('username').value);
	var password = $.trim(document.getElementById('password').value);	
	var hash = userHash();
	var jAuthenticateHash = jAuthenticate.key(username,password,days());
	var ts = new Date().getTime();
	var webreq = "assets/php/save.php?ts=" + ts;	
	$.post(webreq, {j: jAuthenticateHash, u: hash, f: filename, m: "a", data: data })
	.done(function(fncdata){
		if ($.trim(fncdata) == "gs:saved")
			{
				appendFileDone(filename);
			}
		else
			{
				$.post(webreq, {j: jAuthenticateHash, u: hash, f: filename, m: "a", data: data })
				.done(function(fncdata)
				{
					if ($.trim(fncdata) == "gs:saved")
						{
							appendFileDone(filename);
						}
					else{
							appendFileError(filename);
						}
				});
			}
	});
}
function load(filename)
{
	var username = $.trim(document.getElementById('username').value);
	var password = $.trim(document.getElementById('password').value);	
	var hash = userHash();
	var jAuthenticateHash = jAuthenticate.key(username,password,days());
	var ts = new Date().getTime();
	var webreq = "assets/php/load.php?ts=" + ts;
		webreq = webreq + "&j=" + jAuthenticateHash;
		webreq = webreq + "&u=" + hash;
		webreq = webreq + "&f=" + filename;
		$.get(webreq, function(data)
		{
					if ($.trim(data) != "gs:error")
						{
							loadFileDone(filename, $.trim(data));
						}
					else
						{
							$.get(webreq, function(data)
							{
								if ($.trim(data) != "gs:error")
									{
										loadFileDone(filename, $.trim(data));
									}
								else
									{
										loadFileError(filename);
									}
							});
						}
		});
}
function del(filename)
{
	var username = $.trim(document.getElementById('username').value);
	var password = $.trim(document.getElementById('password').value);	
	var hash = userHash();
	var jAuthenticateHash = jAuthenticate.key(username,password,days());
	var ts = new Date().getTime();
	var webreq = "assets/php/delete.php?ts=" + ts;
		webreq = webreq + "&j=" + jAuthenticateHash;
		webreq = webreq + "&u=" + hash;
		webreq = webreq + "&f=" + filename;
		$.get(webreq, function(data)
		{
					if ($.trim(data) != "gs:error")
						{
							delFileDone(filename, $.trim(data));
						}
					else
						{
							$.get(webreq, function(data)
							{
								if ($.trim(data) != "gs:error")
									{
										delFileDone(filename, $.trim(data));
									}
								else
									{
										delFileError(filename);
									}
							});
						}
		});
}
function files(filename)
{
	var username = $.trim(document.getElementById('username').value);
	var password = $.trim(document.getElementById('password').value);	
	var hash = userHash();
	var jAuthenticateHash = jAuthenticate.key(username,password,days());
	var ts = new Date().getTime();
	var webreq = "assets/php/files.php?ts=" + ts;
		webreq = webreq + "&j=" + jAuthenticateHash;
		webreq = webreq + "&u=" + hash;
		if(typeof filename!='undefined')
			{
			   webreq = webreq + "&f=" + filename;
			}
			else
			{
				var filename = "";
			}
		$.get(webreq, function(data)
		{
			if ($.trim(data) != "gs:error")
				{
					filesDirDone(filename, $.trim(data));
				}
			else
				{
					$.get(webreq, function(data)
					{
						if ($.trim(data) != "gs:error")
							{
								filesDirDone(filename, $.trim(data));
							}
						else
							{
								filesDirError(filename);
							}
					});
				}
		});
}
function signin()
{
	var username = $.trim(document.getElementById('username').value);
	var password = $.trim(document.getElementById('password').value);
    if ((IsEmail(username) == true) && (password.length > 0))
	{
		var hash = userHash();
		var ts = new Date().getTime();
		var webreq = "assets/php/signin.php?ts=" + ts;
			webreq = webreq + "&u=" + hash;
			$.get(webreq, function(data)
			{
						if ($.trim(data) != "gs:error")
							{
								signinDone($.trim(data));
							}
						else
							{
								signinError();
							}
			});
	}
	else
	{
		signinError();
	}
}
function signup()
{
	var email = $.trim(document.getElementById('email').value);
	if (IsEmail(email) == true)
	{
		var ts = new Date().getTime();
		var webreq = "assets/php/signup.php?ts=" + ts;
			webreq = webreq + "&email=" + email;
			$.get(webreq, function(data)
			{
				signupDone($.trim(data));
			});
	}
	else
	{
		signupError();
	}
}
function resetPassword()
{
	var email = $.trim(document.getElementById('reset').value);
	if (IsEmail(email) == true)
	{
		var ts = new Date().getTime();
		var webreq = "assets/php/reset.php?ts=" + ts;
			webreq = webreq + "&email=" + email;
			$.get(webreq, function(data)
			{
				resetPasswordDone($.trim(data));
			});
	}
	else{
		resetPasswordError()
	}
}
