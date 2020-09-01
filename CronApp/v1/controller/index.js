
require('dotenv').config();
var request = require('request');

const HtmlTableToJson = require('html-table-to-json');

module.exports = class WalletController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async getTopHolders() {

        return new Promise((resolve, reject) => {
            request(`https://rinkeby.etherscan.io/token/tokenholderchart/0x0813460faD836Eef970Cb191f90B09ac95E38b3a`, function (error, response, body) {

                function getBody(content) {
                    var x = content.indexOf("<table");
                    x = content.indexOf(">", x);
                    var y = content.lastIndexOf("</table>");
                    return content.slice(x - 33, y);
                }

                let test = getBody(body);
                const jsonTables = HtmlTableToJson.parse(test);
                let holdersExceptOwner = jsonTables.results[0].slice(1)

                console.log('FINAL :::: ', holdersExceptOwner)
                resolve(holdersExceptOwner);
            });
        });


    }

    async stakePercentage() {
        return new Promise((resolve, reject) => {

            let stake = '174,179,272.33611';
            let resp = stake.replace(/[\s,]+/g, '').trim();

            // 2 percente of stake
            let StakeProfit = resp * 0.02;
            console.log('################', StakeProfit)

            resolve(StakeProfit);

        });


    }


}
