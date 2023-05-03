const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const secp = require('ethereum-cryptography/secp256k1')
const { utf8ToBytes, toHex, hexToBytes } = require("ethereum-cryptography/utils")

//hexToBytes
//npm run signMessage -- -p cb0e9281d35e035066f34ab491ca3bd5f5abb87bf96b3ba8dc85737a91a5ecc7 -d 3ebefedbd43cbd88f0504acd101df139ddce0656da699b8350c1db9eaf178970

let args = yargs(hideBin(process.argv))
    .option('private_key', {
        alias: 'p',
        type: 'string',
        description: 'Your Private Key',
        demandOption: true
    })
    .option('data', {
        alias: 'd',
        type: 'string',
        description: 'Payload to sign',
        demandOption: true
    })
    .parse()


let privKey = args.private_key;
let msgHash = args.data;

    secp.sign(hexToBytes(msgHash), privKey, { recovered: true }).then(data => {
    const [signature, recovery_bit] = data
    let sig = toHex(signature);
    console.log("Your Signature:", sig)
    console.log("Your Recovery Bit:", recovery_bit)
    let fullSig = sig + recovery_bit.toString()
    console.log("Copy and paste this as the full signature, this has the recovery bit attached to the end:\n", fullSig)
})
