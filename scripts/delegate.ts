import { ethers } from "ethers";
import "dotenv/config";
// eslint-disable-next-line node/no-missing-import
import { MyToken } from "../typechain";

async function main(
  tokenContract: MyToken,
  minterSigner: ethers.Wallet,
  delegatee: ethers.Wallet
) {
  const delegateTx = await tokenContract
    .connect(minterSigner)
    .delegate(delegatee.address);
  await delegateTx.wait();
  console.log("Delegate transaction: ", delegateTx.hash);
  console.log(
    "Delegate vote from ",
    minterSigner.address,
    "to",
    delegatee.address
  );

  const postDelegateVotePowerForMinter = await tokenContract.getVotes(
    minterSigner.address
  );
  console.log(
    "Postdelegate vote power of minter: ",
    ethers.utils.formatEther(postDelegateVotePowerForMinter)
  );

  const postDelegateVotePower = await tokenContract.getVotes(delegatee.address);
  console.log(
    "Postdelegate vote power of delegatee: ",
    ethers.utils.formatEther(postDelegateVotePower)
  );
}

export default main;
