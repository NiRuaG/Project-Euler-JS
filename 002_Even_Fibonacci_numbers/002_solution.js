
//% https://projecteuler.net/problem=2 
//% Published on Friday, 19th October 2001
//% Difficulty rating: 5%
/*
  * Even Fibonacci numbers
  * Problem 2

  Each new term in the Fibonacci sequence is generated by adding the previous two terms. 
  By starting with 1 and 2, the first 10 terms will be:

    1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

  ? By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
*/
// Answer: 4613732


//% https://www.hackerrank.com/contests/projecteuler/challenges/euler002/problem
/*
  Each new term in the Fibonacci sequence is generated by adding the previous two terms. 
  By starting with 1 and 2, the first 10 terms will be:
      1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

  ? By considering the terms in the Fibonacci sequence whose values do not exceed N, find the sum of the even-valued terms.

  * Constraints
  10 <= N <= 4 x 10^16
*/



const n = Number(process.argv[2]) || 4000000;

console.log(`\nThe sum of the even-valued terms of the Fibonacci sequence whose values do not exceed ${n} is `);


//* Recurrence relation that even numbers occur every 3 terms, and that each even F_i = 4* F_i-3 + F_i-6

function sumEvenFibs_byRecur_NotExceeding(n) {

  let f_even_prev = 0;
  let f_even = 2;
  
  let sum = 0;

  while (f_even <= n) {
    sum += f_even;

    [f_even, f_even_prev] = [4*f_even + f_even_prev, f_even]; // "swap", or done with temp variable
  }

  return sum;
}


console.log(`
${sumEvenFibs_byRecur_NotExceeding(n)}
> as Number type
> with recurrence relation
`);



//! n = 37889062373143900 is the first instance of difference between Number vs BigInt results

function sumEvenFibs_byRecur_NotExceeding_n(n) {

  let f_even_prev = 0n;
  let f_even = 2n;
  
  let sum = 0n;

  while (f_even <= n) {
    sum += f_even;

    [f_even, f_even_prev] = [4n*f_even + f_even_prev, f_even]; // "swap", or done with temp variable
  }

  return sum;
}


console.log(`
${sumEvenFibs_byRecur_NotExceeding_n(BigInt(n))}
> as BigInt type
> with recurrence relation
`);



//* Closed Form expression with convention that EvenFib_0 = 0 and EvenFib_1 = 2
//! accurate (enough) only until n (power) = 25
const sqrt5 = Math.sqrt(5);
const evenFibClosed = n => Math.floor(sqrt5 * Math.pow(2+sqrt5, n)/5 + 1/2);


function sumEvenFibs_byClosed_NotExceeding(n) {

  let i = 0;
  let f_even = evenFibClosed(i);
  let sum = 0;

  while (f_even <= n) {
    sum += f_even;

    f_even = evenFibClosed(++i);
  }
    
  return sum;
}


console.log(`
${sumEvenFibs_byClosed_NotExceeding(n)}
> as Number type
> with closed form expression
`);