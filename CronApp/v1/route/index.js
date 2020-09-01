const express = require('express');
const router = express.Router();  

const WalletController = require('../controller/index');

router.post('/getTopHolders', async (req, res, next) => {
    const wallet = new WalletController(req, res, next);

    try {
        let result = await wallet.getTopHolders();
        res.status(200).send({ "message": "Success", "data": result })
   
    } catch (error) {

        res.status(500).send({ "message": `${error}`, "data": {} })
    }

});

router.post('/stakePercentage', async (req, res, next) => {
    const wallet = new WalletController(req, res, next);

    try {
        let result = await wallet.stakePercentage();
        res.status(200).send({ "message": "Success", "data": result })
   
    } catch (error) {

        res.status(500).send({ "message": `${error}`, "data": {} })
    }

});

module.exports = router;