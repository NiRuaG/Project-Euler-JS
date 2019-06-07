
//% 1+2+3+...+k = k*(k+1)/2 <- closed-form expression, aka triangle numbers
exports.triangleNum = k => k*k+k >> 1;

exports.triangleNum_n = k => k*k+k >> 1n;

exports.isPowerOf2 = n => (n & (n - 1));

const primes_1000 = require('./primes_1000.json');
exports.primes_1000 = primes_1000;
exports.primes_1000_gen = function*() {
  let i=0;
  while(i < primes_1000.length) {
    yield primes_1000[i++];
  }
  return primes_1000[--i]; // give the last value generated as part of { done: true }
}

const gcd2 = (x,y) => {
  while (y) {
    [x, y] = [y, x % y];
  }
  return x;
}
exports.gcd2 = gcd2;

const lcm2 = (x,y) => (x/gcd2(x,y))*y;
exports.lcm2 = lcm2;

exports.gcd = (...x) => x.reduce(gcd2, x[0]);
exports.lcm = (...x) => x.reduce(lcm2, 1);

const gcd2_extended = (a, b) => {
  if (typeof a !== typeof b) {
    throw new Error("gcd2_extended requires both arguments be of the same type");
  }
  
  const isBigInt = (typeof a === "bigint");

  let [r0, r] = [a, b];
  let [s0, s] = isBigInt ? [1n, 0n] : [1, 0];
  let [t0, t] = isBigInt ? [0n, 1n] : [0, 1];

  while (r) {
    const q = ~~(r0 / r); // integer quotient, works for regular and BigInt
    [r0, r] = [r, r0 - q*r];
    [s0, s] = [s, s0 - q*s];
    [t0, t] = [t, t0 - q*t];
  }

  return {
    r: r0,
    s: s0,
    t: t0,
  };
}
exports.gcd2_extended = gcd2_extended;

exports.modularInverse   = (a, n) => (gcd2_extended  (a, n).s + n) % n;