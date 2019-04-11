const { triangleNum, triangleNum_n } = require('./helpers');


//% https://projecteuler.net/problem=1 
//% Published on October 5th 2001
/*
  *Multiples of 3 and 5
  *Problem 1

  If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. 
  The sum of these multiples is 23.

  ? Find the sum of all the multiples of 3 or 5 below 1000.
*/


//% https://www.hackerrank.com/contests/projecteuler/challenges/euler001/problem
/*
  If we list all the natural numbers below that are multiples of 3 or 6, we get 3, 5, 6 and 9. 
  The sum of these multiples is 23
  
  ? Find the sum of all the multiples of 3 or 5 below N.

  * Constraints
  1 <= N <= 10^9
*/

const n = Number(process.argv[2]) || 1000;


console.log(`
The sum of all the multiples of 3 or 5 below ${n} is 
${sumMultiplesBelow(n)}
(as Number type)
`);

//!-Notes / Logic / Short Explanations-
/*
        3+6+9+...+[  (n-1)-(n-1)%3 ]  <- last multiple of 3 BELOW (not incld.) n 
  = 3* (1+2+3+...+[_ (n-1)/3      _]) <- [_ _] is 'floor' function 

  1+2+3+...+k = k*(k+1)/2 <- closed-form expression, aka triangle numbers 
*/
//!------------------------------------

function sumMultiplesBelow(n) {

  return (
    - 15 * triangleNum(Math.floor((n-1)/15)) // multiples of 15 (3*5) are double counted
    +  3 * triangleNum(Math.floor((n-1)/ 3))
    +  5 * triangleNum(Math.floor((n-1)/ 5))
  );

}


//% n = 139024 is the first instance of difference between Number vs BigInt results

console.log(`
The sum of all the multiples of 3 or 5 below ${n} is 
${sumMultiplesBelow_n(BigInt(n))}
(as BigInt type)
`);

function sumMultiplesBelow_n(n) {
  return (
    - 15n * triangleNum_n((n-1n)/15n) // BigInt type rounds to 0 on division (implicit floor)
    +  3n * triangleNum_n((n-1n)/ 3n)
    +  5n * triangleNum_n((n-1n)/ 5n)
  );
}