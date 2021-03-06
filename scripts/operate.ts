/* eslint-disable node/no-missing-import */
import deployMyToken from "./deploy-my-token";
import deployBallot from "./deploy-ballot";
import mintingToken from "./minting-token";
import ballotVote from "./ballot-vote";
import delegate from "./delegate";
import { getWalletSigner } from "./get-wallet-signer";
import { CustomBallot, MyToken } from "../typechain";
import { Contract } from "ethers";
import * as myTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";

async function main() {
  const USED_VOTE_POWER = 5;
  const PROPOSALS = ["Tomato", "Potato", "Carrot", "Cucumber"];

  const ownerSigner = getWalletSigner(undefined, process.env.PRIVATE_KEY);
  console.log("Owner signer address: ", ownerSigner.address);

  const contractAddress =
    process.argv.length >= 3 ? process.argv[2] : undefined;
  console.log("Argument Contract address: ", contractAddress);
  const tokenContract: MyToken = contractAddress
    ? (new Contract(contractAddress, myTokenJson.abi, ownerSigner) as MyToken)
    : ((await deployMyToken(ownerSigner)) as MyToken);

  const minterSigner = getWalletSigner(undefined, process.env.PRIVATE_KEY_2);
  console.log("Minter signer address: ", minterSigner.address);

  const minterRole = await tokenContract.MINTER_ROLE();
  const minterRoleTx = await tokenContract.grantRole(
    minterRole,
    minterSigner.address
  );
  console.log("Minter role transaction: ", minterRoleTx.hash);

  await mintingToken(tokenContract, minterSigner);

  const delegatee = getWalletSigner(undefined, process.env.PRIVATE_KEY_3);
  await delegate(tokenContract, minterSigner, delegatee);

  const ballotContractAddress =
    process.argv.length >= 4 ? process.argv[3] : undefined;
  console.log("Argument Ballot contract address: ", ballotContractAddress);
  const ballotContract: CustomBallot = !ballotContractAddress
    ? ((await deployBallot(
        ownerSigner,
        tokenContract.address,
        PROPOSALS
      )) as CustomBallot)
    : (new Contract(
        ballotContractAddress,
        ballotJson.abi,
        ownerSigner
      ) as CustomBallot);

  await ballotVote(ballotContract, delegatee, USED_VOTE_POWER, PROPOSALS);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
