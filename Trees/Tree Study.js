// TREES
// -----------------------------------------------------------------------------

/*
In computer science, a tree is a data structure that simulates hierarchical data with nodes. 
Each node of a tree holds its own data and pointers to other nodes.



BINARY TREES
------------------------
A Binary Tree is one of the most typical tree structure. As the name suggests, 
a binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.



2 TYPES OF TREES
------------------------
1) Depth-First Search (DFS) Trees 
2) Breadth-First Search (BFS) Trees

DFS Trees use stacks to navigate/traverse through nodes.
BFS Trees use queues to navigate/traverse through nodes.

Since every tree contains nodes, which can be a separate constructor from a tree, we will 
outline the implementations and operations of both constructors:
1) Node
2) Tree
*/


// IMPLEMENTATION OF A NODE:

function Node(data) {
	this.data = data
	this.parent = null // points to single parent node
	this.children = [] // can point to muliple children nodes
}



// IMPLEMENTATION OF A TREE:

function Tree(data) {
	this.root = new Node(data)
}



/* 
METHODS OF A TREE:

1) traverseDF(callback)
2) traverseBF(callback)
3) contains(data, traversal)
4) add(child, parent)
5) remove(node, parent)
*/



// 1) TRAVERSE - DEPTH FIRST:

Tree.prototype.traverseDF = function(callback) {
	
	(function recurse(currentNode) {
		// Step 2
		for (var i = 0; i < currentNode.children.length; i++) {
			// Step 3
			recurse(currentNode.children[i])
		}
		// Step 4
		callback(currentNode)

	})(this.root)	// Step 1
};

/*
STEPS TO ABOVE FUNCTION:
1 - Invoke recurse function with this.root node as the `currentNode` argument for the function.
2 - Enter a for loop and iterate over each child of currentNode.
3 - Invoke the recurse function with every child of currentNode.
4 - When currentNode no longer has children, exit loop and invoke the callback function that was passed in to function.

Note: Steps 2,3 and 4 will repeat on every node of the tree until it is fully traversed.

*/

/*
EXAMPLE OF TRAVERSE - DEPTH FIRST IN ACTION:

If we had a tree (called 'tree') and the nodes of the tree had the following strings as their node.data:
 
 one
 ├── two
 │   ├── five
 │   └── six
 ├── three
 └── four
     └── seven

Then carrying out the traverseDF method on the tree (with a function that logs the data of the nodes as the argument) we would see the below: 
*/

tree.traverseDF(function(node) {
    console.log(node.data)
});
 
/*
 
logs the following strings to the console
 
'five'
'six'
'two'
'three'
'seven'
'four'
'one'
 
*/



// 2) TRAVERSE - BREADTH FIRST:

// The process of the breadth-first search differs to depth-first search in that the method is:
// - Start with the root node; then travel one depth and visit every node in that depth from left to right. 
// - Repeat this process until there are no more depths to travel. 

Tree.prototype.traverseBF = function(callback) {
	var queue = new Queue() // BFS uses a queue data structure.
	
	queue.enqueue(this.root)

	currentNode = queue.dequeue()

	while(currentNode) {}
		for (var i = 0; i < currentNode.children.length; i++) {
			queue.enqueue(currentNode.children[i])
		}
		
		callback(currentNode)
		currentNode = queue.dequeue()
	}
};


/*
STEPS TO ABOVE FUNCTION:
1 - Create an instance of Queue, called 'queue'.
2 - add the node that invoked traverseBF to the instance of Queue i.e. 'this.root'.
3 - Declare a variable 'currentNode' and initialize it to the node we just added to the queue.
4 - While CurrentTree points  to a node execute the code in the loop.
5 - Use a for loop to iterate through the children of currentNode.
6 - And add every child to the queue. 
7 - Take currentNode and pass it as an argument of the callback function.
8 - Reassign currentNode to the next node being removed from the queue.
9 - Steps 4 to 8 will repeat until currentNode does not point to a node (queue has been emptied) as every node in the tree has been visited.


If we had a tree (called 'tree') and the nodes of the tree had the following strings as their node.data:
 
 one
 ├── two
 │   ├── five
 │   └── six
 ├── three
 └── four
     └── seven

This would result in a tree traversal such as the below:
*/

