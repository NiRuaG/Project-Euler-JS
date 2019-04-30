//% https://projecteuler.net/problem=4 
//% Published on Friday, 16th November 2001
//% Difficulty rating: 5%
/*
  * Largest palindrome product
  * Problem 4
  
  A palindromic number reads the same both ways. 
  The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

  ? Find the largest palindrome made from the product of two 3-digit numbers.
*/
// Answer: 906609


//% https://www.hackerrank.com/contests/projecteuler/challenges/euler004/problem
/*
  A palindromic number reads the same both ways. 
  The smallest 6 digit palindrome made from the product of two 3-digit numbers is 
  101101 = 143 * 707. 

  ? Find the largest palindrome made from the product of two 3-digit numbers which is less than N.

  * Constraints
  101101 < N < 1000000
*/



let n = process.argv[2] || 999*999+1; // the largest product of two 3-digit numbers (+1 to search for numbers LESS than it)

console.log(`\nThe largest 6-digit palindrome # that is both made from the product of two 3-digit numbers and that is less than ${n} is:`);


//* Helper function
// returns the next largest palindrome number less than or equal to n, a 6- digit number
const largestPalindrome6 = (n) => {
  //? assumption: if (n < 100001 || n > 999999) return NaN;

  const [a,b,c,d,e,f] = Array.from(String(n)).map(Number);
  
  const pal0 = 
      a * 100001
    + b *  10010
    + c *   1100;
  // the default palindrome return value is abccba
  
  /* 
    ! if generalizing to numbers larger than 6-digits, consider an additional function to compute/generate these other possible return values
    With additional considerations if number is odd-digited 
  */
  const pal1 = pal0 - 1100; // abc'c'ba (c' being one less than c) 
  const pal2 = pal0 -  110; // ab'99b'a
  const pal3 = pal0 -   11; // a'9999a'
  

  if (c<d) return pal0; // default as is
  if (c>d) return pal1; // abc'c'ba
  
  // at this point, if have not returned, c = d
  if (b<e) return pal0; // default as is
  if (b>e) return (c!==0 ? pal1 : pal2); // abc'c'ba if c wasn't 0, o/w ab'99b'a 

  // at this point, if have not returned, b = e also
  if (a<=f) return pal0; // default as is

  // at this point a>f and we need to check which inner pairs are/not 0  
  if (c!==0) return pal1; // abc'c'ba
  if (b!==0) return pal2; // ab'99b'a
             return pal3; // a'9999a'
}

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
