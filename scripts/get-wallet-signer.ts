import { ethers } from "ethers";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

export const getWalletSigner = (
  mnemonic?: string,
  privateKey?: string,
  providerNetwork = "ropsten"
) => {
  const wallet =
    mnemonic && mnemonic.length > 0
      ? ethers.Wallet.fromMnemonic(mnemonic)
      : new ethers.Wallet(privateKey ?? EXPOSED_KEY);
  const provider = ethers.providers.getDefaultProvider(providerNetwork);
  const signer = wallet.connect(provider);
  return signer;
};
