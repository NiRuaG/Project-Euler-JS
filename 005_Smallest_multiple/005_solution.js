const { lcm, lcm2 } = require('../helpers');

//% https://projecteuler.net/problem=5 
//% Published on Friday, 30th November 2001
//% Difficulty rating: 5%
/*
  * Smallest multiple
  * Problem 5
  
  2520 is the smallest number that can be divided each of the numbers from 1 to 10 without any remainder.
  
  ? What is the smallest possible number that is evenly divisible by all of the numbers from 1 to 20?
*/
// Answer: 232792560


//% https://www.hackerrank.com/contests/projecteuler/challenges/euler005/problem
/*
  ? What is the smallest positive number that is evenly divisible by all of the numbers from 1 to N?

  * Constraints
  1 <= N <= 40
*/


let n = process.argv[2] || 20; 

console.log(`\nThe smallest number that is evenly divisible by all of the numbers from 1 to ${n} is:`);


//* as Number type + LCM of array (set of numbers)
function LCM_Naturals_byArray(n) {
  const arr = [...Array(n).keys()].map(m => n - m); // makes an array [n, n-1,..., 1]
  return lcm(...arr);
}

console.log(`
${LCM_Naturals_byArray(Number(n))}
> as Number type
> with array of natural numbers
`);


//* as Number type + Primes Generator function
function LCM_Naturals_byGenerator(n) {

  let result = 1;

  const sqrtN = Math.sqrt(n);
  const  logN = Math.log (n);


  const pGen = require('../helpers').primes_1000_gen();
  let { done, value } = pGen.next();

  
  while(!done && value <= sqrtN) {
    const power = Math.trunc(logN / Math.log(value) + Number.EPSILON); // log(1000)/log(10) results in 2.999...6

    result *= value ** power;
    
    ({ done, value } = pGen.next());
  }

  if (done) {
    //* prime generator ran out
    // if we can be knowledgeable about our generator, we had the first 10000 primes, 
    // which probably also means our result will be too big as a Number anyways
    return NaN; // or throw
    //? TODO: carry on trying to generate primes, or fallback to LCM with range from last prime to n
  }

  while(!done && value <= n) {
    result *= value; // implicit power 1
    ({ done, value } = pGen.next());
  }
  
  if (done) {
    //* prime generator ran out
    // which probably also means our result will be too big as a Number anyways
    return NaN; // or throw
    //? TODO: carry on trying to generate primes, or fallback to LCM with range from last prime to n
  }

  return result;

}

console.log(`
${LCM_Naturals_byGenerator(Number(n))}
> as Number type
> with generator of primes
`);


//* as BigInt type
//! problem constraints n<=40 do not need BigInt type 
//! at n = 43 is the first instance of difference between Number vs BigInt results 
function LCM_Naturals_n(n) {
  let lcm_result = n;

  //! for a BigInt n, we might not want to make an array of its size, so loop instead
  for (let i = n - 1n; i > 1n; --i) {
    lcm_result = lcm2(lcm_result, i);
  }
  
  return lcm_result;
}

console.log(`
${LCM_Naturals_n(BigInt(n))}
> as BigInt type
> with iteration through natural numbers
`);