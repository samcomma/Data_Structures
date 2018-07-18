// PROBLEM STATEMENT:
/*
1.9 String Rotation 
-Assume you have a method isSubstring, which checks if one word is a substring of another. 
 Given two strings, s1 and s2, write code to check if st1 is a rotation of s2 using only one 
 call to isSubstring (e.g. "waterbottle" is a rotation of "erbottlewat").
*/

// ASSUMPTIONS:


// TESTS:


// LOGIC:
/*

*/


// CODE:
function stringRotation(string1, string2) {
	if (string1.length !== string2.length) {
		return false
	}
	return (string2 + string2).includes(string1)
}
