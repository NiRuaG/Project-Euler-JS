const { gcd2 } = require('./index');

class Fraction {
  constructor(num, den) {
    this.num = num;
    this.den = den;
  }

  static fromInt = i => new Fraction(i, 1);
  static fromBigInt = i => new Fraction(i, 1n);

  plus = (that) => new Fraction(
    this.num * that.den + that.num * this.den,
    this.den * that.den
  );

  minus = (that) => new Fraction(
    this.num * that.den - that.num * this.den,
    this.den * that.den
  )

  div = (that) => new Fraction(
    this.num * that.den,
    this.den * that.num
  );

  mult = (that) => new Fraction(
    this.num * that.num,
    this.den * that.den
  );

  isGreaterThan = (that) => (
    // don't use toVal, in case these are BigInts
    this.num * that.den > that.num * this.den
  );

  toString = () => `${this.num}/${this.den}`;

  //! valueOf = () => this.num/this.den;

  // try conversion to Number in case using BigInt
  toVal = () => Number(this.num) / Number(this.den);

  reduce = () => {
    const div = gcd2(this.num, this.den);
    return new Fraction(
      this.num / div,
      this.den / div
    );
  }
}

module.exports = {
  Fraction,
  // FractionFrom
};