tree.traverseBF(function(node) {
    console.log(node.data)
});
 
/*
 
logs the following strings to the console
 
'one'
'two'
'three'
'four'
'five'
'six'
'seven'
 
*/


// 3) CONTAINS METHOD:

// - allows us to search for a particular value in our tree.
// - accepts 2 arguments: the data to search and the type of traversal.

Tree.prototype.contains = function(callback, traversal) {
	traversal.call(this, callback)
}

// Discussion of method:
// In the body of contains(callback, traversal), we use a method named call to pass this and callback. 
//The first argument binds traversal to the tree that invoked contains(callback, traversal); 
//the second argument is a function that is invoked on every node in our tree. 

// Example of Method:
// Imagine that we want to log to the console any nodes that contain data with an odd number and 
// traverse every node in our tree with BFS. This is the code we would write:

tree.contains(function(node){
    if (node.data === 'two') {
        console.log(node);
    }
}, tree.traverseBF);


// 4) ADD METHOD: 

// The first parameter, data, is used to create a new instance of Node. 
// The second parameter, toData, is used to compare against every node in a tree. 
// The third parameter, traversal, is the type of tree traversal used in this method. 

Tree.prototype.add = function(data, toData, traversal) {
	var child = new Node(data)
	var parent = null
	var callback = function(node) {
		if (node.data === toData) {
			parent = node
		}
	}

	this.contains(callback, traversal)

	if (parent) {
		parent.children.push(child)
		child.parent = parent
	} else {
		throw new Error ('Cannot add node to a non-existent parent.')
	}
}

/*
Explanation of Method:
In the body of add(data, toData, traversal), we declare three variables. The first variable, child, is initialized as a new instance of Node. 
The second variable, parent, is initialized as null; but it will later point to any node in a tree that matches the value of toData. 
The reassignment of parent happens in the third variable we declare, which is callback. 

callback is a function that compares toData to every node's data property. If the if statement evaluates to true, then parent is assigned 
to the node that matched the comparison in the if statement. 

The actual comparison of every node to toData occurs in contains(callback, traversal). The type of traversal and callback must be passed 
as arguments of contains(callback, traversal). 

Finally, if parent does exist in the tree, we push child into parent.children; we also assign parent to the parent of child. Else, we throw an error. 

Let's use add(data, toData, traversal) in an example: 
*/

var tree = new Tree('CEO');
 
tree.add('VP of Happiness', 'CEO', tree.traverseBF);
 
/*
 
our tree
 
'CEO'
└── 'VP of Happiness'
 
*/




// 5) REMOVE METHOD:

Tree.prototype.remove = function(data, fromData, traversal) {
	var tree = this
	var parent = null
	var childToRemove = null
	var index
	var callback = function(node) {
		if (node.data === fromData) {
			parent = node
		}
	}

	this.contains(callback, traversal)

	if (parent) {
		index = findIndex(parent.children, data)

		if (index === undefined) {
			throw new Error('Node to remove does not exist.')
		} else {
			childToRemove = parent.children.splice(index,1)
		}
	} else {
		throw new Error('Parent does not exist.')
	}

	return childToRemove
}


/*
Explanation of Method:
This method will remove a node and all of its children.

Similar to add(data, toData, traversal), remove traverses a tree to find a node that contains 
the second argument, which is now fromData. If this node is found, then parent points to it. 

At this moment, we reach our first if statement. If parent does not exist, we throw an error. 
If parent does exist, we invoke findIndex() with parent.children and the data we want to remove from the children nodes of parent. 
(findIndex() is a helper method that I defined below.)

Inside findIndex(), the following logic occurs. If any of the nodes in parent.children contain data that match data, the variable index is assigned an integer. 
If none of the children's data properties match data, then index retains its default value of undefined. On the last line of findIndex(), we return index. 

We now return to remove(data, fromData, traversal). If index is undefined, an error is thrown. If index is defined, we use it to splice the node 
we want to remove from the children of parent; we also assign the removed child to childToRemove. 

Finally, we return childToRemove. 
*/


// FIND INDEX HELPER METHOD (USED IN REMOVE METHOD):

function findIndex(arr, data) {
	var index

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === data) {
			index = i
		}
	}
	return index
}