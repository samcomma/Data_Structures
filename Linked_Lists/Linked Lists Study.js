// LINKED LISTS
// -----------------------------------------------------------------------------

/*
SINGLE LINKED LIST
------------------------

In computer science, a singly-linked list is a data structure that holds a sequence of linked nodes. 
Each node, in turn, contains data and a pointer, which can point to another node.

A linked list, thus, is nothing more than objects nested deeply inside of each other.
The next property of each node object in the list is a reference to the next node object.
The head is a reference to the first node in the chain. In other words, the head property on the outermost object of the linked list points to first item in the list. 
Each item in the list is accessed through the next property of the item before it.

https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392

To implement a singly-linked list we will define two constructors:
1) Node
2) SinglyList

*/

function Node(data) {
	this.data = data
	this.next = null
}

function SingleList() {
	this.head = null
	this.length = 0
}


/*
Next we will create 3 methods for SinglyList:
1) Add a Node (value)
2) Search for a Node (position)
3) Remove a Node (position)
*/

// ADD A NODE 

// **************** NB THE NODE IS ADDED TO THE END OF THE LINKED LIST ************************

SingleList.prototype.add = function(data) {
	var nodeToAdd = new.Node(data)
	var	currentNode = this.head

	//First Case: empty list
	if (!currentNode) {
		this.head = nodeToAdd
		this.length++

		return nodeToAdd // Coul just return nothing here. Might make more sense as when adding nodes we may not necessarily want to then return the added node.
	}

	//Second Case: non-empty list
	while (currentNode.next) {
		currentNode = currentNode.next
	}
	currentNode.next = nodeToAdd
	this.length++

	return nodeToAdd // Coul just return nothing here. Might make more sense as when adding nodes we may not necessarily want to then return the added node.
};



// SEARCH FOR A NODE

SingleList.prototype.searchNodeAt = function(position) {
	var currentNode = this.head
	var	length = this.length
	var	count = 1
	var	message = {failure: 'Failure: The node does not exist in this list.'}

	// First Case: an invalid position
	if (length === 0 || position < 1 || position > length) {
		throw new Error(message.failure)
	}

	//Second Case: a valid position
	while (count < position) {
		currentNode = currentNode.next
		count++
	}

	return currentNode
};



// REMOVE A NODE


SingleList.prototype.remove = function(position) {
	var currentNode = this.head
	var	length = this.length
	var	count = 0 // count is 0 as opposed to 1 as in searchNodeAt function.
	var	message = {failure: 'Failure: The node does not exist in this list.'}

	var beforeNodeToDelete = null
	var NodeToDelete = null
	var deletedNode = null

	// First Case: an invalid position
	if (position < 0 || position > length) {
		throw new Error(message.failure)
	}

	// Second Case: the first node(head) is removed
	if (position === 1) {
		this.head = currentNode.next
		deletedNode = currentNode
		currentNode = null
		this.length--

		return deletedNode
	}

	// Third Case: any other node is removed
	while (count < position) {
		beforeNodeToDelete = currentNode
		nodeToDelete = currentNode.next
		count++
	}

	beforeNodeToDelete.next = nodeToDelete.next
	deletedNode = nodeToDelete
	nodeToDelete = null
	this.length--

	return deletedNode
};



// ADDITIONAL FUNCTIONS FOR SINGLY LINKED LISTS
// -----------------------------------------------------------------------

// REVERSE A SINGLY LINKED LIST (NO LOOP):

// Quick Line on Method: 
//   - Iterate through linked list with three-pointers previous, current, next.
//   - While iterating at each step reverse the current link’s direction.

// The while loop is the key part to understand here. A little tricky but it is correct.

SingleList.prototype.reverse = function() {

	// Check: If the list isof length one or less, return nothing.
	if(!this.head || !this.head.next) {
		return;
	}

	var current = this.head
	var next = null
	var prev = null

	while (current) {
		next = current.next
		current.next = prev
		prev = current
		current  = next
	}

	this.head = prev
}



// FIND KTH TO LAST ELEMENT OF A SINGLY LINKED LIST:

// Implement a non-recursive algorithm to find the kth to last element of a singly linked list.
// Input : A linked list
// Output : A value of a node in a linked list

