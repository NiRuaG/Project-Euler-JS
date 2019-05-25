Some there is proof, other intuition (my math not strong enough)

# Game States

## Convention for describing a game state
<pre>
(m,n)/p;w
</pre>

* <code>(m,n)</code> : pair of players' points, m for Player 1 (P1) and n for Player 2 (P2)  
* <code>/p</code> : game is to p points 
* <code>;w</code> : whose turn it is (an element of set {1,2})  


eg:
<pre>
(4,2)/10;2
</pre>

* P1 has 4 points, P2 has 2 points
* The race is to 10 points total
* It is Player 2's turn


## Expressing Player 2's Win Chance
P2's win chance from any game state, <code>S</code>, is <code>[S]</code>.

Two sort of constant chances are:
* When P1 has won (has p or more points):
  <pre>[ (m >= p, n <  p) /p ;w ] = 0, P2 has 0 chance of winning</pre>
* When P2 has won (has p or more points):
  <pre>[ (m <  p, n >= p) /p ;w ] = 1, P2 has 1 (100%) chance of winning</pre>

For all other states: 0 < <code>[S]</code> < 1, a probability percentage.  

When in the context of _evaluating_ a state's win chance, I may sometimes drop the brackets and simply write <code>S</code>. 

# Transitions

## Convention for game state transitions
State transitions will be represented by <code>-></code>, <code>\\/</code>, <code>/\\</code> ("arrows" to the right, down, and up).  
<pre>
 S1
 /\
 S2 -> S3
 \/
 S4
</pre>

When analyzing a state, I'm going to start with the default of <code>w</code>=1.  
Mainly because that is the problem, <code>(0,0)/p</code> and **P1 goes first**.  
We will see that the opposite state, where <code>w</code>=2, is reached by a quick transition from here.

## Transitions from Player 1's turn
Player 1's turn consists of a coin flip.  
If heads, P1 gets one point.  (state to the right)  
Otherwise, P1 gets no points.  (state arrow down)  
In either case it becomes P2's turn.  
<pre>
(m,n)/p;1  ->  (m+1,n)/p;2
  \/
(m,n)/p;2
</pre>

## Transitions from Player 2's turn
Player 2's turn consists of a choice, T>0, and T coin flips.  
If all are heads, P2 gets 2^(T-1) points.  
Otherwise, P2 gets no points.  
In either case it becomes P1's turn.  

Unfortunately we have to include a few more symbols to help express this.  
I thought this was sort of a "gamble" for Player 2.  
So I use <code>G</code> to represent how many points they'd receive, and <code>g</code> to represent their chances of flipping all heads.  
Lastly, what will become helpful apparently later, is <code>q</code>, the reciprocal of g. Because dealing with g fractions everywhere gets messy.  

This table will help for reference throughout: 
<pre>
 T |  G |  g   |  q
 --+----+------+----
 1 |  1 | 1/ 2 |  2
 2 |  2 | 1/ 4 |  4
 3 |  4 | 1/ 8 |  8
 4 |  8 | 1/16 | 16
 5 | 16 | 1/32 | 32
 ...
 when T = i,
      G = 2^(i-1) = 2^(T-1) = q/2
      g = 1/(2^i) = 1/q,
      q = 2^i = 2^T 
</pre>

The state to the right is when P2 fails to flip all heads, P2 receives 0 points and back to P1's turn.  
The state arrow down is when all heads are flipped, and P2 receives G points.  
<pre>
(m,n  )/p;2  ->  (m,n)/p;1
  \/
(m,n+G)/p;1 
</pre>

## All Together
So immediately we see state <code>(m,n)/p;1</code> show up in both of the above player's transition diagrams.  
Which makes sense: starting with P1, if they flip tails, then it's just P2's turn, and if they then don't flip all heads, then it's back to P1's turn and nothing changed (no points). 

So combined it looks like this: 
<pre>
(m,n)/p;1  ->  (m+1,n)/p;2 
  \/  /\
(m,n)/p;2
  \/
(m,n+G)/p;1 
</pre>
This is the ubiquitous diagram I use, and a lot of the analysis below has these four states labeled as:
<pre>
   A  ->  B
  \//\
   C
  \/
   D
</pre>
* <code>A</code> is the default view of this point state, as P1's turn.  
  <code>A -> B</code> is when P1 flips heads and receives a point.  
  <code>A -> C</code> is when P1 flips tails and receives no points. 
