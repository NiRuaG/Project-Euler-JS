
//% 1+2+3+...+k = k*(k+1)/2 <- closed-form expression, aka triangle numbers
exports.triangleNum = k => k*k+k >> 1;

exports.triangleNum_n = k => k*k+k >> 1n;


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
exports.lcm2 = (x,y) => x*y/gcd2(x,y);

exports.gcd = (...x) => x.reduce(gcd2, x[0]);
exports.lcm = (...x) => x.reduce(lcd2, 1);