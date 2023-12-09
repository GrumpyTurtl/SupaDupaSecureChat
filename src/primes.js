const bigInt = require('big-integer');
const crypto = require('crypto');

console.log("hi");
// Function to generate a random 2048-bit prime number
function generate2048BitPrime() {
  const min = bigInt(2).pow(2047);
  const max = bigInt(2).pow(2048).minus(1);

  while (true) {
    const candidate = getRandomBigInt(min, max);
    if (isProbablePrime(candidate)) {
      return candidate;
    }
  }
}

// Function to generate two 2048-bit prime numbers
function generateTwo2048BitPrimes() {
  const prime1 = generate2048BitPrime();
  const prime2 = generate2048BitPrime();

  return [prime1, prime2];
}

// Helper function to check probable primality
function isProbablePrime(n) {
  return bigInt(n).isProbablePrime(10);
}

// Helper function to generate a random BigInt in a specified range
function getRandomBigInt(min, max) {
  const range = max.minus(min).plus(1);
  const randomBytes = crypto.randomBytes(Math.ceil(range.bitLength() / 8));
  const randomBigInt = bigInt.fromArray(Array.from(randomBytes), 256);
  return min.plus(randomBigInt.mod(range));
}