* <code>B</code> is an "external" point state (different from our starting (m,n)), where it is P2's turn. 
* <code>C</code> is P2's view of this point state, the opposite view of P1.  
  <code>C -> A</code> is when P2 fails to flip all heads and receives no points.  
  <code>C -> D</code> is when P2 flips all heads and receives G points. 
* <code>D</code> is an "external" point state, where it is P1's turn. 

With these labels, sometimes the <code>;w</code> will be omitted from showing a full game state.  
Instead, only a state of the points <code>(m,n)/p</code> is shown with <code>A</code> & <code>C</code> game states implicitly as P1's and P2's turns.  

# P2's Win Chance
I forget what this technique is called in probability problems, but we can evaluate P2's win chance at a state <code>S</code> by using both
 1) the probabilities when <code>S</code> transitions to other states  
 and
 2) P2's win chance at those transitioned states.  

If <code>S1</code> transitions to <code>S2</code> with a probability of <code>p</code>, and otherwise <code>S1</code> transitions to <code>S3</code> with (what must be) probability <code>1-p</code>: 
<pre>
S1 -> S2, with probability: p
S1 -> S3, with probability: 1-p 

[S1] = p*[S2] + (1-p)*[S3]
is P2's win chance at S1

*when in context of evaluating win chance, I may sometimes write it simply as
S1 = p*S2 + (1-p)*S3
</pre>

We can start with some very generic equations for expressing P2's win chance in the two states <code>A</code> & <code>C</code>.  

Because the probability of transitioning from <code>A -> B</code> is <code>1/2</code> (flip of heads) and the probability of transitioning from <code>A -> C</code> is <code>1/2</code> (flip of tails, or 1 minus flip of heads): 
<pre>[A] = [B]/2 + [C]/2</pre>
Transition for <code>C -> D</code> has probability <code>g</code>, and <code>C -> A</code> has probability <code>(1-g)</code>:
<pre>
[C] = g[D] + (1-g)[A]

or by replacing g = 1/q:
C = D/q + (q-1)*A/q
</pre>
We can see both <code>A</code> & <code>C</code> depend on the other, so we can substitute each in to the other and get the following:
<pre>
[A] = [B]/2 + (g[D] + (1-g)[A])/2
[C] = g[D] + (1-g)([B]/2 + [C]/2)
...
[A] = (     [B] +  g[D])/(1+g)
[C] = ((1-g)[B] + 2g[D])/(1+g)

...or by replacing g = 1/q ...

A = ( q   B +  D)/(q+1)
C = ((q-1)B + 2D)/(q+1)

which will be nicer because q has values 2, 4, 8, .. instead of g = 1/2, 1/4, 1/8, ..
</pre>
So now we have win chances of a point state <code>(m,n)/p</code> based on win chances from other, external point states (states <code>B</code> and <code>D</code>).  

We will make even better formulas as we start focusing on particular point states.

# Insights
## Equivalent game states
The win chance of a game state <code>(m,n)/p;w</code> is equal to one of 
<pre>
    [ (m-n, 0  ) /(p-n) ;w ] if m > n
    [ ( 0 , n-m) /(p-m) ;w ] if m < n
    [ ( 0 , 0  ) /(p-m) ;w ] if m = n

whichever above applies, the state's win chance
  = [ (m  , n  ) / p    ;w ]
</pre>
I don't have any sort of rigorous proof, but I believe it correct by intuition:  
That in a game to 5 points, where Player 1 & 2 both have 4 points (are both one point away from winning), P2's chance to win is the same as in the game in a race to 1 point. 

This is just one way to interpret state equivalences, we could maybe have the third equiv. state (with points (0,0) ) as being incorporated into one of the other two if we wanted, or allow for negative point values, etc. 

But the main idea is that we will use these equivalencies in order to figure out the win chance of game states - those with higher point totals - by using the game states with lower point totals.  
We'll see how this idea plus expressing win chances at <code>A</code> & <code>C</code> in terms of external <code>B</code> & <code>D</code> states come together. 
<pre>
eg
[ (25, 55) /100 ;2 ] = [ ( 0, 30) /75 ;2 ]
</pre>
Because the win chances are the same, we can think of these two states as equivalent. 

## State Types 
Following on the above, the only types of game states we need to concern ourselves with will be in one of the following forms:
<pre>
 (m,0)/p;w
 (0,n)/p;w
 (0,0)/p;w
</pre>

