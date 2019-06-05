# Game States
Start as a full description: 
<pre>
(m,n)|p;w
</pre>

* <code>(m,n)</code> : pair of players' points, <code>m</code> for Player 1 (P1), and <code>n</code> for Player 2 (P2)  
* <code>|p</code> : the game is to p points 
* <code>;w</code> : whose turn it is (either <code>1</code> or <code>2</code>)  


eg:
<pre>
(4,2)|10;2
</pre>

* P1 has 4 points, P2 has 2 points
* The race is to 10 points total
* It is Player 2's turn


# Expressing Player 2's Win Chance
P2's win chance from any game state, <code>S</code>, is <code>[S]</code>.

Two sort of _constant_ chances are when either player has won (has <code>p</code> or more points):
* If <code>m >= p</code>, P1 has won, so P2 has <code>0</code> chance of winning.
* If <code>n >= p</code>, P2 has won, so she has <code>1</code> (100%) chance of winning.

For all other states: <code>0 < [S] < 1</code>, a probability percentage.  
# Transitions
_Transitions will be represented by <code>-></code>, <code>\\/</code>, <code>/\\</code> ("arrows" to the right, down, or up)._
## Transitions from Player 1's turn
Player 1's turn consists of a coin flip.  
If heads, P1 gets one point.  (state to the right)  
Otherwise, P1 gets no points.  (state arrow down)  
In either case it becomes P2's turn.  
<pre>
(m,n)|p;1  ->  (m+1,n)|p;2
  \/
(m,n)|p;2
</pre>

## Transitions from Player 2's turn
Player 2's turn consists of a choice, <code>T>0</code>, and <code>T</code> coin tosses.  
If all are heads, P2 gets <code>2^(T-1)</code> points.  
Otherwise, P2 gets no points.  
In either case it becomes P1's turn.  

We'll have to include a few more symbols to help express this.  
I thought this was sort of a "gamble" for Player 2.  
So I use <code>G</code> to represent how many points they'd receive, and <code>g</code> to represent their chances of flipping all heads.  
Lastly is <code>q</code>, the reciprocal of <code>g</code>, which was helpful when figuring out exact fractions instead of using <code>g</code>.

Table for reference: 
<pre>
 T |  G |  g   |  q
 --+----+------+----
 1 |  1 | 1/ 2 |  2
 2 |  2 | 1/ 4 |  4
 3 |  4 | 1/ 8 |  8
 4 |  8 | 1/16 | 16
 5 | 16 | 1/32 | 32
 ...
</pre>

The state to the right is when P2 fails to flip all heads, P2 receives 0 points and back to P1's turn.  
The state arrow down is when all heads are flipped, and P2 receives <code>G</code> points.  
<pre>
(m,n)|p;2  ->  (m,n)|p;1
  \/
(m,n+G)|p;1 
</pre>

## All Together
We see state <code>(m,n)|p;1</code> show up in both of the above transition diagrams.  
Which makes sense: starting with P1, if they flip tails, then it's just P2's turn, and if P2 doesn't then flip all heads, then it's back to P1's turn and nothing changed (no points received for either player). 

So combined it looks like this: 
<pre>
(m,n)|p;1  ->  (m+1,n)|p;2 
  \/  /\
(m,n)|p;2
  \/
(m,n+G)|p;1 
</pre>
I like to label these states as:
<pre>
   A  ->  B
  \//\
   C
  \/
   D
</pre>
* <code>A</code> is the view of this point state as P1's turn.  
  <code>A -> B</code> is when P1 flips heads and receives a point.  
  <code>A -> C</code> is when P1 flips tails and receives no points.  
* <code>B</code> is an "external" point state (different from our starting <code>(m,n)</code>), where it is P2's turn.  
* <code>C</code> is the view of this point state as P2's turn.  
  <code>C -> A</code> is when P2 fails to flip all heads and receives no points.  
  <code>C -> D</code> is when P2 flips all heads and receives <code>G</code> points. 
* <code>D</code> is an "external" point state, where it is P1's turn. 

# P2's Win Chance
I forget what this technique is called in probability problems, but we can evaluate P2's win chance at a state <code>S</code> by using both
 1) the probabilities when <code>S</code> transitions to other states  
 and
 2) P2's win chance at those transitioned states.  

If <code>S1</code> transitions to <code>S2</code> with a probability of <code>p</code>, and only otherwise <code>S1</code> transitions to <code>S3</code> with (what must be) probability <code>1-p</code>: 
<pre>
S1 -> S2, with probability: p
S1 -> S3, with probability: 1-p 

