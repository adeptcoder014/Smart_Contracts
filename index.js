// Setup: npm install @alch/alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");
//===========================================================================
// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "1EYhOxeCd3YhHV2jslcEbft6jSNZGc_m", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
//---------------------------------------------------------------
async function main() {
  const latestBlock = await alchemy.core.getBalance("0x89E698ce4D27742905179441937032E9E5c45D70");
  console.log(latestBlock);
}
//-------------------------------------------------------------
main();