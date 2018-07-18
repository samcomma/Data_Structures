/*
GRAPHS:
-------------------------

A Graph data structure consists of a finite (and possibly mutable) set of vertices or nodes or points, together with a set 
of unordered pairs of these vertices for an undirected Graph or a set of ordered pairs for a directed Graph. 
These pairs are known as edges, arcs, or lines for an undirected Graph and as arrows, directed edges, directed arcs, 
or directed lines for a directed Graph. 
The vertices may be part of the Graph structure, or may be external entities represented by integer indices or references.

A Graph data structure may also associate to each edge some edge value, 
such as a symbolic label or a numeric attribute (cost, capacity, length, etc.).

A graph in this context is made up of vertices, nodes, or points which are connected by edges, arcs, or lines. 
A graph may be undirected, meaning that there is no distinction between the two vertices associated with each edge, 
or its edges may be directed from one vertex to another.

Graph is a non-linear data structure. A graph G contains a set of vertices V and set of Edges E. 
Graph has lots of application in computer science.
Graph is basically divided into two broad categories :

Directed Graph (Di- graph) – Where edges have direction.
Undirected Graph – Where edges do not represent any directed
There are various ways to represent a Graph :-

 - Adjacency Matrix
 - Adjacency List

There are different ways of representing a graph, each of them with its own advantages and disadvantages. Here are the main 2:

Adjacency list: 
For every vertex a list of adjacent vertices is stored. This can be viewed as storing the list of edges. 
This data structure allows the storage of additional data on the vertices and edges.

Adjacency matrix: 
Data are stored in a two-dimensional matrix, in which the rows represent source vertices and columns represent destination vertices. 
The data on the edges and vertices must be stored externally.

*** NB ***
We will be using Adjacency List to represent a graph because in most cases it has certain advantage over the other representation.
*/


// IMPLEMENTATION:

function Node(data) {
	this.data = data
	this.edges = {}
}


function Graph() {
	this.vertices = {}
}


// METHODS:
// -----------------------------


// ADD VERTEX (NODE) METHOD:

Graph.prototype.addVertex = function(data) {
	if (!this.vertices[data]) { 		//only add if it doesn't already exist.
		this.vertices[data] = new Node(data)
	}
}



// REMOVE VERTEX (NODE) METHOD:

Graph.prototype.removeVertex = function(data) { 
	if (this.vertices[data]) { 		// if vertex exists, delete.
		delete this.vertices[data]

		// once you remove a vertex, you need to remove all edges pointing to the vertex.
		Objects.keys(this.vertices).forEach(function(key, index) {
			if (this.vertices[key].edges[data]) {
				delete this.vertices[key].edges[data]
			}
		}.bind(this))  // most important part of method.
	}
}



// GET VERTEX (NODE) METHOD:

Graph.prototype.getVertex = function(data) {
  return this.vertices[data];
};



// ADD EDGE METHOD:

Graph.prototype.addEdge = function(start, end) {
	if (this.vertices[start] && this.vertices[end]) {   // check to see if both vertices exist.

		if (this.vertices[start].edges[end]) {	// check to see if edge exists, if it does, increment it's weight.
			this.vertices[start].edges[end].weight += 1
		} else {
			this.vertices[start].edges[end] = {weight : 1}  // else if edge doesn't exist, create it i.e. assign weight of 1.
		}
	}
}



// REMOVE EDGE METHOD:

Graph.prototype.removeEdge = function(start, end) {
	if (this.vertices[start] && this.vertices[end]) { 	// if vertices exist
		if (this.vertices[start].edges[end]) {			// if edge exists
			delete this.vertices[start].edges[end]		// delete it.
		}
	}
}



// GET EDGE METHOD:

Graph.prototype.getEdge = function(start, end) {
  return this.vertices[start].edges[end] || null;
};



// GET NEIGHBOURS METHOD:

Graph.prototype.neighbors = function(data) {
  return this.vertices[data] ? this.vertices[data].edges : null;
};