## Points to Win Delta
Now what we focus on is **how close a player is to winning**.
<pre>
 (m,0)/p;w - P1 is ahead and only needs (p-m) points more to win. 
 (0,n)/p;w - P2 is ahead and only needs (p-n) points more to win. 
 (0,0)/p;w - Neither player is ahead, both players need p more points to win. 
</pre>
For the last case, we could maybe say whose ever turn it is (<code>w</code>) has an advantage. 

Our method of attack to decompose this problem is to come up with formulas for P2's win chance by seeing how close one player is to winning (their point difference to <code>p</code>).

**We want formulas for P2's win chance for each of**
<pre>
 (p-k,   0)/p;w - when P1 is k points from winning. 
 (  0, p-k)/p;w - when P2 is k points from winning. 
 (  0,   0)/p;w - Both players are p points from winning. 
</pre>
**The side-problem is how to pick <code>T</code> to maximize P2's win chance.**

# Let's Begin
We start specific and work up/down/out/slant-ways.  
Game in a race to 1 point.  
**Point state: <code>(0,0)/1</code>**
<code>
* A: (0,0)/1;1
* B: (1,0)/1;2
* C: (0,0)/1;2
* D: (0,G)/1;1

</code>

<code>[B] = 0</code> Player 1 wins.  
<code>[D] = 1</code> Player 2 wins & it does not matter what P2 picks for their <code>T</code>, further explanation follows.

Using these values, we reduce <code>[A]</code> and <code>[C]</code>:
<pre>
A = ( q   B +  D)/(q+1) = 1/(q+1)
C = ((q-1)B + 2D)/(q+1) = 2/(q+1)
</pre>
So we will constantly be asking: **what does P2 pick to maximize <code>[C]</code>?** (which will necessarily also maximize <code>[A]</code>)  

For this point state, intuitively we may know they should pick <code>T=1</code> (implying <code>q=2</code>), because why would they make it harder to win (a <code>T>1</code>) if they only need one (<code>T=1</code>) good flip to win? 

This intuition also applies to other point states:  
***If P2 chooses the minimum <code>T</code> that gives enough points <code>G</code> to win (<code>[D]=1</code>), then picking any higher <code>T</code> is worse (<code>[C]</code> will lower).***

This doesn't mean P2 _always_ picks <code>T</code> to immediately go for the win, it just means that if P2 has already decided on a <code>T</code> that wins, there's no reason for <code>T</code> to go higher.

This I am able to prove, in appendix if interested: that if a <code>T=k</code> makes <code>[D]=1</code>, then <code>T=k+1</code> gives a worse <code>[C]</code> (and likewise a worse <code>[A]</code>).  

So when in the point state <code>(0,0)/1</code>, P2 picks <code>T=1 (q=2)</code>, and we simplify our previous equations: 
<pre>
@ (0,0)/1:
[A] = 1/(q+1) = 1/3
[C] = 2/(q+1) = 2/3
</pre>

Now we're going to use these to generalize states where P2 is _k points from winning_. 

## P2 is 1 point from winning
Again we start specific with P2 being <code>k=1</code> point from winning.  
Point state: <code>(0,p-1)/p</code>
<code>
* A: (0, p-1 ) /p;1
* B: (1, p-1 ) /p;2
* C: (0, p-1 ) /p;2
* D: (0, p-1+G)/p;1

</code>

<code>B</code> can be reduced to <code>(0,p-2)/p-1;2</code>  
<code>[D]=1</code> for any choice <code>T</code>  
<pre>
A = we'll come back to, it's easier to just look at C for now
C = ((q-1)B + 2D)/(q+1) = ((q-1)B + 2)/(q+1)
</pre>
**What does P2 pick to maximize <code>[C]</code>?**  
With same reasoning above, <code>T=1</code>, as they only need one point to win, and so <code>q=2</code>.
<pre>
C = ((q-1)B + 2)/(q+1) = ( B + 2)/3
</pre>

Now we notice how <code>B</code>'s state reduction to <code>(0,p-2)/p-1;2</code> is the same form we are investigating:  
**that P2 is (still) one point away from winning!**  

Consider it in steps: starting from <code>(0,0)/1</code>  

1. <code>(0,0)/1</code> has <code>C=2/3</code> (figured out above)

1. <code>(0,1)/2</code> has <code>B: (1,1)/2;2</code>  
which is _equivalent_ to <code>(0,0)/1;2</code>  
which is **exactly** the same state as <code>C=2/3</code> from step 1.  
so this step's <code>[B]=2/3</code> and <code>C=(B+2)/3=8/9</code>

