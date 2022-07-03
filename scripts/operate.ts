/* eslint-disable node/no-missing-import */
import deployMyToken from "./deploy-my-token";
import mintingToken from "./minting-token";
import { getWalletSigner } from "./get-wallet-signer";
import { MyToken } from "../typechain";
import { Contract } from "ethers";
import * as myTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";

async function main() {
  const ownerSigner = getWalletSigner(undefined, process.env.PRIVATE_KEY);
  console.log("Owner signer address: ", ownerSigner.address);

  const contractAddress =
    process.argv.length === 3 ? process.argv[2] : undefined;
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

  mintingToken(tokenContract, minterSigner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
