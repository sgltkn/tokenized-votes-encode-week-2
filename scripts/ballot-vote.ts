import { ethers } from "ethers";
import "dotenv/config";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../typechain";

async function main(
  ballotContract: CustomBallot,
  delegatee: ethers.Wallet,
  usedVotePower: number,
  proposals: string[]
) {
  const proposalChosenIndex = Math.floor(Math.random() * proposals.length);
  console.log("Selected proposals: ", proposals[proposalChosenIndex]);
  const voteTx = await ballotContract
    .connect(delegatee)
    .vote(proposalChosenIndex, usedVotePower);

  await voteTx.wait();
  console.log("Vote transaction: ", voteTx.hash);

  const votedProposal = await ballotContract.proposals(proposalChosenIndex);
  console.log("Voted proposal: ", votedProposal);
  console.log(
    "Voted proposal vote count: ",
    ethers.utils.formatEther(votedProposal.voteCount)
  );

  const spentVotes = await ballotContract.spentVotePower(delegatee.address);
  console.log("Spent votes: ", ethers.utils.formatEther(spentVotes));

  // show all proposals
  proposals.forEach(async (item, index) => {
    const proposal = await ballotContract.proposals(index);
    console.log(
      "Proposal: ",
      item,
      "vote count: ",
      ethers.utils.formatEther(proposal.voteCount)
    );
  });
}

export default main;