1. <code>(0,2)/3</code> has <code>B: (1,2)/2;2</code>  
<code>B</code> is _equivalent_ to state <code>(0,1)/2;2</code>,  
which is exactly the same state <code>C=8/9</code> from step 2.  
so this step's <code>[B]=8/9</code> and <code>C=(B+2)/3=26/27</code>

This gives us a recurrence relation: the <code>[B]</code> at one step is the same as <code>[C]</code> from the **previous** step.  
Our expression for this will be with markers <code>B'</code> (read B prime) and <code>C'</code>.   
From a starting state with <code>B</code> and <code>C</code>, the next step will be <code>B'</code> and <code>C'</code>.  
Then the next step from  <code>B' C'</code> will be <code>B''</code> (B double prime), <code>C''</code>, etc. as needed.  
<pre>
Step 1: (0,0)/1, B  = 0  and C  = (B  +2)/3 = 2/3
Step 2: (0,1)/2, B' = C  and C' = (B' +2)/3 = (C +2)/3)
Step 3: (0,2)/3, B''= C' and C''= (B''+2)/3 = (C'+2)/3)

Starting with C = 2/3
C' = (C+2)/3
</pre>
With this as our recurrence relation:  
<pre>
C = 1 - 1/(3^p)
</pre>
_See appendix for solving these sorts of recurrence relations._  

Then with one of the first equations we had for <code>[C]</code>, we can determine <code>[A]</code> knowing that in this type of game we're investigating (P2 is 1 point from winning): <code>[D]=1</code> as soon as <code>q=2</code>.
<pre>
C = D/q - (q-1)A/q
C = 1/2 -      A/2
..
A = 2C - 1
.. 
A = 1 - 2/(3^p)
</pre>
This completes our formulas for P2 being 1 point from winning. 
<pre>
@ (0, p-1)/p 
[A] = 1 - 2/(3^p)
[C] = 1 - 1/(3^p)
</pre>


## P2 is 2 points from winning  
Point state: <code>(0,p-2)/p</code>
<code>
* A: (0, p-2 ) /p;1
* B: (1, p-2 ) /p;2
* C: (0, p-2 ) /p;2
* D: (0, p-2+G)/p;1

</code>

<code>B</code> can be reduced to <code>(0,p-3)/p-1;2</code>  
<code>D</code> can be reduced to <code>(0,p-1)/p;1</code> for <code>T=1</code>  
<code>[D]=1</code> for <code>T>1</code>  
<pre>
A = ( q   B +  D)/(q+1)
C = ((q-1)B + 2D)/(q+1)
</pre>
**What does P2 pick to maximize <code>[C]</code>?**  

With same reasoning above, <code>T=1</code>, as they only need one point to win, and so <code>q=2</code>.
<pre>
C = ((q-1)B + 2)/(q+1) = ( B + 2)/3
</pre>

Now we notice how <code>[B]</code>'s state reduction to <code>(0,p-2)/p-1;2</code> is the same form we are investigating:  
**that P2 is (still) one point away from winning!**  

Consider it in steps: starting from <code>(0,0)/1</code>  

1. <code>(0,0)/1</code> has <code>[C]=2/3</code> (figured out above)

1. <code>(0,1)/2</code> has <code>B: (1,1)/2;2</code>  
which is _equivalent_ to <code>(0,0)/1;2</code>  
which is **exactly** the same state as <code>C=2/3</code> from step 1.  
so this step's <code>[B]=2/3</code> and <code>[C]= (B+2)/3 = 8/9</code>

1. <code>(0,2)/3</code> has <code>B: (1,2)/2;2</code>  
<code>B</code> is _equivalent_ to state <code>(0,1)/2;2</code>,  
which is exactly the same state <code>C=8/9</code> from step 2.  
so this step's <code>[B]=8/9</code> and <code>[C]= (B+2)/3 = 26/27</code>

This gives us a recurrence relation: the <code>[B]</code> at one step is the same as <code>[C]</code> from the **previous** step.  
Our expression for this will be with markers <code>B'</code> (read B prime) and <code>C'</code>.   
From a starting state with <code>B</code> and <code>C</code>, the next step will be <code>B'</code> and <code>C'</code>.  
Then the next step from  <code>B' C'</code> will be <code>B''</code> (B double prime), <code>C''</code>, etc. as needed.  
<pre>
Step 1: (0,0)/1, B  = 0  and C  = (B  +2)/3 = 2/3
Step 2: (0,1)/2, B' = C  and C' = (B' +2)/3 = (C +2)/3)
Step 3: (0,2)/3, B''= C' and C''= (B''+2)/3 = (C'+2)/3)

