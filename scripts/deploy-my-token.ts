import { ethers } from "ethers";
import "dotenv/config";
import * as myTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";

async function main(signer: ethers.Wallet) {
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log("Wallet balance: ", balance);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log("Deploying Token contract");
  const tokenFactory = new ethers.ContractFactory(
    myTokenJson.abi,
    myTokenJson.bytecode,
    signer
  );
  const tokenContract = await tokenFactory.deploy();
  console.log("Awaiting confirmations");
  await tokenContract.deployed();
  console.log("Completed");
  console.log("Contract deployed at ", tokenContract.address);
  return tokenContract;
}

export default main;
