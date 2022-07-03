# Week 2 Project

Here is the steps

```shell
yarn install
yarn ts-node scripts/operate.ts
```
You will see below logs:
```shell
Owner signer address:  0x55Db1Dd89733fDAbFa2A7A718Ec31870cb5E08c7
Argument Contract address:  undefined
Wallet balance:  4.927647558662633
Deploying Token contract
Awaiting confirmations
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Completed
Contract deployed at  0x7e5C1F81EeCCb13Bcf2636dB47950a8dEc799acD
Minter signer address:  0x0A67bc92bd7023559001e4CF230D46180194317D
Minter role transaction:  0x7d72bd4e0e97317197cba58d17ea9ae88cef7a1d03edea37cfa9f0be093adab6
Premint vote power:  0.0
Mint transaction:  0xea37b87ae6b56a320204d15955c236f191b0a838541f47341a764d2cd8b4ec84
Postmint vote power:  0.0
Delegate transaction:  0x80630d31caa7d7d257fe640b72293522ae6eafbb3667ee4fd812ace21824c590
Delegate vote from  0x0A67bc92bd7023559001e4CF230D46180194317D to 0x62C5482C410f2258E357f859d8a6D36CFb54B7E4
Postdelegate vote power of minter:  0.0
Postdelegate vote power of delegatee:  10.0
Argument Ballot contract address:  undefined
Proposal  1 : Tomato
Proposal  2 : Potato
Proposal  3 : Carrot
Proposal  4 : Cucumber
Wallet balance:  4.92124190613274
Deploying Ballot contract
Awaiting confirmations
Completed
Contract deployed at  0x3De9A52aC328Ab1243bF51D3c32668bf07533Cc7
Selected proposals:  Potato
Vote transaction:  0xebe0fa8c1d72d0d60dcc9c79add959239c21dfc6e259e584b74fad6b5b589ebf
Voted proposal:  [
  '0x506f7461746f0000000000000000000000000000000000000000000000000000',
  BigNumber { _hex: '0x05', _isBigNumber: true },
  name: '0x506f7461746f0000000000000000000000000000000000000000000000000000',
  voteCount: BigNumber { _hex: '0x05', _isBigNumber: true }
]
Voted proposal vote count:  0.000000000000000005
Spent votes:  0.000000000000000005
Proposal:  Potato vote count:  0.000000000000000005
Proposal:  Carrot vote count:  0.0
Proposal:  Tomato vote count:  0.0
Proposal:  Cucumber vote count:  0.0
```
After that, to use same token and ballot contract you can use below command: 
First one is token contract, second one is ballot contract.
```shell
yarn ts-node scripts/operate.ts 0x7e5C1F81EeCCb13Bcf2636dB47950a8dEc799acD 0x3De9A52aC328Ab1243bF51D3c32668bf07533Cc7
```
For each run, proposal selected randomly.
Here is the results:
```shell
yarn ts-node scripts/operate.ts 0x7e5C1F81EeCCb13Bcf2636dB47950a8dEc799acD 0x3De9A52aC328Ab1243bF51D3c32668bf07533Cc7
Owner signer address:  0x55Db1Dd89733fDAbFa2A7A718Ec31870cb5E08c7
Argument Contract address:  0x7e5C1F81EeCCb13Bcf2636dB47950a8dEc799acD
Minter signer address:  0x0A67bc92bd7023559001e4CF230D46180194317D
Minter role transaction:  0xf4013ac2d8c98acab4dded2123157ac723465e5ddc0d0b3462d06e167f525e02
Premint vote power:  0.0
Mint transaction:  0x4b2ff453e82959d838fcf58bbbb77e694e766231489948ed0c2af1e275e87b93
Postmint vote power:  0.0
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Delegate transaction:  0x5051a4e051ebd7ec1b6ce171a092e5eeb87fafcc695ecf0ea96f60e9c3f86746
Delegate vote from  0x0A67bc92bd7023559001e4CF230D46180194317D to 0x62C5482C410f2258E357f859d8a6D36CFb54B7E4
Postdelegate vote power of minter:  0.0
Postdelegate vote power of delegatee:  40.0
Argument Ballot contract address:  0x3De9A52aC328Ab1243bF51D3c32668bf07533Cc7
Selected proposals:  Carrot
Vote transaction:  0xfc97e49e4a1f86678474c2106cf53bfbae2afb1f0bac3b1d6702b6f7a9198b40
Voted proposal:  [
  '0x436172726f740000000000000000000000000000000000000000000000000000',
  BigNumber { _hex: '0x05', _isBigNumber: true },
  name: '0x436172726f740000000000000000000000000000000000000000000000000000',
  voteCount: BigNumber { _hex: '0x05', _isBigNumber: true }
]
Voted proposal vote count:  0.000000000000000005
Spent votes:  0.00000000000000002
Proposal:  Tomato vote count:  0.0
Proposal:  Cucumber vote count:  0.0
Proposal:  Potato vote count:  0.000000000000000015
Proposal:  Carrot vote count:  0.000000000000000005

```
