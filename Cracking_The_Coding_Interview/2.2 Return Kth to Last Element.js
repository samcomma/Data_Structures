/*
Problem 2.2: Implement an algorithm to find the kth to last element of a singly linked list.

Learn to do this for doubly linked lists also.
*/

/* 
APPROACH
	Create a function which takes the Head of list as well as the chosen k number 
	where if k = 1 then the last element of the list is returned and so on.	

	The solution your interviewer is likely after is to have two pointers; one that starts iterating 
	through the list immediately, and one that is delayed kk times before iterating. Once the first 
	pointer reaches the end, the second pointer will either be the kkth last element, or it will not 
	be initialised, meaning that the list was not of sufficient length.

	Then perhaps improve to a recursive method.
*/


// SOLUTION

function kthToLast(head, k) {
	// Part 1: If there is no head value to the linked list, hence no list, or the k entry is invalid.
	if (k < 1 || !head) {
		return;
	}

	// Part 2: Just move the leading iterator forward the same number of nodes as the k provided.
	//			If the leading iterator reaches the end of the list before the second iterator starts 
	// 			then return nothing as the k value is thus invalid.
	var current = head
	var kBehindCurrent = head

	for (var i = 0; i < k - 1; i++) {
		current = current.next
		if (!current) {
			return;
		}
	}

	// Part 3: Move both iterators through the list until the leading iterator reaches the end of the list, 
	//			thanks to Part 2 this ensures that the trailing iterator is at the kth last element.
	//			Return the current value of the trailing iterator.
	while (current.next !== undefined) {
		kBehindCurrent = kBehindCurrent.next
		current = current.next
	}

	return kBehindCurrent
}



// RECURSIVE SOLUTION


// *** NOT CORRECT ***
function kthToLast(head, k) {

	if (k < 1 || !head) {
		return;
	} else if (k === 1) {
		console.log(head.value)
		kthToLast(k, head.next)
	} else {
		kthToLast(head.next, k-1)
	}



}



// TESTS

function linkedList(value) {
	this.value = value
	this.next = null
}

var a = new linkedList('1');
var b = new linkedList('2');
var c = new linkedList('3');
var d = new linkedList('4');
var e = new linkedList('5');
var f = new linkedList('6');
var g = new linkedList('7');

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = g;

findKthToLast(3, a);

findKthToLast(10, a);

findKthToLast(-1, a);

findKthToLast(0, a);

findKthToLast(1, a);


/* NOTES
	Since there are a constant amount of pointers iterating through the list a single time, 
	the complexity is O(n)O(n).
*/