// SORTING ALGORITHMS:
// --------------------------------------------

/*
A sorting algorithm is an algorithm that puts elements of a list in a certain order. 
Efficient sorting is important for optimizing the use of other algorithms 
(such as search and merge algorithms) which require input data to be in sorted lists; 
it is also often useful for producing human-readable output.

Each sorting algorithm has it own advantages and disadvantages. 
There isn’t any one of them that would beat all of the others, that’s the reason why it is important to know them all.
Their complexity can be seen as a way of expressing their own advantages and disadvantages easily according to a specific set of input data.
Therefore it is important to know which is the underlying complexity for such or such sorting algorithm according to a set of input data.

The complexity is expressed on 2 axes, the space and the time.
The space complexity represents the memory consumption of a sorting algorithm
*/



// SWAP HELPER METHOD:

// This method will be used in some of the sorting algorithms below.

function swap(array, i, j) {
	var temp = array[i]
	array[i] = array[j]
	array[j] = temp
}


/*
BUBBLE SORT:
------------

Bubble sort is a simple sorting algorithm that repeatedly steps through the list to be sorted, 
compares each pair of adjacent items and swaps them if they are in the wrong order. 
The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.
*/


function bubbleSort(array) {
	var swapped

	do {
		swapped = false
		for (var i = 0; i < array.length; i++) {
			if (array[i] && array[i+1] && array[i] > array[i+1]) {
				swap(array, i, i+1)
				swapped = true
			}
		}
	} while (swapped)

	return array
}



/*
SELECTION SORT:
------------

The Selection sort algorithm divides the input list into two parts: the sublist of items already sorted and 
the sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist 
is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest 
element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the sublist 
boundaries one element to the right.
*/

function selectionSort(array) {
	for (var i = 0; i < array.length; i++) {
		var min = i
		for (var j = i+1; j < array.length; j++) {
			if (array[j] < array[min]) {
				min = j
			}
		}
		if (i !== min) {
			swap (array, i, min)
		}
	}
	return array
}


/*
INSERTION SORT:
------------

Insertion sort algorithm iterates, consuming one input element each repetition, and growing a sorted output list. 
Each iteration removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. 
It repeats until no input elements remain.
*/

function insertionSort(array) {
	for (var i = 0; i < array.length; i++) {
		var temp = array[i]
		var j = i-1
		while (j >= 0 && array[j] > temp) {
			array[j + 1] = array[j]
			j--
		}
		array[j + 1] = temp
	}
	return array
}


/*
SHELL SORT:
------------

Shellsort is an in-place comparison sort which can be seen as either a generalization of sorting by exchange 
(bubble sort) or sorting by insertion (insertion sort). The method starts by sorting pairs of elements far 
apart from each other, then progressively reducing the gap between elements to be compared. 
Starting with far apart elements can move some out-of-place elements into position faster than a simple nearest neighbor exchange.
It is worth noting that for a value of 'gap' equals to 1, this algorithm is equal to insertion sort.  
*/

var gaps = [701, 301, 132, 57, 23, 10, 4, 1]; // Starting with broad gap for sorting and whittling down to smallest gap (1)


function shellSort(array) {
	for (var g = 0; g < gaps.length; g++) {
		var gap = gaps[g]
		for (var i = gap; i < array.length; i++) {
			var temp = array[i]
			for(var j = i; j >= gap && array[j - gap] > temp; j -= gap) {
				array[j] = array[j - gap]
			}
			array[j] = temp
		}
	}
	return array
}



/*
MERGE SORT:
------------

Merge sort is a divide and conquer algorithm. Conceptually, a Merge sort works as follows: 
1) Divide the unsorted list into n sublists, each containing 1 element (a list of 1 element is considered sorted), 
2) Repeatedly merge sublists to produce new sorted sublists until there is only 1 sublist remaining. 
This will be the sorted list.

There are two versions: Top-Down and Bottom-Up.

Top-Down:
The top-down implementation is the implementation that uses recursion.
It starts at the top of the tree and proceeds downwards, each time asking the same question (what do I need to do to sort this array?) 
and answering it (split it into two, make recursive calls, merge results), until you get to the bottom of the tree.

Bottom-Up:
The bottom-up implementation doesn't use recursion. 
It directly starts at the bottom of the tree and proceeds upwards by iterating over the pieces and merging them.
*/


// top-down implementation (a lot simpler to me)

function mergeSortTopDown(array) {
	if (array.length < 2) {
		return array
	}

	var middle = Math.floor(array.length / 2)
	var left = array.slice(0, middle)
	var right = array.slice(middle)

	return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right))
}


function mergeTopDown(left, right) {
	var array = []

	while (left.length && right.length) {
		if (left[0] < right[0]) {
			array.push(left.shift())
		} else {
			array.push(right.shift())
		}
	}
	return array.concat(left.slice()).concat(right.slice()) // add on any remaining length of either left/right after while loop is finished.
}


// bottom-up implementation

function mergeSortBottomUp(array) {
	var step = 1
	while (step < array.length) {
		var left = 0
		while (left + step < array.length) {
			mergeBottomUp(array, left, step)
			left += step * 2
		}
		step *= 2
	}
	return array
}

function mergeBottomUp(array, left, step) {
	  var right = left + step;
	  var end = Math.min(left + step * 2 - 1, array.length - 1);
	  var leftMoving = left;
	  var rightMoving = right;
	  var temp = [];

	  for (var i = left; i <= end; i++) {
	    if ((array[leftMoving] <= array[rightMoving] || rightMoving > end) &&
	        leftMoving < right) {
	      temp[i] = array[leftMoving];
	      leftMoving++;
	    } else {
	      temp[i] = array[rightMoving];
	      rightMoving++;
	    }
	  }

	  for (var j = left; j <= end; j++) {
	    array[j] = temp[j];
	  }	
}


/*
QUICK SORT:
------------

Uses Swap Helper Method as created above.

Quicksort is a divide and conquer algorithm. Quicksort first divides a large array into two smaller sub-arrays: 
the low elements and the high elements. 
Quicksort can then recursively sort the sub-arrays.

There are many ways to do the quick sort algorithm, I am just displaying most efficient way I have found here.
I have used the Hoare partition scheme, it is more efficient than the Lomuto partition scheme because it does three times fewer swaps on average.
*/

function quickSort(array, left, right) {
	left = left || 0
	right = right || array.length - 1

	var pivot = partitionHoare(array, left, right)

	if (left < pivot - 1) {
		quickSort(array, left, pivot - 1)
	}
	if (right > pivot) {
		quickSort(array, pivot, right)
	}
	return array
}


function partitionHoare(array, left, right) {
	var pivot = Math.floor((left + right) / 2)

  	while(left <= right) {
    	while(array[left] < array[pivot]) {
     	 	left++;
    	}
   	 	while(array[right] > array[pivot]) {
      		right--;
    	}
    	if(left <= right) {
      		swap(array, left, right);
     	 	left++;
     	 	right--;
   		}
  	}
  return left;
}



// TESTING:

var array = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];

console.log(bubbleSort(array.slice())); // 			=> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(selectionSort(array.slice())); // 		=> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(insertionSort(array.slice())); // 		=> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(shellSort(array.slice())); // 			=> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(mergeSortTopDown(array.slice())); // 	=> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(mergeSortBottomUp(array.slice())); //	=> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(quicksort(array.slice())); // 			=> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]