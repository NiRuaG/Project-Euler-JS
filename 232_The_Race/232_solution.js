const { Fraction } = require('./../helpers/Fraction');

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
// Answer: 0.83648556


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


// These are the (big) integers as fractions which we'll want to keep around
// They are used as constants, multipliers, & denominators and center around values of q (powers of 2)
// q and q+1 
const f = {};
[  0,   1,
   2,   3,
   4,   5,
   8,   9,
  16,  17,
  32,  33,
  64,  65,
 128, 129,
 256, 257,
].forEach(n => {
  f[n] = Fraction.fromBigInt(BigInt(n));
});

let memo;

function P2_Win_Chance(P2_points, pointsToWin) {

  //% Assumes to be an equivalent game state, ** where P1 is at 0 points **
  // P2 points can be negative given above assumption

  const P2_pointsToWin = pointsToWin - P2_points; 


  //* Check for constant win chance states
  // P2 won - if they have 0 or less points needed to win
  if (P2_pointsToWin <= 0) return { P1_turn: f[1], approx: { P1_turn: 1 } }; 
  // P1 won - if this equiv. game state has pointsToWin is 0
  if (pointsToWin === 0) return { P2_turn: f[0], approx: { P2_turn: 0 } }; 


  //* Check for if state has been memoized
  const haveMemo = memo[P2_pointsToWin][pointsToWin];
  if (haveMemo) { return haveMemo; }


  //* Evaluate P2's best choice and chances to win for this state
  let best = { P1_turn: f[0] }; // best chances for P2 to win (on P1's turn and P2's turn)
  let approx = {}; // approximate values of best chances

  const tosses_max = Math.ceil(Math.log2(P2_pointsToWin)) + 1; // the maximum choice (# of tosses) P2 would need to win

  // tosses is P2's choice for the # of tosses to gamble (must flip all heads to get any points)
  // pointsGained is amount of points P2 will gain with this choice
  // q is the RECIPROCAL of the percentage chance P2 can flip all T heads
  // tosses=1 -> q=2 (recip. of 1/2), tosses=2 -> q=4 (recip of 1/4), etc.

  for (
    let tosses = 1, pointsGained = 1  , q = 2
    ; tosses <= tosses_max
    ; ++tosses    , pointsGained <<= 1, q <<= 1
    // as # of flips steps up, points gained and q chance step up by powers of 2
  ){

    //? TODO: anything to gain knowing as pointsToWin increases, T never increases?

    // an external point-state: after P1 receives 1 point and it is then P2's turn
    const { P2_turn: ext_P2, approx: { P2_turn: ext_P2_approx } } =
    // reduce current point-state parameters both by 1 for an equivalent game state
      P2_Win_Chance(P2_points - 1, pointsToWin - 1);


    // an external point-state: after P2 received G points, and it is then P1's turn
    const { P1_turn: ext_P1, approx: { P1_turn: ext_P1_approx } } =
      // add gained points to current P2's point total for an equivalent game state
      P2_Win_Chance(P2_points + pointsGained, pointsToWin);


    // the current state's chance that P2 wins, when it is P1's turn
    // = (q*[ext.P2] + [ext.P1]) / (q+1)
    const P1_turn = f[q].mult(ext_P2).plus(ext_P1).div(f[q+1]);


    // check if this flip choice is better than best, and if so update best
    if (P1_turn.isGreaterThan(best.P1_turn)) {
      // = (q*[ext.P2] + [ext.P1]) / (q+1)
      approx.P1_turn = (q * ext_P2_approx + ext_P1_approx) / (q + 1);

      // the current state's chance that P2 wins, when it is P2's turn
      // P1_turn = ([ext.P2] + P2_turn)/2
      // P2_turn = 2*P1_turn - [ext.P2]
      const P2_turn = f[2].mult(P1_turn).minus(ext_P2);
      approx.P2_turn = 2*approx.P1_turn - ext_P2_approx;

      best = { P1_turn, P2_turn, T: tosses };
    }

  }

  // reduce fractions for best, and include approximate values
  best.P1_turn = best.P1_turn.reduce();
  best.P2_turn = best.P2_turn.reduce();
  best = { ...best, approx };

  memo[P2_pointsToWin][pointsToWin] = best; // whatever is returned, add to memo
  return best;
}


function Race_P2_Win_Percentage(points) {

  // setup memoize array
  memo = [...Array(points+1)].map(_ => Array(points+1)); // +1 to accommodate 0-base indexing

  const { P1_turn, approx: { P1_turn: approx } } = P2_Win_Chance(0, points);
  const { num, den } = P1_turn;

  return {
         fraction: P1_turn.toString(),
        numerator: num,
      denominator: den,
    approximately: approx
  };
}


console.log(
Race_P2_Win_Percentage(Number(n))
);
