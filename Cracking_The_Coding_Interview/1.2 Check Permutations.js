/*
 * 1.2 Check Permutation. Given two strings, write a method to decide if one is a
 * permutation of the other
 */

// # checkPermutation('nick', 'ickn') == true (nick should be a permutation of ickn)
// # checkPermutation('nice', 'nici') == false (nice shouldnt be permutation of nici)
// # checkPermutation('nice', 'nic') == false (nice shouldnt be permutation of nic)

// test > 1.2a determine if a string is a permutation of the other

// test > 1.2b determine if a string is a permutation of the other in O(n)


console.log(checkPermute('aba', 'aab'), true);
console.log(checkPermute('aba', 'aaba'), false);
console.log(checkPermute('aba', 'aa'), false);

// INITIAL ATTEMPT

function checkPerm (stringOne, stringTwo) {
	if (stringOne.length !== stringTwo.length) {
		return false
	} else {
		var stringOneSorted = stringOne.split('').sort().join('')
		var stringTwoSorted = stringTwo.split('').sort().join('')

		for (var i = 0; i < stringOne.length; i++) {
			if (stringOneSorted[i] !== stringTwoSorted[i]) {
				return false
			}
		}
	}
	return true
}


// BETTER SOLUTION

function checkPerm (stringOne, stringTwo) {
	if (stringOne.length !== stringTwo.length) {
		return false
	} else {
		var stringOneSorted = stringOne.split('').sort().join('')
		var stringTwoSorted = stringTwo.split('').sort().join('')

		return stringOneSorted === stringTwoSorted
	}
}


// FURTHER REDUCED SOLUTION

function checkPerm (stringOne, stringTwo) {
	if (stringOne.length !== stringTwo.length) {
		return false
	} else {
		return stringOne.split('').sort().join('') === stringTwo.split('').sort().join('')
	}
}