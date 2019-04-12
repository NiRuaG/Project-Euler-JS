# Problem 2 - Even Fibonacci numbers
## Notes / Logic / Explanations 

With starting terms 1 and 2, the Fibonacci sequence will generate the following pattern of evens and odds:
<pre>
   odd (1) + even (2) =  odd
  even (2) +  odd     =  odd
   odd     +  odd     = even
   odd     + even     =  odd
[odd-> odd -> even] -> [odd -> odd -> even] -> ... 
</pre>
Even numbers occur every three terms.

#
_Here is just one of many "nice" recurrence relations to be found for even-value Fibonacci terms._  
  
Starting with some even term F_i, the previous **even** terms will be at F_i-3 and F_i-6.  
We can break F_i down into these two previous terms using the recurrence relation: 
<pre>
 F_i = F_i-1 + F_i-2 

 F_i | F_i-1 | F_i-2 | F_i-3 | F_i-4 | F_i-5 | F_i-6
 - - - - - - - - - - - - - - - - - - - - - - - - - - 
   1 | 
   0 |   1   |   1   | 
         0   |   2   |   1   | 
                 0   |   3   |   2   | 
                         3   |   1   |   1   |   1 
                         4   |   0   |   0   |   1 

 F_i =                   4 * F_i-3           +   1 * F_i-6
</pre>

#
## Extra Maths - Closed Form  
_working towards a closed form expression analogous to Fibonacci terms_
<pre>
Fib_n = 1/√5 * ((1+√5)/2)^n  -  1/√5 * ((1-√5)/2)^n
</pre>

The even Fibonacci terms follow their own recurrence relation shown above:
<pre>
EvenFib_i = 4 * EvenFib_i-1 + EvenFib_i-1
</pre>
We can look for solutions where _EvenFib_n_ is of the form _x^n_, and by satisfying the above relation gives:
<pre>
x^n =        4 * x^(n-1) + x^(n-2)
  0 =  x^n - 4 * x^(n-1) - x^(n-2)
  0 = (x^2 - 4 * x       - 1) * x^(n-2)
</pre>
_razzle-dazzle ❇️ quadratic formula_
<pre>
x = 2 + √5 and x = 2 - √5
</pre>
are roots of the equation.  
EvenFib will have a closed form with these roots and possible constants _a, b_ 
<pre>
EvenFib_n = a*(2+√5)^n + b*(2-√5)^n
</pre>
We set some conventions such that
<pre>
EvenFib_0 = 0 (= Fib_0)
EvenFib_1 = 2 (= Fib_3)
EvenFib_2 = 8 (= Fib_6)
...
</pre>
in order to determine the constants _a_ and _b_.
<pre>
EvenFib_0 = 0 = a*(2+√5)^0 + b*(2-√5)^0
EvenFib_1 = 2 = a*(2+√5)^1 + b*(2-√5)^1

0 =        a +        b
2 = (2+√5)*a + (2-√5)*b
</pre>
_razzle-dazzle solution for system of linear equations_
<pre>
a =  1/√5
b = -1/√5
</pre>
Plug back into the above, we get a closed form expression:
<pre>
EvenFib_n = 1/√5 * (2+√5)^n - 1/√5 * (2-√5)^n
</pre>
To make it nice in a program we can ignore the second half of the equation because (2-√5) < +/- 0.5  
As power of n increases it has increasingly little effect on the value so we can _round_ just the first half, or _floor_ it + 1/2: 
<pre>
EvenFib_n = [_ 1/√5 * (2+√5)^n + 1/2 _]
</pre>