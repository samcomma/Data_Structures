/*
Problem 6.1 - Basketball
You have a basketball hoop and someone says that you can play one of two games.

Game 1: You get one shot to make the hoop.
Game 2: You get three shots and you have to make two of three shots.
If p is the probability of making a particular shot, for which values of p should
you pick one game or the other?
*/


/* SOLUTION

Game 1 Probability: p

Game 2 Probability: Possible combinations of getting at least 2 are [WWL], [WLW], [LWW], [WWW] i.e.:

[WWL] = p * p * (1-p)
  +
[WLW] = p * (1-p) * p
  +
[LWW] = (1-p) * p * p
  +
[WWW] = p * p * p
  =
p^2 - p^3 + p^2 - p^3 + p^2 - p^3 + p^3
  = 
3p^2 - 2p^3


Depends on p. Answer:
Pick Game 1 when p > 3p^2 - 2p^3
Pick Game 2 when p < 3p^2 - 2p^3

So for which value of p is which Game better to play?

First thing to note is that p is between 0 and 1.
If p = 0 or p =1 then it doesn't matter which game you play.

As above we said:

Pick Game 1 when 
p > 3p^2 - 2p^3 
p - 3p^2 + 2p^3 > 0 

If you fill in 0.5 for p this equation comes to 0, thus this 0.5 is a turning point.
If you fill in any number less than 0.5 the equation is true.
If you fill in any number greater than 0.5 the equation is false.
Thus pick Game 1 if 0 < p < 0.5.
Pick either Game 1 or 2 if p = 0.5.
And pick Game 2 if 0.5 < p < 1.

*/

/* NOTES:

My solution above is a trial and error solution for finding the turning point/intersections.
Can find the intersections more mathematically by breaking down the equation:

p > 3p^2 - 2p^3 
p - 3p^2 + 2p^3 > 0 
2p^3 - 3p^2 + p > 0
p(2p^2 - 3p + 1) > 0 (tricky step to get to next line but makes sense)
p(2p - 1)(p - 1) > 0

if you set each of these components = 0 you get the 3 discussed intersections of 0, 0.5 and 1.

p = 0			p = 0
2p - 1 = 0		p = 1/2
p - 1 = 0		p = 1