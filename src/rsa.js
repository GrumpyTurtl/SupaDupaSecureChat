
var p = 61
var q = 53;


const keys = calcKeys(p, q);
const pubKey = keys[0];
const privateKey = keys[1];

var msg = stringToNumbers('hi');
var encryptedMsg = rsaEncrypt(msg, pubKey);
var decryptedMsg = rsaDecrypt(encryptedMsg, privateKey);

console.log(msg, encryptedMsg, numbersToString(decryptedMsg));

function stringToNumbers(inputString) {
    let resultNumbers = '';
    for (let i = 0; i < inputString.length; i++) {
      let charCode = inputString.charCodeAt(i).toString();
      if (charCode.length === 1) {
        charCode = '0' + charCode;
      }
      resultNumbers += charCode;
    }
    return resultNumbers;
  }
  
  function numbersToString(inputNumbers) {
    let resultString = '';
    for (let i = 0; i < inputNumbers.length; i += 2) {
      let charCode = '' + inputNumbers[i] + inputNumbers[i + 1];
      resultString += String.fromCharCode(parseInt(charCode, 10));
    }
    return resultString;
  }
  

function calcKeys(p, q){
    const n = q * p
    const phiN = (p - 1) * (q - 1);
    const e = calculateE(phiN);

    return [[e, n], [modInverse(e, phiN), n]];
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function calculateE(phiN) {
    for (let e = 2; e < phiN; e++) {
        if (gcd(e, phiN) === 1) {
            return e;
        }
    }
    return null; // No suitable e found
}

function rsaEncrypt(message, pubKey){
    const [e, n] = pubKey;
    return modExp(message, e, n)
}

function modExp(base, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

function modInverse(a, m) {
    const m0 = m;
    let x0 = 0;
    let x1 = 1;

    while (a > 1) {
        const q = Math.floor(a / m);
        let temp = m;
        m = a % m;
        a = temp;

        temp = x0;
        x0 = x1 - q * x0;
        x1 = temp;
    }

    return x1 < 0 ? x1 + m0 : x1;
}

function rsaDecrypt(ciphertext, privateKey) {
    const [d, n] = privateKey;
    return modExp(ciphertext, d, n);
}

