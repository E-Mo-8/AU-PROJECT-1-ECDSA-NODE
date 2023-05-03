const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { getPubKey } = require("./utilHelper");






let privateKey = secp.utils.randomPrivateKey();
let pubKey = secp.getPublicKey(privateKey);

pubKey = getPubKey(pubKey);

console.log("Private key:", toHex(privateKey))
console.log("Public key:", pubKey)
