import { ethers } from "ethers";
import "dotenv/config";
// eslint-disable-next-line node/no-missing-import
import { MyToken } from "../typechain";

async function main(tokenContract: MyToken, mintAccount: ethers.Wallet) {
  const BASE_VOTE_POWER = 10;

  const preMintVotePower = await tokenContract.getVotes(mintAccount.address);
  console.log("Premint vote power: ", preMintVotePower);

  const mintTx = await tokenContract.mint(
    mintAccount.address,
    ethers.utils.parseEther(BASE_VOTE_POWER.toFixed(18))
  );
  await mintTx.wait();
  console.log("Mint transaction: ", mintTx.hash);

  const postMintVotePower = await tokenContract.getVotes(mintAccount.address);
  console.log("Postmint vote power: ", postMintVotePower);
}

export default main;
