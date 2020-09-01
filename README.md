# Ampleforth Fork

Ampleforth Fork is a decentralized elastic supply protocol based on Ampleforth. It maintains a stable unit price by adjusting supply directly to and from wallet holders. You can read the [Ampleforth Whitepaper](https://www.ampleforth.org/paper/) for the motivation and a complete description of the protocol.

This repository is a collection of smart contracts that implement the Ampleforth protocol on the Ethereum blockchain.

## Table of Contents

- [Install](#install)
- [Testing](#testing)
- [Testnets](#testnets)


## Environment

node : 10.5.0
npm : 6.14.4

## Install

```bash
# Install project dependencies
npm install

# Install ethereum local blockchain(s) and associated dependencies
npx setup-local-chains
```

## Testing

``` bash
# You can use the following command to start a local blockchain instance
npx start-chain ganacheUnitTest

# Run all unit tests
npm test
```

## Testnets
There is a testnet deployment on Rinkeby.
- ERC-20 Token: [0x0813460faD836Eef970Cb191f90B09ac95E38b3a](https://rinkeby.etherscan.io/token/0x027dbcA046ca156De9622cD1e2D907d375e53aa7)
- Supply Policy: [0x0daE7F9ac75371A6Fa53EA57cF4C3bc5aD2a139C](https://rinkeby.etherscan.io/address/0x0daE7F9ac75371A6Fa53EA57cF4C3bc5aD2a139C)
- Orchestrator: [0xcCF463D06cd322C113664b82A1C9FDf7566C2aDd](https://rinkeby.etherscan.io/address/0xcCF463D06cd322C113664b82A1C9FDf7566C2aDd)



