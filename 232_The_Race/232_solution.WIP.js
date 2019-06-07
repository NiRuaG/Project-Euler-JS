const { isPowerOf2 } = require('../helpers');

class PrimeFact {
  static isZero = Symbol("Is Zero");
  get isZero() {
    return this[PrimeFact.isZero];
  }
  static ZERO = (Object.assign(new PrimeFact(), { [PrimeFact.isZero]: true }));

  constructor(primesObj = {}) {
    this[PrimeFact.isZero] = false;
    this.primes = primesObj;
  }
}

class SFraction {
  static isZero = Symbol("Is Zero");
  get isZero() {
    return this[SFraction.isZero];
  }
  static ZERO = (Object.assign(new SFraction(), { [SFraction.isZero]: true }));

  constructor(num, den) {
    this.num = num;
    this.den = den;
    this[SFraction.isZero] = false;
  }

  times = (scalar) => {
    if (this.isZero || scalar.isZero) { return SFraction.ZERO; }

    // this.den.
  }
}

class PrimeRational {

  static isZero = Symbol("Is Zero");
  get isZero() {
    return this[PrimeRational.isZero];
  }
  static ZERO = (Object.assign(new PrimeRational([]), { [PrimeRational.isZero]: true }));

  

  constructor(groupsArr) {
    this[PrimeRational.isZero] = false;
    this.groups = Array(groupsArr.length);

    let idx = -1;
    for(let group of groupsArr) {
      // shallow copy, should be alright if group object values should be all primitive number types
      this.groups[++idx] = {...group}; 
    };
  }

  // static fromPrime = p => new PrimeRational([{ [p]: 1 }]);
  // static fromFraction = (num, denom) => new PrimeRational(
  //   [{
  //     [num]: 1,
  //     [denom]: -1
  //   }]
  // );

  mult = (that) => {
    if (this.isZero || that.isZero) { return PrimeRational.ZERO; }

    const resultGroups = Array(this.groups.length * that.groups.length);

    let idx = -1;

    for (let ourPrimesInGroup of this.groups) {
      for (let theirPrimesInGroup of that.groups) {
        const currPrimes = { ...ourPrimesInGroup }; // shallow copy our group;

        for(let prime in theirPrimesInGroup) {
          currPrimes[prime] = (currPrimes[prime] || 0) + theirPrimesInGroup[prime];
        }

        resultGroups[++idx] = currPrimes;
      }
    }

    return new PrimeRational(resultGroups);
  }

  times = (scalar) => {
    if (this.isZero || scalar.isZero) { return PrimeRational.ZERO; }
  }

  divSingle = (that) => {
    if (that.isZero) { throw new Error("Divide by Zero"); }
    if (this.isZero) { return PrimeRational.ZERO; }
    
    const that1 = that.groups[0]; //! taking only the first group element of the input PrimeRational
    const resultGroups = Array(this.groups.length);

    let idx = -1;

    for (let ourPrimesInGroup of this.groups) {
      const currPrimes = { ...ourPrimesInGroup }; // shallow copy our group;

      for(let prime in that1) {
        currPrimes[prime] = (currPrimes[prime] || 0) - that1[prime]; //! div means SUBTRACT these powers
      }

      resultGroups[++idx] = currPrimes;
    }

    return new PrimeRational(resultGroups);
  }

  plus = (that) => {
    if (this.isZero) return new PrimeRational([...that.groups]);
    if (that.isZero) return new PrimeRational([...this.groups]);
    /* else */       return new PrimeRational([...this.groups, ...that.groups]);
  }
}

 
const n = process.argv[2] || 100;

console.log(`\nThe probability that Player 2 wins "The Race" to ${n} points is:`);


// These are the integers as prime factors which we'll want to keep around
// They are used as constants, multipliers, & denominators and center around values of q (powers of 2)
// q-1, q, q+1 

const Qs = {};
Qs[0] = PrimeRational.ZERO;

for( let [q, primes] of Object.entries(
  {
                                     1: { 2: 0 }, //? could be a lot things, consider another "sentinel" symbol
                                     2: { 2: 1 },   3: {   3: 1        },
                                     4: { 2: 2 },   5: {   5: 1        },
      7: {   7: 1               },   8: { 2: 3 },   9: {   3: 2        },
     15: {   3: 1,  5: 1        },  16: { 2: 4 },  17: {  17: 1        },
     31: {  31: 1               },  32: { 2: 5 },  33: {   3: 1, 11: 1 },
     63: {   3: 2,  7: 1        },  64: { 2: 6 },  65: {   5: 1, 13: 1 },
    127: { 127: 1               }, 128: { 2: 7 }, 129: {   3: 1, 43: 1 },
    255: {   3: 1,  5: 1, 17: 1 }, 256: { 2: 8 }, 257: { 257: 1        },
    511: {   7: 1, 73: 1        }, 512: { 2: 9 }, 513: {   3: 3, 19: 1 }
  }
)){
  Qs[q] = new PrimeRational([primes]); //! (group) array of the single prime object element
}
//! unique primes involved with q: 2, 3, 5, 7, 11, 13, 17, 19, 31, 43, 73, 127, 257
//? could use these as the specific object properties in PrimeFactors (for less property lookup)

