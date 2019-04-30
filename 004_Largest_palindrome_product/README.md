# Problem 3 - Largest prime factor
## Notes / Logic / Explanations 

---

Going with the approach of generating ever-decreasing palindromes, and then checking if they are the product of two 3-digit numbers.

I first wanted to know:   
Given a 6-digit number, what is the largest palindrome less than that #?  
Because this is where we should start our palindromes and search.  

This turned out to be the most interesting part of the problem to me - figuring out the largest palindrome less than or equal to a given 6-digit number.

---

## Find largest palindrome less than or equal to a 6-digit number 

Given a 6-digit number ABCDEF,  
to get the biggest palindrome we keep as many of the most-significant digits (MSD) - digits from the left - as we can.
<pre>
ABC???
</pre>
In order to also make it a palindrome we have to reverse-copy the left side.
<pre>
ABCCBA
</pre>
This _could_ be the answer, but we'll have to start checking its lesser-significant digits (digits on the right half).


Our first check is  

C vs D  
---
<pre>
If C < D, then the rest is fine.
ABCCBA 
is the largest palindrome <= ABCDEF
</pre>
Otherwise if C > D, then there's a problem: ABCCBA > ABCDEF and we need to adjust ABCCBA down.  

The first opportunity to do this while both keeping the most MSD's and maintaining a palindrome is at the third/fourth digit pair.
<pre>
ABccBA, where c is one less than C 
</pre>
<pre>
When C > D,

ABccBA
will be the largest palindrome <= ABCDEF 

This can be expressed as ABCCBA - 1100.
  ABCCBA 
-   1100
--------
  ABccBA
</pre>
It's important to note that because C > D, C will necessarily NOT be 0.

---
At this point, if neither of the above conditions were true, then C must be equal to D and we'll have to continue to the next pair of digits.

B vs E, knowing C=D
---
<pre>
If B < E, then the rest is fine.
ABCCBA 
will be the largest palindrome <= ABCDEF
</pre>
Otherwise if B > E then there's the same problem: ABCCBA > ABCDEF and we need to adjust ABCCBA down.  

The first opportunity to do this is STILL at the third/fourth digits pair.

This time however we have an extra consideration: we know C=D, BUT they could both be 0.
<pre>
When B>E and C is not 0,
ABccBA 
is the largest palindrome <= ABCDEF
</pre>
Otherwise if C=D=0, then the next opportunity to adjust our palindrome is at the second/fifth digits pair.
<pre>
Ab??bA, where b is one less than B
</pre>
The digits between the b's should be 9's to keep the number high as possible.
<pre>
When B>E and C=D=0,
Ab99bA 
is the largest palindrome <= ABCDEF

This can be expressed as ABCCBA - 110.
  AB00BA 
-    110
--------
  Ab99bA
</pre>
Again because B > E, B will necessarily NOT be 0.

---

At this point, if none of the above conditions were met, then B must equal E (possibly both 0), in addition to C=D (possibly both 0) as well.

We continue to the last pair of digits.

A vs F, knowing B=E and C=D
---
<pre>
If A <= F then the rest is fine.
ABCCBA 
is the largest palindrome <= ABCDEF
</pre>
*Note this includes the condition of A=F, which means the the original ABCDEF was a palindrome itself: A=F, B=E, and C=D.

Otherwise if A > F then there's the same problem: ABCCBA > ABCDEF and we need to adjust ABCCBA down.

We go through the same opportunities one by one - inner pairs to outer - with the extra considerations of whether C=D=0 and then whether B=E=0.
<pre>
When A>F and C is not 0,
ABccBA 
is the largest palindrome <= ABCDEF 
</pre>
Otherwise, if C=D=0, the next opportunity is at B.
<pre>
When A>F, C=D=0, and B is not 0,
Ab99bA 
is the largest palindrome <= ABCDEF
</pre>
Otherwise, if B=E=0 also, the next opportunity is at A.
<pre>
a????a 
where a is one less than A.
</pre>
The digits between the a's should be 9's, to keep the number high as possible.
<pre>
When A>F, C=D=0, and B=E=0,

a9999A 
is the largest palindrome <= ABCDEF

This can be expressed as ABCCBA - 11.
  A0000A 
-     11
--------
  a9999a
</pre>
We shouldn't need to consider whether A=0 because then ABCDEF would not have been a 6-digit number to start.

---------

So we start at this maximum palindrome and 
do loops for each of three digits to generate smaller palindromes.

The most outer loop is for A, with an inner loop for B, and most-inner loop for C.  
The most-inner loop will decrement C by 1.  
Except when it decrements C from 0, then instead have the middle loop decrement B and make C = 9.  
Except when the middle loop decrements B from 0, then instead have the outer loop decrement A and make B = 9. 


These loops will generate palindrome numbers ABCCBA, and each time we'll check if it can be expressed as the product of two 3-digit numbers.

---

## Checking Palindrome divisibility

The useful detail here is that any even#-digit palindrome will be a multiple of 11.  

The way to check any number for divisibility by 11 is to take the alternating sum of its digits.  

<pre>
A 6-digit number ABCDEF will be divisible by 11 if
+A -B +C -D +E -F = 0, or a multiple of 11.  

A 6-digit palindrome ABCCBA is guaranteed to have an alternating sum of digits be 0.
+A -B +C -C +B -A = 0.
</pre>

When checking a palindrome to see if it's divisible by two 3-digit numbers, we use this detail be dictating that the first divisor be a multiple of 11 - starting at the largest 3-digit multiple of 11 (990) and step down by 11's until the smallest 3-digit multiple of 11 (110).

If at any time that multiple-of-11 evenly divides the palindrome, then we check if the resulting quotient is also a 3-digit number, and if so we have both divisors of the palindrome.
