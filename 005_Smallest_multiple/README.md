# Problem 5 - Smallest multiple
## Notes / Logic / Explanations 

The simplest, most expressive way to answer is to say it is the least-common-multiple (LCM) of the set of natural numbers up to 20.  

You can find the LCM of a _set_ of numbers by taking the successive results in pairs. 

<pre>
LCM(a,b,c,d) = 
  (1) Find LCM of the pair a and b.
  (2) Find LCM with pair: previous result (1) and c.
  (3) Find LCM with pair: previous result (2) and d.

LCM(a,b,c,d) = LCM( LCM( LCM(a,b), c), d)

LCM(1,2,...,20) = LCM( LCM( ... LCM(1,2), ... 19), 20)
</pre>


## Optimizing

Several numbers in the set may not affect the final LCM result.  
eg: If the number 6 is in the set (implying all numbers less than it are too), then 6 does not affect the entire set's LCM because its factors (2 and 3) already account for all multiples of 6.

The types of numbers that MOST affect the final result are those as high powers of primes (eg 16=2^4 or 27=3^3).  

In fact, the LCM of a consecutive set of natural numbers, when expressed by its prime factorization, will have prime powers be equal to those high-powers-of-primes elements. 

<pre>
LCM(1,2,..,20) = p_1^a_1 * p_2^a_2 * ... (its prime factors)

  The highest power of 2 in this set is 16 = 2^4
  The highest power of 3 in this set is  9 = 3^2
  The highest power of 5 in this set is  5 = 5^1
  ...all remaining primes in this set will be only to power of 1

LCM = 2^4 * 3^2 * 5 * 7 * 11 * 13 * 17 * 19
    = 232,792,560
</pre>

A way to determine how many powers of a number go into another is with logarithms.
<pre>
How many powers of 2 can fit within 20?

        2^x <=     20
    log 2^x <= log 20
  x log 2   <= log 20
  x         <= log 20 / log 2
  x         <= 4.32..

Maximum integer of x gives x=4. 
</pre>
