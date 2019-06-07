const { isPowerOf2, modularInverse } = require('../helpers');
const { Fraction       } = require('../helpers/Fraction');

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
 512, 513,
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

  // The external point-state after P1 receives 1 point and it is then P2's turn
  const {
    P2_turn: ext_P2,
    approx: { P2_turn: ext_P2_approx },
    T: ext_P2_T
  } = P2_Win_Chance(P2_points - 1, pointsToWin - 1); // reduce current point-state parameters both by 1 for an equivalent game state


  // The maximum choice (# of tosses) P2 would need to win

  // we can get an UPPER bound on the # of tosses to check for this current state 
  // by going off of the best toss choice made from the above external game
  // our max tosses in the current game will (almost) never be more than that of the external (if it exists)
  const tosses_max =
    (ext_P2_T && P2_pointsToWin !== 18) // we still have to check the external game had a choice (wasn't a constant win/loss state)
                                        //! @ 18, is the only row (at least within points range [1<=p<=175] that doesn't have T's as strictly non-increasing
      ? ext_P2_T
      : Math.ceil(Math.log2(P2_pointsToWin)) + 1 // otherwise this is the minimum # of tosses that gives enough points for P2 to win the game (we don't need to go higher than this)
    ;


  //* Iterate over # of tosses to find best choice

  //* # of tosses = 1
  // an external point-state: after P2 receives 1 points, and it is then P1's turn
  const {
    P1_turn: ext_P1,
    approx: { P1_turn: ext_P1_approx },
    T: ext_P1_T
  } = P2_Win_Chance(P2_points + 1, pointsToWin); // add gained points to current P2's point total for an equivalent game state

  // Evaluate current state's win chances
  const P1_turn = f[2].mult(ext_P2).plus(ext_P1).div(f[2 + 1]); // with # tosses = 1, q = 2
  const P2_turn = f[2].mult(P1_turn).minus(ext_P2);
  let approx = {}; // approximate values of best chances
  approx.P1_turn = (2 * ext_P2_approx  + ext_P1_approx) / (2 + 1);
  approx.P2_turn =  2 * approx.P1_turn - ext_P2_approx;

  // best chances for P2 to win, and their approximations
  let best = { P1_turn, P2_turn, approx, T: 1 }; // initialize with what we have now

  //* other tosses in range <= tosses_max
  // tosses is P2's choice for the # of tosses to gamble (must flip all heads to get any points)

  // we can get TRY to get a better LOWER bound on the # of tosses to check for this current state 
  // by going off of the best toss choice made from the above external game
  // our tosses in the current game will (usually) need to be at least as much as that of the external
  let tosses =
    ( ext_P1_T                          // check that it exists (wasn't a constant win/loss state)
      && ext_P1_T > 2                   // and that it's more than 2, which we'd default to otherwise
      && !isPowerOf2(P2_pointsToWin-1)) // ! @ powers of 2 +1, then the above isn't always true
      ? ext_P1_T
      : 2 // otherwise just set it as next possible number = 2
    ;

  // q is the reciprocal of the percentage chance P2 can flip all T heads
  // tosses=1 -> q=2 (recip. of 1/2), tosses=2 -> q=4 (recip of 1/4), etc.
  let q = 1 << tosses; // q = 2^tosses

  // pointsGained is amount of points P2 will gain with this choice
  let pointsGained = q >> 1; // points gained is equal to q/2
  
  
  for (; tosses <= tosses_max; ++tosses, pointsGained <<= 1, q <<= 1) {
    // as # of tosses steps up, the points gained and q chance step up by powers of 2

    // an external point-state: after P2 received G points, and it is then P1's turn
    const {
      P1_turn: ext_P1,
      approx: { P1_turn: ext_P1_approx }
    } = P2_Win_Chance(P2_points + pointsGained, pointsToWin); // add gained points to current P2's point total for an equivalent game state

    // the current state's chance that P2 wins, when it is P1's turn
    // = (q*[ext.P2] + [ext.P1]) / (q+1)
    const app = (q * ext_P2_approx + ext_P1_approx) / (q + 1); // just use approximate values first
    // const P1_turn = f[q].mult(ext_P2).plus(ext_P1).div(f[q + 1]); // if needing more exactness

    // check if this flip choice is better than best, and if so update best
    if (app > approx.P1_turn) { // if needing more exactness if (P1_turn.isGreaterThan(best.P1_turn)) {

      approx.P1_turn = app;  // or calculate now approx.P1_turn = (q * ext_P2_approx + ext_P1_approx) / (q + 1);
      const P1_turn = f[q].mult(ext_P2).plus(ext_P1).div(f[q + 1]);

      // the current state's chance that P2 wins, when it is P2's turn
      // P1_turn = ([ext.P2] + P2_turn)/2
      // P2_turn = 2*P1_turn - [ext.P2]
      const P2_turn = f[2].mult(P1_turn).minus(ext_P2);
      approx.P2_turn = 2 * approx.P1_turn - ext_P2_approx;

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

  let { P1_turn, approx: { P1_turn: approx } } = P2_Win_Chance(0, points);
  // P1_turn = P1_turn.reduce();
  const { num, den } = P1_turn;  

  //*Extra work for Hacker Rank output (modular division)
  const m = 1000000007n;
  const num_mod_m = num % m;
  const HR_answer = (modularInverse(den, m) * num_mod_m) % m;

  return {
         fraction: P1_turn.toString(),
    approximately: approx,
        numerator: num,
      denominator: den,
        HR_answer
  };
}


console.log(
Race_P2_Win_Percentage(Number(n))
);

/* memo.forEach((row, k) => {
  if (k === 0) { return; }
  console.log(
    { k: String(k).padStart(3) },

    String(
    row.every(({ T }, p) => (
      //  (p <= 1 || row[p - 1].T >= T)
      (k === 1 || memo[k-1][p].T <= T)
    ))
    ).padEnd(5),

    row.slice(1).map(({T}) => T>1 ? T : '').join('')
  );
}); */