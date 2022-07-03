// eslint-disable-next-line node/no-missing-import
import deployMyToken from "./deploy-my-token";

async function main() {
  const tokenContract = await deployMyToken();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
