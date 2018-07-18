

// PROBLEM STATEMENT:
/*
1.4 Given a string, write a function to check if it is a permutation of a palindrome.
A palindrome is a word or phrase that is the same forwards and backwards. A permutation
is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

test > 1.4 check if string is a permutation of a palindrome
palinPerm('Tact Coa') == true (Tact Coa is a permutation of a palindrome)
*/

// ASSUMPTIONS:
// space doesn't count
// Case insentitive

// TESTS:
console.log(palinPerm('Tact Coa'), 'true');
console.log(palinPerm('Tact boa'), 'false');

// LOGIC:
/*
First need to think what the function needs to show is true/false to show whether it is a palindrome, 
where order of letters does not matter.
The test needs to prove that the count of every letter is even, with the allowance that one letter 
does not necessarily have to have an even count (as it could be the central letter in the palindrome).
So should create an object and populate it with keys of every letter and values being their count and
then iterate through each letter and check that a maximum of only one letter has an uneven count.
*/


// CODE:

function palinPerm(string) {
	

	// CREATE AND POPULATE OBJECT:
	var charsObj = {}

	string.split('').forEach((char) => {
		char = char.toLowerCase()
		if (char !== ' ') {
			if (charsObj[char] === undefined) {
				charsObj[char] = 1
			} else {
				charsObj[char]++
			}
		}
	})

	// ITERATE THROUGH OBJECT KEYS AND CHECK TAHT AT LEAST ALL BUT ONE HAVE EVEN COUNT
	var unevenCount = 0

	Object.keys(charsObj).forEach((char) => {
		if (charsObj[char] % 2 > 0) {
			if (unevenCount > 0) { //if there has already been one letter occurring unevenly (setting count to 1) and now another then return false. (as can max have one uneven) 
				return false
			} else {
				unevenCount++ // increase count by 1 if the current character is unevenly occurring. The count will at most only ever go from 0 to 1. (As such could replace this with a boolean true/fasle test)
			}
		}
	})
	return true
}