// Quick Line on Method: 
//   - Iterate through the list with two pointers p1 , p2.
//   - While iterating at each step reverse the current link’s direction.


// ****************** HAVE DONE ELSEWHERE **************************



// LOOP DETECTION:

// Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.


// PART 1: Detect a loop.
// Logic:
// - If a linked list has a loop then no node has a null as next pointer.
// - A simple loop exists when p1.next.next !== null.
// - While iterating over the linked list we need two pointers, p1 increments 
//   one node at a time and the p2 increments two points at a time. 
//   If both the pointers meet then the loop exists.


SingleList.prototype.hasLoop = function() {

	var p1 = this.head
	var p2 = this.head

	while (p2.next.next) { // While p2 has not reached the end of the list (will never if loop is present)
		p1 = p1.next
		p2 = p2.next.next
		
		if (p1 === p2) {
			return true
		}
	}
	return false
}


// PART 2: Find beginning of loop.
// Logic:
// - Detect the loop.
// - Move p1 at the head of the linked list, and keep p2 at the same location where p1 and p2 met.
// - Move p1, p2 one step at a time, when they will meet again it’s the beginning of the loop.

// ******* THIS DOES PART ONE ABOVE AS PART OF FUNCTION AND IF LOOP IS PRESENT THEN IT BREAKS FROM WHILE LOOP AND DETECTS BEGINNING OF LOOP (AS OPPOSED TO RETURNING TRUE)

SingleList.prototype.loopBeginning = function() {

	var p1 = this.head
	var p2 = this.head
	var isLoop

	while (p2.next.next) { // While p2 has not reached the end of the list (will never if loop is present)
		p1 = p1.next
		p2 = p2.next.next
		
		if (p1 === p2) {
			isLoop = true
			break
		}
	}
	
	// Detect beginning of loop.
	if (isLoop) {
		p1 = this.head
	
		while (p1 !== p2) {
			p1 = p1.next
			p2 = p2.next
		}
		return p1
	} else { 
		return;
	}

}


// PART 3: Find beginning of loop.
// Logic:
//  - Detect the loop.
//  - Move p2 one step at a time keeping p1 at a fixed location.
//  - Use a loopLength variable to keep track of loop length.
//  - When p1 === p2 return the loopLength.


SingleList.prototype.loopLength = function() {

	var p1 = this.head
	var p2 = this.head
	var isLoop
	var loopLength = 1

	while (p2.next.next) { // While p2 has not reached the end of the list (will never if loop is present)
		p1 = p1.next
		p2 = p2.next.next
		
		if (p1 === p2) {
			isLoop = true
			break
		}
	}

	if (isLoop) {
		p2 = p2.next
		while (p1 !== p2) {
			loopLength++
			p2 = p2.next
		}
		return loopLength
	} else {
		return 0
	}

}



// PARTITION A LINKED LIST AROUND A CHOSEN VALUE:

// Write code to partition a linked list around a value val, such that all nodes less than val come before all nodes greater than or equal to val.
// Input : A linked list
// Output : A linked list

// Logic:
// - Create two linked list: one for beforeVal and afterVal.
// - Iterate through the list and:
//     - Add nodes to beforeVal if its less than val.
//     - Add nodes to afterVal if its greater than val.
// - Merge two linked lists.

SingleList.prototype.partitionLinkedList = function(val) {
 	
 	var beforeVal = new SingleList()
 	var afterVal = new SingleList()
 	var p1 = this.head

 	while(p1) {
 		if (p1.data < val) {
 			beforeVal.add(p1.data)
 		} else if (p1.data >= val) {
 			afterVal.add(p1.data)
 		}
 		p1 = p1.next
 	}
 	// merge beforeVal and afterVal Linked Lists
 	var p2 = beforeVal.head

 	while (p2.next) { // get p2 to reach the end of beforeVal list
 		p2 = p2.next 
 	}
 	p2.next = afterVal.head // attach afterVal to the end of beforeVal

 	return beforeVal // returns beforeVal which now has afterVal attached to its end.
}




// MERGE TWO SORTED LINKED LISTS:

// e.g.:
// Given list l1 = 1->2->3. And list l2 = 10->20->30. Generate a new list mergedList = 1->2->3->10->20->30.
// Given list l1 = 1->3->4. And list l2 = 1->2->3. Generate a new list mergedList = 1->2->3->3->4.

