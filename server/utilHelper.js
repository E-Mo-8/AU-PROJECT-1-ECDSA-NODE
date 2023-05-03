const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes, toHex, hexToBytes } = require("ethereum-cryptography/utils")


function getPubKey(_fullKey){
    let k256 = keccak256(_fullKey.slice(1, _fullKey.length));
    let kSlice = k256.slice(k256.length - 20, k256.length);
    return toHex(kSlice);
}


function verifySig(_sig, _msg, _pubKey){
    const msgHash = keccak256(utf8ToBytes(_msg));
    let actualSignature = _sig.slice(0, _sig.length - 1)
    let recoveryBit = parseInt(_sig[_sig.length - 1])
    const sigPubKey = secp.recoverPublicKey(msgHash, actualSignature, recoveryBit);
    const mainKey = getPubKey(sigPubKey);
    return mainKey == _pubKey
}

module.exports = {
    verifySig,
    getPubKey
}