[S1] = p*[S2] + (1-p)*[S3]
is P2's win chance at S1
</pre>
*Or when in the context of evaluating win chance, drop the brackets and write it as*
<pre>
S1 = p*S2 + (1-p)*S3
</pre>

With this, we can make some equations for expressing P2's win chance at the two states <code>A</code> & <code>C</code>.  

## P2's Win Chance on P1's turn (<code>[A]</code>)
Because the probability of transitioning from <code>A -> B</code> is <code>1/2</code> (flip of heads) and the probability of transitioning from <code>A -> C</code> is <code>1/2</code> (flip of tails, or 1 minus flip of heads): 
<pre>[A] = [B]/2 + [C]/2</pre>

## P2's Win Chance on P2's turn (<code>[C]</code>)
Transition for <code>C -> D</code> has probability <code>g</code>, and <code>C -> A</code> has probability <code>(1-g)</code>:
<pre>[C] = g[D] + (1-g)[A]</pre>
or by replacing <code>g = 1/q</code>
<pre>C = D/q + (q-1)*A/q</pre>

## P2's Win Chance based only on external states (<code>[B] & [D]</code>)
We can see both <code>[A]</code> & <code>[C]</code> depend on the other, so we can substitute each in to the other and get the following:
<pre>
[A] = [B]/2 + (g[D] + (1-g)[A])/2
[C] = g[D] + (1-g)([B]/2 + [C]/2)
...
[A] = (     [B] +  g[D])/(1+g)
[C] = ((1-g)[B] + 2g[D])/(1+g)
</pre>
or by replacing <code>g = 1/q</code>:
<pre>
A = ( q   B +  D)/(q+1)
C = ((q-1)B + 2D)/(q+1)
</pre>
So now we have win chances of a point state <code>(m,n)|p</code> at <code>A</code> & <code>C</code> based on win chances from other, external point states (states <code>B</code> and <code>D</code>).  

# Insight - Equivalent game states
By adjusting all point values (<code>m n p</code>) by the same amount <code>x</code>, the win chance is unaffected. 
<pre>
[ (m  , n  )| p   ;w ] = 
[ (m+x, n+x)|(p+x);w ]
</pre>
I don't have any sort of rigorous proof, but I believe it correct by intuition:  
That in a game to 5 points, where Player 1 & 2 both have 4 points (are both one point away from winning), P2's chance to win is the same as in the game in a race to 1 point. 
<pre>
eg
[ (4,4)|5;1 ] = 
[ (0,0)|1;1 ] 
m, n, and p are all lowered by 4
</pre>
Because the win chances are the same, we can think of the two states as **equivalent**.  
We can use this equivalence idea to simplify how to represent states: by always setting P1's points to 0 (reducing all points by m).
<pre>
(m, n)|p is equivalent to (m-m, n-m)|(p-m) or (0, n-m)|(p-m)
</pre>
So our point-state description can be simplified by dropping P1's points, knowing it's always 0.
<pre>
(4,7)|10 equiv. to (0, 3)|6, simplified as  3|6
(4,4)|10 equiv. to (0, 0)|6, simplified as  0|6
(4,0)|6  equiv. to (0,-4)|6, simplified as -4|6
</pre>
Note it's possible to have negative values left of the <code>|p</code>, which just means P1 is ahead of P2 in the race.  

Let's see how this affects win chance constants:
* Player 1 has won if <code>p = 0</code>.
  <pre>[ n|0 ] = 0</pre>
* Player 2 has won if <code>n >= p</code>.
  <pre>[ n>=p |p ] = 1</pre>

How this affects our state transitions diagram:
<pre>
  n|p;1  ->  n-1|p-1;2
   \//\
  n|p;2
   \/
  n+G|p;1
</pre>
* <code>A -> B</code> is when P1 receives a point, so reduce all point values by 1.  
* <code>C -> D</code> is when P2 flips all heads and receives <code>G</code> points.  

# Programming
Using the last diagram we can make a function that produces P2's win chance given a point-state <code>(n, p)</code>.  
It returns P2's win chances both when it is P1's turn (<code>A</code>) and when it is P2's turn (<code>C</code>).   
To do this we have to determine which choice <code>T</code> is the best (gives the highest P2 win chance).  
For each point-state input, we iterate through all possibilities for <code>T</code>: starting from 1 and going up to the choice where P2 would win the race (<code>G >= p-n</code>).  _T Going any higher than this will always worsen P2's win chance._

Because <code>[A]</code> and <code>[C]</code> depend on "external" point states (<code>B & D</code>), we calculate them by making recursive calls to the function.  
The recursion stops when the parameters trigger one of the constants: 
* <code>p = 0</code> returns <code>0</code> P1 won, P2 lost.  
* <code>n >= p</code> returns <code>1</code> P2 won.  
