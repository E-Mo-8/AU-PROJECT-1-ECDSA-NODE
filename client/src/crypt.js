import { keccak256 } from "ethereum-cryptography/keccak"
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils"

export async function hashMsg(_msg){
    const msgU8TB = utf8ToBytes(_msg);
    const msgK256 = keccak256(msgU8TB);
    return toHex(msgK256);
}
