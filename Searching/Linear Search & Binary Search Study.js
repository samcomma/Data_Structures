// LINEAR SEARCH:

// Not performant, avoid using in an interview.

function linearSearch(array, target){
  for(var i = 0; i < array.length; i++){
    if(array[i] === target) return i;
  }
  return -1;
}


// BINARY SEARCH:

// Binary search is more efficient than linear search; it has a time complexity of O(log n). 
// The list of data must be in a sorted order for it to work.
// A binary search works by finding the middle element of a sorted array and comparing it to your target element. 
// Based on what you find, you either use the left or right half of the array and update the start and ending indexes 
// until you either do or do not find the element.


function binarySearch(array, target) {
	var left = 0
	var right = array.length - 1

	while (left <= right) {
		var mid = left + Math.floor((right - left) / 2)

		if (array[mid] === target) {
			return mid
		}

		if (array[mid] < target) {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return -1
}