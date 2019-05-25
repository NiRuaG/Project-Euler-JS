//% https://projecteuler.net/problem=232 
//% Published on Friday, 13th February 2009
//% Difficulty rating: 65%
/*
 * The Race
 * Problem 232
 
 Two players share an unbiased coin and take it in turns to play "The Race". 
 On Player 1's turn, he tosses the coin once: if it comes up Heads, he scores one point; if it comes up Tails, he scores nothing. 
 On Player 2's turn, she chooses a positive integer T and tosses the coin T times: if it comes up all Heads, she scores 2^(T-1) points; otherwise, she scores nothing. 
 Player 1 goes first.  
 The winner is the first to 100 or more points.

 On each turn Player 2 selects the number, T, of coin tosses that maximises the probability of her winning.

 ? What is the probability that Player 2 wins?

 Give your answer rounded to eight decimal places in the form 0.abcdefgh .
*/
//TODO: Answer: 


//% https://www.hackerrank.com/contests/projecteuler/challenges/euler232/problem
/*
  The winner is the first to n or more points.

  ? What is the probability that Player 2 wins? 

  As the number is obviously rational and can be represented as p/q with integers p and q, write the answer as p * q^-1 (mod 10^9 + 7)
  
  * Constraints
  1 <= n <= 175
  
  *Sample Input 0
  1
  
  *Sample Output 0
  333333336
  
  *Explanation 0
  The answer is 1/3 which is equal to 333333336 (mod 10^9 + 7)
*/
/* Modular Division
   Given three positive numbers a, b and m. Compute a/b under modulo m. 
   The task is basically to find a number c such that (b * c) % m = a % m. */


const n = process.argv[2] || 100; 

console.log(`\nThe probability that Player 2 wins "The Race" to ${n} points is:`);


function Race_P2_Win_Percentage(n) {
  
  for(let )

  return "not implemented";
}

console.log(`
${Race_P2_Win_Percentage(Number(n))}
`);
