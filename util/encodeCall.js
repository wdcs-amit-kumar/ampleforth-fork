// import abi from 'ethereumjs-abi'
// import BN from 'bignumber.js'

const abi = require('ethereumjs-abi');
const BN = require('bignumber.js');


function formatValue(value) {
  if (typeof(value) === 'number' || BN.isBigNumber(value)) {
    return value.toString();
  } else {
    return value;
  }
}


module.export = function encodeCall(name, args = [], rawValues = []) {
// export default function encodeCall(name, args = [], rawValues = []) {
  const values = rawValues.map(formatValue)
  const methodId = abi.methodID(name, args).toString('hex');
  const params = abi.rawEncode(args, values).toString('hex');
  return '0x' + methodId + params;
}

