const { triangleNum, triangleNum_n } = require('../helpers');


//% https://projecteuler.net/problem=1 
//% Published on October 5th 2001
//% Difficulty rating: 5%
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

console.log(`\nThe sum of all the multiples of 3 or 5 below ${n} is`);


const sumMultiplesBelow = (n) => (
     3 * triangleNum(Math.floor((n-1)/ 3))
  +  5 * triangleNum(Math.floor((n-1)/ 5))
  - 15 * triangleNum(Math.floor((n-1)/15)) // multiples of 15 (3*5) are double counted
);

console.log(`
${sumMultiplesBelow(n)}
(as Number type)
`);


//! n = 139024 is the first instance of difference between Number vs BigInt results

const sumMultiplesBelow_n = (n) => (
     3n * triangleNum_n((n-1n)/ 3n) // BigInt type rounds to 0 on division (implicit floor)
  +  5n * triangleNum_n((n-1n)/ 5n) 
  - 15n * triangleNum_n((n-1n)/15n) 
);

console.log(`
${sumMultiplesBelow_n(BigInt(n))}
(as BigInt type)
`);