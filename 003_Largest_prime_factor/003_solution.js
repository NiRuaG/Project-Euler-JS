//% https://projecteuler.net/problem=3 
//% Published on Friday, 2nd November 2001
//% Difficulty rating: 5%
/*
  * Largest prime factor
  * Problem 3

  The prime factors of 13195 are 5, 7, 13 and 29.

  ? What is the largest prime factor of the number 600851475143?
*/
// Answer: 6857


//% https://www.hackerrank.com/contests/projecteuler/challenges/euler003/problem
/*
  The prime factors of 13195 are 5, 7, 13 and 29.

  ? What is the largest prime factor of a given number N?

  * Constraints
  10 <= N <= 10^12
*/



let n = process.argv[2] || 600851475143;

console.log(`\nThe largest prime factor of ${n} is `);


//* Reusable function
// divide/take out all factors of v from n, then see if one of them is the greatest prime factor
const divideOutAndCheck = (n, v) => {
  //! loose equalities -> works for both Number AND BigInt types

  while ((n % v) == 0) { n /= v; }

  if (n == 1) { return [true, v] }; // the value divided out of n was its largest prime, and n was a power of it (eg v*v*v = n)

  if (v * v > n) { return [true, n] }; // there are no more factors to divide out, n will now be the largest prime itself

  return [false, n]; // there are potentially more prime factors, return n, which may have been reduced by factors of v
}


//* Number type
function largestPrimeFactor(n) {  
  if (n === 1) { return 1; }

  //! check for n (not 0) avoids overflow problems (eg n=9007199254740992 or 9007199254740993)
  while(n && (n&1) === 0) { n >>= 1; } // take out factors of 2 (special testing & division)
  if (n === 1) { return 2; }
  if (n === 0) { return NaN; } //! there was overflow (assuming n > 0)

  
  let doReturn; // flag variable indicating if should return

  if ([doReturn, n] = divideOutAndCheck(n, 3), doReturn) { return n }; // take out factors of 3
  
  // after taking out factors of 2 and 3, further primes can only be at 6k+1 or at 6k-1, for integers k > 0
  // 6k+{0, 2, or 4} would have already been divided out by 2
  // 6k+3 divided out by 3
  let sixSteps = 6;

  while (
       !([doReturn, n] = divideOutAndCheck(n, sixSteps-1), doReturn)
    && !([doReturn, n] = divideOutAndCheck(n, sixSteps+1), doReturn))
  {
    sixSteps += 6;
  }

  return n;
}

console.log(`
${largestPrimeFactor(Number(n))}
> as Number type
`);


//* Number type + Primes Generator function
function largestPrimeFactor_gen(n) {
  if (n === 1) { return 1 }

  const pGen = require('../helpers').primes_1000_gen();

  let { done, value } = pGen.next(); 
  let doReturn; // flag variable indicating if should return

  while( !done
      && !([doReturn, n] = divideOutAndCheck(n, value), doReturn))
  {
    ({ done, value } = pGen.next());
  }

  // prime generator had enough primes
  if (!done && doReturn) return n;

  //* prime generator ran out
  // the last prime value would have been 6k-1 or 6k+1 (for some integer k)
  // if it was the +1 (value%6 === 1) then go to the NEXT multiple-of-6-step (current value +5)
  // if it was the -1 instead, then we have to stay at this multiple-of-6-step (current value +1)
  // this will end up checking the same 6k-1 value again, but the loop will now include checking the +1 side as well
  let sixSteps = (value + (value%6 === 1 ? 5 : 1));

  while (
       !([doReturn, n] = divideOutAndCheck(n, sixSteps - 1), doReturn)
    && !([doReturn, n] = divideOutAndCheck(n, sixSteps + 1), doReturn))
  {
    sixSteps += 6;
  }

  return n;
}

console.log(`
${largestPrimeFactor_gen(Number(n))}
> as Number type
> with primes generator
`);


//* BigInt type
//! n = 9007199254740993 is an instance of difference between Number vs BigInt results

function largestPrimeFactor_n(n) {
  if (n === 1n) { return 1n };

  let doReturn; // flag variable indicating if should return

  if ([doReturn, n] = divideOutAndCheck(n, 2n), doReturn) return n;
  if ([doReturn, n] = divideOutAndCheck(n, 3n), doReturn) return n;
  
  // after taking out factors of 2 and 3, further primes can only be at 6k+1 or at 6k-1, for integers k > 0
  // 6k+{0, 2, or 4} would have already been divided out by 2
  // 6k+3 divided out by 3
  let sixSteps = 6n;

  while (
       !([doReturn, n] = divideOutAndCheck(n, sixSteps - 1n), doReturn)
    && !([doReturn, n] = divideOutAndCheck(n, sixSteps + 1n), doReturn))
  {
    sixSteps += 6n;
  }

  return n;
}

console.log(`
${largestPrimeFactor_n(BigInt(n))}
> as BigInt type
`);
