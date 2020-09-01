
require('dotenv').config();

var request = require('request');
const HtmlTableToJson = require('html-table-to-json');

module.exports = class Utils {

    async stakePercentage(stake) {
        return new Promise((resolve, reject) => {

            // let stake = '174,159,953.571034';
            let resp = stake.replace(/[\s,]+/g, '').trim();

            // 2 percente of stake
            let StakeProfit = resp * 0.02;

            resolve(StakeProfit);

        });


    }

    async getTopHolders() {

        return new Promise((resolve, reject) => {
            try {

                request(`https://rinkeby.etherscan.io/token/tokenholderchart/0x0813460faD836Eef970Cb191f90B09ac95E38b3a?range=10`, function (error, response, body) {

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

            } catch (error) {
                console.log('Some error ::', error)
            }


        });


    }





}