Starting with C = 2/3
C' = (C+2)/3
</pre>
With this as our recurrence relation:  
<pre>
C = 1 - 1/(3^p)
</pre>
_See appendix for solving these sorts of recurrence relations._  

Then with one of the first equations we had for <code>[C]</code>, we can determine <code>[A]</code> knowing that in this type of game we're investigating (P2 is 1 point from winning): <code>[D]=1</code> as soon as <code>q=2</code>.
<pre>
C = D/q - (q-1)A/q
C = 1/2 -      A/2
..
A = 2C - 1
.. 
A = 1 - 2/(3^p)
</pre>
This completes our formulas for P2 being 1 point from winning. 
<pre>
@ (0, p-1)/p 
[A] = 1 - 2/(3^p)
[C] = 1 - 1/(3^p)
</pre>
















<>

## P1 is 1 point from winning
Point state: <code>(p-1,0)/p</code>
<code>
* A: (p-1, 0 ) /p ;1
* B: ( p , 0 ) /p ;2
* C: (p-1, 0 ) /p ;2
* D: (p-1, G ) /p ;1

</code>

<code>[B]=0</code>  
<code>[D]</code> can be reduced to <code>(p-G-1, 0)/p-G;2</code>  
<pre>
A = ( q   B +  D)/(q+1) =  D/(q+1) 
C = ((q-1)B + 2D)/(q+1) = 2D/(q+1) 
</pre>
**What does P2 pick to maximize <code>[C]</code>?**  
Now we have to give this some thought since <code>T=1</code> is not always the right answer like it has been before.
<pre>
</pre>

Again we notice how <code>[D]</code>'s state reduction to <code>(p-G-1,0)/p-G;1</code> is the same form we are investigating:  **P1 is (still) one point away from winning.**  

From <code>(0,0)/1</code>  

1. <code>(0,0)/1</code> has <code>[A]=1/3</code> (figured out above)

1. <code>(1,0)/2</code> has <code>D: (1,1)/2;2</code>  
which is _equivalent_ to <code>(0,0)/1;2</code>  
which is **exactly** the same state as <code>C</code> from step 1.  
so this step's <code>[B]=2/3</code> and <code>[C]= (B+2)/3 = 8/9</code>

1. <code>(0,2)/3</code> has <code>B: (1,2)/2;2</code>  
<code>B</code> is _equivalent_ to state <code>(0,1)/2;2</code>,  
which is exactly the same state <code>C</code> from step 2.  
so this step's <code>[B]=8/9</code> and <code>[C]= (B+2)/3 = 26/27</code>

This gives us a recurrence relation: the <code>[B]</code> at one step is the same as <code>[C]</code> from the **previous** step.  
Our expression for this will be with markers <code>B'</code> (read B prime) and <code>C'</code>.   
From a starting state with <code>B</code> and <code>C</code>, the next step will be <code>B'</code> and <code>C'</code>.  
Then the next step from  <code>B' C'</code> will be <code>B''</code> (B double prime), <code>C''</code>, etc. as needed.  
<pre>
Step 1: (0,0)/1, B  = 0  and C  = (B  +2)/3 = 2/3
Step 2: (0,1)/2, B' = C  and C' = (B' +2)/3 = (C +2)/3)
Step 3: (0,2)/3, B''= C' and C''= (B''+2)/3 = (C'+2)/3)

Starting with [C] = 2/3
C' = (C+2)/3
</pre>
With this is our recurrence relation:  
<pre>
C = 1 - 1/(3^p)
</pre>
_See appendix for solving these sorts of recurrence relations._  

Then with one of the first equations we had for <code>[C]</code>, we can determine <code>[A]</code> knowing that in this type of game we're investigating (P2 is 1 point from winning): <code>[D]=1</code> as soon as <code>q=2</code>.
<pre>
C = D/q - (q-1)A/q
C = 1/2 -      A/2
..
A = 2C - 1
.. 
A = 1 - 2/(3^p)
</pre>
This completes our formulas for P2 being 1 point from winning. 
<pre>
@ (0, p-1)/p 
[A] = 1 - 2/(3^p)
[C] = 1 - 1/(3^p)
</pre>

