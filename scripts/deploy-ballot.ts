import { ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main(
  signer: ethers.Wallet,
  tokenContractAddress: string,
  ...proposals: string[]
) {
  if (proposals.length < 2) throw new Error("Not enough proposals provided");
  proposals.forEach((element, index) => {
    console.log("Proposal ", index + 1, ":", element);
  });

  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log("Wallet balance: ", balance);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  console.log("Deploying Ballot contract");
  const ballotFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode,
    signer
  );

  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals),
    tokenContractAddress
  );

  console.log("Awaiting confirmations");
  await ballotContract.deployed();
  console.log("Completed");
  console.log("Contract deployed at ", ballotContract.address);
  return ballotContract;
}

export default main;