// **************** THIS FUNCTION IS BETTER TO BE DONE BY NOT ATTACHING IT TO THE LINKED LIST .prototype AS THERE WILL BE TWO LINKED LISTS PASSED IN AS ARGUMENTS.


function mergeTwoSortedLinkedLists (list1, list2) {
	// Create dummy node to get started.
	var mergedLinkedListHead = {data: -1, next: null} // I think I could just do = Node{-1} here because of my node constructor function. But for clarity I will show this. Not sure why -1 is chosen.
	var runner = mergedLinkedListHead

	while (list1 && list2) {
		if (list1.data > list2.data) {
			runner.next = list2
			list2 = list2.next
		} else {
			runner.next = list1
			list1 = list1.next
		}

		runner = runner.next
	}
	// once one of the lists reaches its end the while loop will break.
	// We know, due to the way the two sorted lists have been traversed, that all remaining values left in the list that has not reached its 
	// end are sorted and the values left are greater than all values already put in the merged list.
	// Thus, we point the runner to the remaining list. We do not have to add individual nodes.
	runner.next = list1 || list2

	return mergedLinkedListHead.next
}


// REVERSE A DOUBLY LINKED LIST (NO LOOP):

// Here is a simple method for reversing a Doubly Linked List. 
// All we need to do is swap prev and next pointers for all nodes, 
// change prev of the head (or start) and change the head pointer in the end.



// ************** NO SOLUTION YET ***********************



/*
DOUBLE LINKED LIST
------------------------

A doubly-linked list takes all the functionality of a singly-linked list and extends it for bi-directional movement 
in a list. We can traverse, in other words, a linked list from the first node in the list to the last node in the 
list; and we can traverse from the last node in the list to the first node in the list. 

To implement a doubly-linked list we will again define two constructors that are slightly different than 
for singly-linked lists:
1) Node
2) DoublyList
*/


function Node(data) {
	this.data = data
	this.previous = null
	this.next = null

}

function DoublyList() {
	this._length = 0
	this.head = null
	this.tail = null
}

/*
Next we will create 3 methods for DoublyList, methods 1) and 3) are different, method 2) is the 
same as for Singly-Linked List:
1) Add a Node (value)
2) Search for a Node (position)
3) Remove a Node (position)
*/

// ADD A NODE

DoublyList.prototype.add = function(value) {
	var node = new.Node(value)

	
	if (this._length) {
		this.tail.next = node
		node.previous = this.tail
		this.tail = node
	} else {
		this.head = node
		this.tail = node
	}

	
	this._length++

	return node
};



// SEARCH FOR A NODE

DoublyList.prototype.searchNodeAt = function(position) {
	var currentNode = this.head
	var	length = this._length
	var	count = 1
	var	message = {failure: 'Failure: The node does not exist in this list.'}

	// First Case: an invalid position
	if (length === 0 || position < 1 || position > length) {
		throw new Error(message.failure)
	}

	//Second Case: a valid position
	while (count < position) {
		currentNode = currentNode.next
		count++
	}

	return currentNode
};



// REMOVE A NODE


DoublyList.prototype.remove = function(position) {
	var currentNode = this.head
	var	length = this._length
	var	count = 1 // count is 1 as opposed to 0 as in SinglyList remove function.
	var	message = {failure: 'Failure: The node does not exist in this list.'}

	var beforeNodeToDelete = null
	var afterNodeToDelete = null
	var NodeToDelete = null
	var deletedNode = null

	// First Case: an invalid position
	if (length === 0 || position < 0 || position > length) {
		throw new Error(message.failure)
	}

	// Second Case: the first node(head) is removed
	if (position === 1) {
		this.head = currentNode.next

		// Second Case (1): there is a second node
		if (!this.head) {
			this.head.previous = null
		// Second Case (2): there is a second node
		} else {
			this.tail = null
		}
	// Third Case: the last node is removed
	} else if (position === this._length) {
		this.tail = this.tail.previous
		this.tail.next = null
	// Fourth Case: a middle node is removed
	} else {
		while (count < position) {
			currentNode = currentNode.next
			count++
		}
		
		beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;
 
        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
	}

	this._length--

	return deletedNode
};
