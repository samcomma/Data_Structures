// Implement an algorithm to determine if a string has all unique characters. What if you
// can not use additional data structures?

function allUnique(string) {
	for (var i = 0; i < string.length; i++) {
		for (var j = i+1; j < string.length; j++) {
			if (string[i] === string[j]) {
				return false
			}
		} 
	}
	return true
}

// NOTES:

// No additional Data structures used.

// O(n^2)

// 1 LINE EXPLANATION: 
// Iterating through every character in the string and check against 
// remaining characters for duplicates.