let memo;

function P2_Win_Chance(n, p) {

  const k = p - n;

  //* Check for constant win chance states
  if (k <= 0) {
    console.log("accesing: win");
    return { A: Qs[1], approx: { A: 1 } };
  }

  if (p === 0) {
    console.log("accesing: loss");
    return { C: Qs[0], approx: { C: 0 } };
  } 


  //* Check for if state has been memoized
  const haveMemo = memo[k][p];
  if (haveMemo) {
    console.log("accessing:", k, p);
    return haveMemo;
  }


  //* Evaluate P2's best choice and chances to win for this state
  const {
    C: B,
    approx: { C: B_approx },
    T: B_T
  } = P2_Win_Chance(n - 1, p - 1); // reduce current point-state parameters both by 1 for an equivalent game state
  console.log("for P2_turn\n");


  
  //* Iterate T tosses
  //* T = 1
  // an external point-state: after P2 receives 1 points, and it is then P1's turn
  const {
    A: D,
    approx: { A: D_approx },
    T: D_T
  } = P2_Win_Chance(n + 1, p);
  console.log("for T=1\n");

  const A =   Qs[2].mult( B).plus(           D) .divSingle(Qs[2 + 1]); // with # tosses = 1, q = 2
  const C = /*Qs[1].mult*/B .plus(Qs[2].mult(D)).divSingle(Qs[2 + 1]); // with # tosses q-1 = 1
  //? const C = Qs[2].mult(A).minus(B);  
  //TODO: would need to implement minus fn

  let approx = {
    A: (2 * B_approx  + D_approx) / (2 + 1)
  };
  approx.C =  2 * approx.A - B_approx;

  let best = { A, C, approx, T: 1 };

  //* T bounds
  const T_max =
    (B_T && k !== 18) //! @ 18, is the only row (at least within points range [1<=p<=175] that doesn't have T's as strictly non-increasing
      ? B_T
      : Math.ceil(Math.log2(k)) + 1 
    ;

  let T =
    (D_T && D_T > 2 && !isPowerOf2(k-1))
      ? D_T
      : 2
    ;

  let q = 1 << T; // q = 2^T
  let G = q >> 1; // G = q/2

  //* T for-loop
  for (; T <= T_max; ++T, G <<= 1, q <<= 1) {
    const {
      A: D,
      approx: { A: D_approx }
    } = P2_Win_Chance(n + G, p);
    console.log("for trying T =", T);

    // = (qB+D)/(q+1)
    const app = (q * B_approx + D_approx) / (q + 1); 

    if (app > approx.A) { 
      console.log("was better\n");

      approx.A = app;
      const A = Qs[q  ].mult(B).plus(           D) .divSingle(Qs[q + 1]);
      const C = Qs[q-1].mult(B).plus(Qs[2].mult(D)).divSingle(Qs[q + 1]);
      //? const C = Qs[2].mult(A).minus(B);
      //TODO: would need to implement minus fn

      approx.C = 2 * approx.A - B_approx;

      best = { A, C, T };
    }
    else {
      console.log("not better\n");
    }

  }

  //? best.A = best.A.reduce();
  //? best.C = best.C.reduce();
  best = { ...best, approx };

  memo[k][p] = best;
  console.log("created", k, p);
  
  return best;
}

function Race_P2_Win_Percentage(points) {

  // setup memoize array
  memo = [...Array(points+1)].map(_ => Array(points+1)); // +1 to accommodate 0-base indexing

  let { A, approx: { A: approx } } = P2_Win_Chance(0, points);
  // A = A.reduce();
  const { num, den } = A;

  /* 
  //*Extra work for Hacker Rank output (modular division)
  const m = 1000000007n;
  const num_mod_m = num % m;
  const HR_answer = (modularInverse(den, m) * num_mod_m) % m;
 */

  return {
         fraction: A.groups,
           length: A.groups.length,
    approximately: approx,
        numerator: num,
      denominator: den,
        // HR_answer
  };
}


console.log(
Race_P2_Win_Percentage(Number(n))
);
 
/* memo.forEach((row, k) => {
  if (k === 0) { return; }
  console.log(
    { k },

    String(
    row.every(({ T }, p) => (
      //  (p <= 1 || row[p - 1].T >= T)
      (k === 1 || memo[k-1][p].T <= T)
    ))
    ).padEnd(5),

    row.slice(1).map(({T}) => T).join('')
  );
}); */

/* console.log();
memo.forEach((row, k) => {
  if (k === 0) { return; }
  console.log(
    { k },

    row.slice(1).map(({ P1_turn }) => P1_turn.groups)
  );
});

console.log();
memo.forEach((row, k) => {
  if (k === 0) { return; }
  console.log(
    { k },

    row.slice(1).map(({ P2_turn }) => P2_turn.groups)
  );
});  */