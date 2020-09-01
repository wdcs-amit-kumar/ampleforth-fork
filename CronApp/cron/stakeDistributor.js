require('dotenv').config();
let mongoose = require('mongoose');
const Web3 = require('web3');
const ABI = require('../resource/abi');
let Utils = require('../helper/utils');

const web3 = new Web3(process.env.INFURA_ENDPOINT + process.env.INFURA_KEY);
let utils = new Utils();

(mongoose).Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(
    async () => {

        let pendingBatches = await utils.getTopHolders();
        console.log('----------------', pendingBatches)

        if (pendingBatches.length > 0) {
            try {

                console.log(':: Pending Batch Length ', pendingBatches.length)
                async function prepareData(index, pendingBatches) {

                    if (pendingBatches[index]) {
                        try {

                            let stake = pendingBatches[index]['Quantity (Token)']
                            let receiver = pendingBatches[index].Address

                            let tokens = await utils.stakePercentage(stake);
                            let tokenToSend = parseInt(tokens * 10 ** 9);
                            let tokenAddress = process.env.Contract_AMPL
                            const contractInstance = new web3.eth.Contract(ABI, tokenAddress);

                            let tokenBalance = await contractInstance.methods.balanceOf(process.env.System_Wallet).call();

                            // console.log('\n SYSTEM AMPL BALANCE :: ', tokenBalance)

                            let systemBalInWei = await web3.eth.getBalance(process.env.System_Wallet);
                            let systemEtherBal = Number(web3.utils.fromWei(`${systemBalInWei}`, 'ether'));

                            // console.log('\n SYSTEM ETH BALANCE :: ', systemEtherBal)

                            let transfer = contractInstance.methods.transfer(`${receiver}`, `${tokenToSend}`);
                            let encodedABI = transfer.encodeABI();

                            const txNonce = await web3.eth.getTransactionCount(`${process.env.System_Wallet}`, 'pending');
                            console.log('NONCE ::', txNonce)

                            if (txNonce == 0 || txNonce == null) {

                                console.log('Nonce Error : no transaction made from this wallet')

                            }else if (txNonce) {
                                    let txnObject = {
                                        from: process.env.System_Wallet,
                                        to: tokenAddress,
                                        gasPrice: web3.utils.toHex(web3.utils.toWei(`${process.env.GAS_PRICE}`, 'Gwei')),
                                        gas: web3.utils.toHex(`${process.env.GAS_LIMIT}`),
                                        value: "0x0",
                                        nonce: web3.utils.toHex(txNonce),
                                        data: encodedABI
            
                                    };

                    
                                const Tx = require('ethereumjs-tx').Transaction

                                let tx = new Tx(txnObject, { chain: `${process.env.ETH_NET}`, hardfork: 'petersburg' });

                                let privateKey = (`${process.env.System_Wallet_PrivateKey}`).substring(2, 66)
                                const ac1_pvtkey = Buffer.from(privateKey.toString(), 'hex');
                                tx.sign(ac1_pvtkey);
                                let serializedTx = tx.serialize();

                                await signingTransaction(serializedTx, pendingBatches[index])

                            } else
                                console.log('transaction nonce is invalid')

                        } catch (err) {
                            console.log('Error : Changing status to Pending', err)

                        }
                        index = index + 1;
                        await prepareData(index, pendingBatches);
                    }

                } await prepareData(0, pendingBatches);

                async function signingTransaction(serializedTx, input) {
                    return new Promise(async (resolve, reject) => {

                        await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                            .on('receipt', async function (transactionReceipt) {
                                console.log("\n::::Transaction reciept ", transactionReceipt);

                                resolve(true)

                            }).on('error', async function (err) {

                                console.log("\nError: Some Error :: Receipt Generation ", err)
                               
                                resolve(false)
                            })

                    })

                }

            } catch (err) {
                console.log('Some problem in main try block', err)
                process.exit(1);
            }


        } else {
            console.log('\n\n--------------------------------------------------------')
            console.log('         Nothing to process : Cron is existing ')
            console.log('--------------------------------------------------------\n\n')
            process.exit(1);
        }


    });

