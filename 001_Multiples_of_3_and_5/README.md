# Problem 1 - Multiples of 3 and 5
## Notes / Logic / Explanations 

Adding consecutive multiples of a number :
<pre>
3+6+9+...+[ (N-1) - (N-1)%3 ]
</pre>
up to last multiple of 3 BELOW (not including) _N_

#
We can take out the common factor of the multiple (in this example, 3):
<pre>
= 3* (1+2+3+...+[_ (N-1)/3 _])
[_ _] is 'floor' function
</pre>
and see the expression for adding the natural numbers (1+2+3+...)

#
The sums of natural numbers produce _**triangle numbers**_.
<pre>
1+2         =  3 = 2* 3   /2 
1+2+3       =  6 = 3* 4   /2
1+2+3+4     = 10 = 4* 5   /2
1+2+3+...+k      = k*(k+1)/2 <- closed-form expression
</pre>
