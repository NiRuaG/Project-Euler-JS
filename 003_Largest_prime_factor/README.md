# Problem 3 - Largest prime factor
## Notes / Logic / Explanations 

Not much to this past idea of prime factorization = that all integers can be expressed as the product of only primes (possibly each to powers greater than 1). 
#
Start with small primes, factor them out as much as possible and continue checking larger numbers (ideally primes) until you're left with the starting number's highest prime.
<pre>
SOME_BIG_NUM = its_largest_prime^some_power * second_largest_prime(maybe)^some_other_power * ... *
3(maybe)^(3s_power) * 2(maybe)^(2s_power)

eg
600851475143 = p_1 ^ a_1 * p_2 ^ a_2 * ... * 3?^(0 or more?) * 2?^(0 or more?)
what is its largest prime p_1?
</pre>


The first (smallest) prime "hit" for this number's divisor is 71, and only one power of it.
<pre>
600851475143 = p_1 ^ a_1 * p_2 ^ a_2 * ... * 71^1
</pre>


Knowing this, the problem can be reduced to then asking what the largest prime of
600851475143 / 71 is:
<pre>
600851475143      = p_1 ^ a_1 * ...                   * 71^1
600851475143 / 71 = p_1 ^ a_1 * ... * prime_>71? ^ a
  8462696833      = p_1 ^ a_1 * ... * prime_>71? ^ a
</pre>


We can continue checking numbers (ideally primes) greater than 71: we get 839 and afterwards 1471, both of single powers.
<pre>
600851475143 = p_1 ^ a_1 * ... * 1471^1 * 839^1 * 71^1

which means
  8462696833 = p_1 ^ a_1 * ... * 1471^1 * 839^1

which means
    10086647 = p_1 ^ a_1 * ... * 1471^1 

which means
        6857 = p_1 ^ a_1 * ... * a_prime_>1471?
</pre>


The nice part here is that because the square of the last prime found is greater than the factor that remains (ie 1471*1471 > 6857), we know there can not be any greater primes, and that the remaining factor IS (its greatest) prime.
<pre>
600851475143 =  p_1^a_1 * ...             * p^a ,     found   p^a   =   71^1
  8462696833 =  p_1^a_1 * ...       * p^a       ,     found   p^a   =  839^1
    10086647 =  p_1^a_1 * ... * p^a             ,     found   p^a   = 1471^1
        6857 = 6857^1                           , know that p_1^a_1 = 6857^1
</pre>
