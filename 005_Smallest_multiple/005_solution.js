//% https://projecteuler.net/problem=5 
//% Published on Friday, 30th November 2001
//% Difficulty rating: 5%
/*
  * Smallest multiple
  * Problem 5
  
  2520 is the smallest number that can be divided each of the numbers from 1 to 10 without any remainder.
  
  ? What is the smallest possible number that is evenly divisible by all of the numbers from 1 to 20?
*/
// TODO: Answer: 


//% https://www.hackerrank.com/contests/projecteuler/challenges/euler004/problem
/*
  ? What is the smallest positive number that is evenly divisible by all of the numbers from 1 to N?

  * Constraints
  1 <= N <= 40
*/


let n = process.argv[2] || 20; 

console.log(`\nThe smallest number that is evenly divisible by all of the numbers from 1 to ${n} is:`);


//* as Number type
function largestPalindromeAsProduct(n) {
  
  let [a,b,c] = Array.from(String(largestPalindrome6(n-1))).map(Number); // the largest palindrome less than n (6-digit number)

  
  while (a > 0) {
    while (b >= 0) {
      while (c >= 0) {

        const pal = 
          a*100001+
          b* 10010+
          c*  1100;
        
        for(let d = 990; d>99; d-=11){
          if(pal%d===0 && pal/d < 1000) return [pal, d];
        }

        --c;
      }

      --b;
      c = 9;
    }

    --a;
    b = 9;
  }

  return ["not found!?"];
}

const [ret, div] = largestPalindromeAsProduct(Number(n));
console.log(`
${ret} = ${div} * ${ret/div}
`);


//* as BigInt type
//! problem constraints do not need BigInt type
