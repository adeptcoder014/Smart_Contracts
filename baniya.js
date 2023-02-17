const Web3 = require("web3");
const baniyaABI = require("./artifacts/contracts/Baniya.sol/Baniya.json").abi;
const nftABI = require("./artifacts/contracts/NFT.sol/MyNFT.json").abi;

require("dotenv").config();
//=================================================================================
// Connect to the Ethereum network
const provider = new Web3.providers.HttpProvider(process.env.API_URL);
const web3 = new Web3(provider);
//=================================================================================
async function getContractBalance() {
  const baniyaAddress = process.env.CONTRACT_ADDRESS;
  const baniyaContract = new web3.eth.Contract(baniyaABI, baniyaAddress); // Get the deployed contract instance
  const nftInstance = new web3.eth.Contract(nftABI, baniyaAddress);
  nftInstance.methods.tokenURI(tokenID).call((error, result) => {
    if (error) {
      console.error(error);
      return;
    }

    // Use an HTTP client or IPFS API to retrieve the metadata from the URI
    console.log("Metadata URI:", result);
  });

  const account = "0x89E698ce4D27742905179441937032E9E5c45D70";
  const balance = await baniyaContract.methods.balanceOf(account).call();
  const iconData = await baniyaContract.methods.icon().call();

  console.log("Balance: ", balance);
  console.log("iconData: ", iconData);
}
//=================================================================================
getContractBalance();
