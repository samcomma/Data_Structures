/*
Problem 6.4 - Ants on a Triangle

There are three ants on different vertices of a triangle. What is the probability of
collision (between any two or all of them) if they start walking on the sides of the
triangle? Assume that each ant randomly picks a direction, with either direction
being equally likely to be chosen, and that they walk at the same speed.
Similarly, find the probability of collision with n ants on an n-vertex polygon.
*/


/* SOLUTION

ANTS ON TRIANGLE:

Possible combinations of ants' directions:
LLL
RRR
LRR
RLR
RRL
RLL
LRL
LLR

Only LLL and RRR results in no collision.

Set out more mathematically below.

P(clockwise) = (1/2)^3,
P(counterclockwise) = (1/2)^3,
so P(same_direction) = P(clockwise)+P(counterclockwise) = 1/4,
so P(collision) = 1-P(same_direction) = 3/4.




ANTS ON N-VERTEX POLYGON:

The ants can still only choose one of two directions, hence the 1/2 remains, to the power of the number of sides.

P(clockwise) = (1/2)^n = 1/(2^n)
P(counterclockwise) = (1/2)^n = 1/(2^n),
so P(same_direction) = P(clockwise)+P(counterclockwise) = 2/(2^n),
so P(collision) = 1-P(same_direction) = 1- 2/(2^n).

*/


